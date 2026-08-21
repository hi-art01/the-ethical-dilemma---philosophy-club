import { Essay, EssaySubmission } from '../essayTypes';

// Set VITE_API_BASE_URL when the app is paired with a real server.
// Expected endpoints: GET /api/essays (public only), POST /api/essays.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export async function fetchPublicEssays(): Promise<Essay[]> {
  const response = await fetch(`${API_BASE_URL}/api/essays`);
  if (!response.ok) throw new Error('Essay service unavailable');
  return response.json();
}

export async function submitEssay(submission: EssaySubmission): Promise<Essay> {
  const response = await fetch(`${API_BASE_URL}/api/essays`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
  if (!response.ok) throw new Error('Essay could not be submitted');
  return response.json();
}
