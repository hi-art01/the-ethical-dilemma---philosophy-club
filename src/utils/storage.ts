import { ClubInfo, Quote, Topic } from '../types';
import { initialClubInfo, initialQuotes, initialTopics } from '../data/initialData';

const CLUB_INFO_KEY = 'ethical_dilemma_club_info_v1';
const QUOTES_KEY = 'ethical_dilemma_quotes_v1';
const TOPICS_KEY = 'ethical_dilemma_topics_v1';
const ADMIN_AUTH_KEY = 'ethical_dilemma_admin_auth_v1';

export function getStoredClubInfo(): ClubInfo {
  try {
    const raw = localStorage.getItem(CLUB_INFO_KEY);
    if (raw) return JSON.parse(raw);
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
