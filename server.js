import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 8787);
const adminPassword = process.env.ADMIN_PASSWORD || '2499';
const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const supabaseKey = process.env.SUPABASE_SECRET_KEY || '';
const hasDatabase = Boolean(supabaseUrl && supabaseKey);

app.use((request, response, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || '*';
  response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (request.method === 'OPTIONS') return response.sendStatus(204);
  next();
});
app.use(express.json({ limit: '256kb' }));

async function supabaseRequest(endpoint, { method = 'GET', body, prefer } = {}) {
  if (!hasDatabase) throw new Error('Supabase is not configured');
  const response = await fetch(`${supabaseUrl}/rest/v1/${endpoint}`, {
    method,
    headers: {
      apikey: supabaseKey,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const result = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    console.error('Supabase request failed', response.status, result?.message || result?.hint || '');
    throw new Error('Supabase request failed');
  }
  return result;
}

function requireDatabase(response) {
  if (hasDatabase) return true;
  response.status(503).json({ error: 'Persistent storage is not configured on the server.' });
  return false;
}

async function readEssays() {
  const rows = await supabaseRequest('essays?select=id,title,body,author_name,email,is_private,created_at&order=created_at.desc');
  return rows.map((row) => ({ id: row.id, title: row.title, body: row.body, authorName: row.author_name, email: row.email, isPrivate: row.is_private, createdAt: row.created_at }));
}

app.get('/api/health', (_request, response) => response.json({ ok: true, storageConfigured: hasDatabase }));

app.get('/api/app-state', async (_request, response) => {
  if (!requireDatabase(response)) return;
  try {
    const rows = await supabaseRequest('app_state?id=eq.main&select=state');
    response.json(rows[0]?.state ?? null);
  } catch (error) {
    console.error('Failed to read app state', error.message);
    response.status(503).json({ error: 'Persistent storage is unavailable.' });
  }
});

app.put('/api/app-state', async (request, response) => {
  const token = request.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (token !== adminPassword) return response.status(401).json({ error: 'Administrator access required.' });
  if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) return response.status(400).json({ error: 'Invalid app state.' });
  if (!requireDatabase(response)) return;
  try {
    await supabaseRequest('app_state?on_conflict=id', { method: 'POST', body: { id: 'main', state: request.body }, prefer: 'resolution=merge-duplicates,return=minimal' });
    response.sendStatus(204);
  } catch (error) {
    console.error('Failed to save app state', error.message);
    response.status(503).json({ error: 'Persistent storage is unavailable.' });
  }
});

app.post('/api/app-state/action', async (request, response) => {
  if (!requireDatabase(response)) return;
  const { action, payload } = request.body ?? {};
  if (!['vote', 'add-thread', 'add-comment'].includes(action) || !payload || typeof payload !== 'object') return response.status(400).json({ error: 'Invalid community action.' });
  if (action === 'vote' && (typeof payload.pollId !== 'string' || typeof payload.optionId !== 'string')) return response.status(400).json({ error: 'Poll and option are required.' });
  if (action === 'add-thread' && ['id', 'title', 'category', 'author', 'body', 'createdAt'].some((key) => typeof payload[key] !== 'string')) return response.status(400).json({ error: 'Thread details are incomplete.' });
  if (action === 'add-comment' && (typeof payload.threadId !== 'string' || !payload.comment || typeof payload.comment !== 'object' || ['id', 'author', 'body', 'createdAt'].some((key) => typeof payload.comment[key] !== 'string'))) return response.status(400).json({ error: 'Reply details are incomplete.' });
  try {
    const result = await supabaseRequest('rpc/apply_public_action', { method: 'POST', body: { p_action: action, p_payload: payload } });
    response.json(result);
  } catch (error) {
    console.error('Failed to save community action', error.message);
    response.status(503).json({ error: 'Could not save this change.' });
  }
});

app.get('/api/essays', async (_request, response) => {
  if (!requireDatabase(response)) return;
  try {
    const essays = await readEssays();
    response.json(essays.filter((essay) => !essay.isPrivate));
  } catch (error) {
    console.error('Failed to read essays', error.message);
    response.status(503).json({ error: 'Essay service unavailable' });
  }
});

app.post('/api/admin/session', (request, response) => {
  if (request.body?.password !== adminPassword) return response.status(401).json({ error: 'Incorrect administrator password.' });
  response.json({ token: adminPassword });
});

app.delete('/api/essays/:id', async (request, response) => {
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const adminToken = request.get('Authorization')?.replace(/^Bearer\s+/i, '');
  const isAdmin = adminToken === adminPassword;
  if (!email && !isAdmin) return response.status(401).json({ error: 'Sign in as an administrator or provide the submitting email.' });
  if (!requireDatabase(response)) return;
  try {
    const essays = await readEssays();
    const target = essays.find((essay) => essay.id === request.params.id);
    if (!target) return response.status(404).json({ error: 'Essay not found.' });
    if (!isAdmin && target.email.toLowerCase() !== email) return response.status(403).json({ error: 'That email does not own this essay.' });
    await supabaseRequest(`essays?id=eq.${encodeURIComponent(request.params.id)}`, { method: 'DELETE' });
    response.sendStatus(204);
  } catch (error) {
    console.error('Failed to delete essay', error.message);
    response.status(503).json({ error: 'Essay could not be deleted.' });
  }
});

app.post('/api/essays', async (request, response) => {
  const { title, body, authorName = '', email, isPrivate = false } = request.body ?? {};
  if (typeof title !== 'string' || !title.trim() || typeof body !== 'string' || !body.trim() ||
      typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ error: 'Title, essay body, and a valid email are required.' });
  }
  if (!requireDatabase(response)) return;
  const essay = {
    id: `essay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title.trim(), body: body.trim(), authorName: typeof authorName === 'string' ? authorName.trim() : '',
    email: email.trim(), isPrivate: Boolean(isPrivate), createdAt: new Date().toISOString(),
  };
  try {
    await supabaseRequest('essays', { method: 'POST', body: { id: essay.id, title: essay.title, body: essay.body, author_name: essay.authorName, email: essay.email, is_private: essay.isPrivate, created_at: essay.createdAt }, prefer: 'return=minimal' });
    response.status(201).json(essay);
  } catch (error) {
    console.error('Failed to save essay', error.message);
    response.status(503).json({ error: 'Essay could not be submitted' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', async (request, response, next) => {
  if (request.path.startsWith('/api/')) return next();
  const indexFile = path.join(__dirname, 'dist', 'index.html');
  try {
    await import('node:fs/promises').then(({ access }) => access(indexFile));
    response.sendFile(indexFile);
  } catch {
    response.status(404).send('Build the frontend with npm run build first.');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Ink & Ethics server listening on http://localhost:${port}`);
});
