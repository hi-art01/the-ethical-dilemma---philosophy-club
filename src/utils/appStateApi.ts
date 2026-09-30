import { ClubInfo, CreditsInfo, ForumThread, Poll, Quote, Topic } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export interface SharedAppState {
  clubInfo: ClubInfo;
  quotes: Quote[];
  topics: Topic[];
  polls: Poll[];
  forumThreads: ForumThread[];
  credits: CreditsInfo;
}

let saveQueue = Promise.resolve();

export async function fetchSharedAppState(): Promise<Partial<SharedAppState> | null> {
  const response = await fetch(`${API_BASE_URL}/api/app-state`);
  if (!response.ok) throw new Error('Shared storage is unavailable.');
  return response.json();
}

export function saveSharedAppState(state: SharedAppState, adminToken: string): Promise<void> {
  saveQueue = saveQueue.catch(() => undefined).then(async () => {
    const response = await fetch(`${API_BASE_URL}/api/app-state`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify(state),
    });
    if (!response.ok) throw new Error('Shared storage could not be updated.');
  });
  return saveQueue;
}

export async function savePublicAction(action: 'vote' | 'add-thread' | 'add-comment', payload: unknown): Promise<Partial<SharedAppState>> {
  const response = await fetch(`${API_BASE_URL}/api/app-state/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, payload }),
  });
  if (!response.ok) throw new Error('Shared storage could not save this change.');
  return response.json();
}
