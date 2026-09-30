import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 8787);
const adminPassword = process.env.ADMIN_PASSWORD || '2499';
// Render's filesystem is ephemeral unless a persistent disk is mounted. Set
// DATA_DIR to that disk's mount path (commonly /var/data) in production.
const dataDirectory = process.env.DATA_DIR || path.join(__dirname, 'server-data');
const essaysFile = path.join(dataDirectory, 'essays.json');

app.use((request, response, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || '*';
  response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  if (request.method === 'OPTIONS') return response.sendStatus(204);
  next();
});
app.use(express.json({ limit: '256kb' }));

async function readEssays() {
  try {
    const essays = JSON.parse(await fs.readFile(essaysFile, 'utf8'));
    return Array.isArray(essays) ? essays : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeEssays(essays) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(essaysFile, `${JSON.stringify(essays, null, 2)}\n`, 'utf8');
}

app.get('/api/health', (_request, response) => response.json({ ok: true }));

app.get('/api/essays', async (_request, response) => {
  try {
    const essays = await readEssays();
    response.json(essays.filter((essay) => !essay.isPrivate));
  } catch (error) {
    console.error('Failed to read essays', error);
    response.status(500).json({ error: 'Essay service unavailable' });
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
  try {
    const essays = await readEssays();
    const target = essays.find((essay) => essay.id === request.params.id);
    if (!target) return response.status(404).json({ error: 'Essay not found.' });
    if (!isAdmin && target.email.toLowerCase() !== email) return response.status(403).json({ error: 'That email does not own this essay.' });
    await writeEssays(essays.filter((essay) => essay.id !== request.params.id));
    response.sendStatus(204);
  } catch (error) {
    console.error('Failed to delete essay', error);
    response.status(500).json({ error: 'Essay could not be deleted.' });
  }
});

app.post('/api/essays', async (request, response) => {
  const { title, body, authorName = '', email, isPrivate = false } = request.body ?? {};
  if (typeof title !== 'string' || !title.trim() || typeof body !== 'string' || !body.trim() ||
      typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ error: 'Title, essay body, and a valid email are required.' });
  }

  const essay = {
    id: `essay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title.trim(),
    body: body.trim(),
    authorName: typeof authorName === 'string' ? authorName.trim() : '',
    email: email.trim(),
    isPrivate: Boolean(isPrivate),
    createdAt: new Date().toISOString(),
  };

  try {
    const essays = await readEssays();
    essays.unshift(essay);
    await writeEssays(essays);
    response.status(201).json(essay);
  } catch (error) {
    console.error('Failed to save essay', error);
    response.status(500).json({ error: 'Essay could not be submitted' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', async (request, response, next) => {
  if (request.path.startsWith('/api/')) return next();
  const indexFile = path.join(__dirname, 'dist', 'index.html');
  try {
    await fs.access(indexFile);
    response.sendFile(indexFile);
  } catch {
    response.status(404).send('Build the frontend with npm run build first.');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Ink & Ethics server listening on http://localhost:${port}`);
});
