create table if not exists public.app_state (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint app_state_single_document check (id = 'main')
);

create table if not exists public.essays (
  id text primary key,
  title text not null,
  body text not null,
  author_name text not null default '',
  email text not null,
  is_private boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.app_state enable row level security;
alter table public.essays enable row level security;
grant select, insert, update, delete on public.app_state, public.essays to service_role;

create or replace function public.apply_public_action(p_action text, p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_state jsonb;
  next_polls jsonb;
  next_threads jsonb;
  matched boolean;
begin
  select state into current_state from public.app_state where id = 'main' for update;
  if not found then
    raise exception 'App state has not been initialized. An administrator must sign in first.';
  end if;

  if p_action = 'vote' then
    select jsonb_agg(
      case when poll->>'id' = p_payload->>'pollId' then
        jsonb_set(poll, '{options}', (
          select jsonb_agg(
            case when option->>'id' = p_payload->>'optionId' then
              jsonb_set(option, '{votes}', to_jsonb(coalesce((option->>'votes')::integer, 0) + 1), true)
            else option end order by option_order
          ) from jsonb_array_elements(poll->'options') with ordinality as options(option, option_order)
        ), true)
      else poll end order by poll_order
    ) into next_polls
    from jsonb_array_elements(coalesce(current_state->'polls', '[]'::jsonb)) with ordinality as polls(poll, poll_order);
    if not exists (
      select 1 from jsonb_array_elements(coalesce(current_state->'polls', '[]'::jsonb)) p
      cross join lateral jsonb_array_elements(p.value->'options') o
      where p.value->>'id' = p_payload->>'pollId' and o.value->>'id' = p_payload->>'optionId'
    ) then raise exception 'Poll or option not found.'; end if;
    current_state := jsonb_set(current_state, '{polls}', coalesce(next_polls, '[]'::jsonb), true);

  elsif p_action = 'add-thread' then
    if length(coalesce(p_payload->>'title', '')) < 1 or length(coalesce(p_payload->>'body', '')) < 1 then raise exception 'Thread title and body are required.'; end if;
    next_threads := jsonb_build_array(p_payload) || coalesce(current_state->'forumThreads', '[]'::jsonb);
    current_state := jsonb_set(current_state, '{forumThreads}', next_threads, true);

  elsif p_action = 'add-comment' then
    matched := false;
    select jsonb_agg(
      case when thread->>'id' = p_payload->>'threadId' then
        (thread || jsonb_build_object('comments', coalesce(thread->'comments', '[]'::jsonb) || jsonb_build_array(p_payload->'comment')))
      else thread end order by thread_order
    ), bool_or(thread->>'id' = p_payload->>'threadId')
    into next_threads, matched
    from jsonb_array_elements(coalesce(current_state->'forumThreads', '[]'::jsonb)) with ordinality as threads(thread, thread_order);
    if not coalesce(matched, false) then raise exception 'Thread not found.'; end if;
    current_state := jsonb_set(current_state, '{forumThreads}', next_threads, true);

  else
    raise exception 'Unsupported action.';
  end if;

  update public.app_state set state = current_state, updated_at = now() where id = 'main';
  return current_state;
end;
$$;

revoke all on function public.apply_public_action(text, jsonb) from public, anon, authenticated;
grant execute on function public.apply_public_action(text, jsonb) to service_role;
