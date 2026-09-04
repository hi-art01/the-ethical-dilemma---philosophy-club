import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 8787);
const dataDirectory = path.join(__dirname, 'server-data');
const essaysFile = path.join(dataDirectory, 'essays.json');

app.use((request, response, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || '*';
  response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
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
