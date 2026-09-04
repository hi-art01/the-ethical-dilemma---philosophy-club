import { ClubInfo, Quote, Topic, Poll, ForumThread } from '../types';
import { initialClubInfo, initialQuotes, initialTopics } from '../data/initialData';

// Bump the key so returning visitors receive the renamed club defaults.
const CLUB_INFO_KEY = 'ink_ethics_club_info_v3';
const QUOTES_KEY = 'ethical_dilemma_quotes_v1';
const TOPICS_KEY = 'ethical_dilemma_topics_v1';
const ADMIN_AUTH_KEY = 'ethical_dilemma_admin_auth_v1';

export function getStoredClubInfo(): ClubInfo {
  try {
    const raw = localStorage.getItem(CLUB_INFO_KEY);
    if (raw) return { ...initialClubInfo, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load club info from storage', e);
  }
  return initialClubInfo;
}

export function saveClubInfo(info: ClubInfo): void {
  try {
    localStorage.setItem(CLUB_INFO_KEY, JSON.stringify(info));
  } catch (e) {
    console.error('Failed to save club info', e);
  }
}

export function getStoredQuotes(): Quote[] {
  try {
    const raw = localStorage.getItem(QUOTES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load quotes from storage', e);
  }
  return initialQuotes;
}

export function saveQuotes(quotes: Quote[]): void {
  try {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
  } catch (e) {
    console.error('Failed to save quotes', e);
  }
}

export function getStoredTopics(): Topic[] {
  try {
    const raw = localStorage.getItem(TOPICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load topics from storage', e);
  }
  return initialTopics;
}

export function saveTopics(topics: Topic[]): void {
  try {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  } catch (e) {
    console.error('Failed to save topics', e);
  }
}

export function getAdminAuthState(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthState(isAuthed: boolean): void {
  try {
    if (isAuthed) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (e) {
    console.error('Failed to set auth state', e);
  }
}

const defaultPolls: Poll[] = [
  { id: 'poll-1', question: 'Is a good intention enough to make an action moral?', context: 'This week’s ethics seminar', closes: 'Closes Friday', options: [{ id: 'yes', label: 'Yes, intention matters most', votes: 18 }, { id: 'no', label: 'No, consequences matter too', votes: 34 }, { id: 'depends', label: 'It depends on the situation', votes: 27 }] },
  { id: 'poll-2', question: 'Which thinker should anchor our next reading circle?', context: 'Choose the text for our next meeting', closes: 'Closes next Wednesday', options: [{ id: 'arendt', label: 'Hannah Arendt', votes: 12 }, { id: 'camus', label: 'Albert Camus', votes: 21 }, { id: 'confucius', label: 'Confucius', votes: 15 }] },
];
const defaultThreads: ForumThread[] = [
  { id: 'thread-1', title: 'Can an algorithm be responsible for harm?', category: 'Ethics & AI', author: 'Maya R.', body: 'I keep coming back to the difference between being the cause of an outcome and being morally responsible for it. Where should responsibility land when a system is trained by hundreds of people?', createdAt: '2026-08-25T15:20:00.000Z', comments: [{ id: 'comment-1', author: 'Jonah P.', body: 'Maybe responsibility is distributed rather than transferred. The designer, deployer, and institution each have a different kind of duty.', createdAt: '2026-08-25T17:05:00.000Z' }] },
  { id: 'thread-2', title: 'Does Stoicism leave room for grief?', category: 'Stoicism', author: 'Eli T.', body: 'The advice to focus on what we can control is useful, but does it risk treating grief as a failure of discipline?', createdAt: '2026-08-23T14:00:00.000Z', comments: [] },
  { id: 'thread-3', title: 'The veil of ignorance in real life', category: 'Political Philosophy', author: 'Sofia K.', body: 'Would Rawls’ original position actually change how we make everyday policy decisions, or is it mainly a thought experiment?', createdAt: '2026-08-20T18:30:00.000Z', comments: [] },
];
export function getStoredPolls(): Poll[] { try { const raw = localStorage.getItem('ethical_dilemma_polls_v1'); return raw ? JSON.parse(raw) : defaultPolls; } catch { return defaultPolls; } }
export function savePolls(polls: Poll[]): void { localStorage.setItem('ethical_dilemma_polls_v1', JSON.stringify(polls)); }
export function getStoredForumThreads(): ForumThread[] { try { const raw = localStorage.getItem('ethical_dilemma_forums_v1'); return raw ? JSON.parse(raw) : defaultThreads; } catch { return defaultThreads; } }
export function saveForumThreads(threads: ForumThread[]): void { localStorage.setItem('ethical_dilemma_forums_v1', JSON.stringify(threads)); }

export function resetAllDataToDefault(): { clubInfo: ClubInfo; quotes: Quote[]; topics: Topic[] } {
  try {
    localStorage.removeItem(CLUB_INFO_KEY);
    localStorage.removeItem(QUOTES_KEY);
    localStorage.removeItem(TOPICS_KEY);
  } catch (e) {
    console.error('Failed to clear storage', e);
  }
  return {
    clubInfo: initialClubInfo,
    quotes: initialQuotes,
    topics: initialTopics,
  };
}
