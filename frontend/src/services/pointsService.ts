import { getQuizHistory, type QuizHistoryEntry } from './quizService';

export interface LeaderboardEntry {
  name: string;
  points: number;
}

const loginPointsKey = 'cloudsprint_login_points';
const fullNameKeys = ['cloudsprint_learner_profile', 'cloudsprint_profile_page'];

export function getLearnerPoints(): number {
  const loginPoints = getStoredLoginPoints();
  const examDays = new Set(getQuizHistory().map((attempt: QuizHistoryEntry) => attempt.completedAt.slice(0, 10)));
  return loginPoints + examDays.size;
}

function getStoredLoginPoints(): number {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(loginPointsKey) ?? '[]');
    return Array.isArray(saved) ? new Set(saved.filter((date): date is string => typeof date === 'string')).size : 0;
  } catch {
    return 0;
  }
}

export function awardLoginPoint(): void {
  const today = new Date().toISOString().slice(0, 10);
  const dates = getStoredLoginDates();
  if (!dates.includes(today)) {
    localStorage.setItem(loginPointsKey, JSON.stringify([...dates, today]));
  }
}

function getStoredLoginDates(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(loginPointsKey) ?? '[]');
    return Array.isArray(saved) ? saved.filter((date): date is string => typeof date === 'string') : [];
  } catch {
    return [];
  }
}

export function getFullName(fallback = ''): string {
  const keys = [...fullNameKeys, ...Object.keys(localStorage).filter((key) => key.startsWith('cloudsprint_learner_profile_'))];
  for (const key of keys) {
    try {
      const profile = JSON.parse(localStorage.getItem(key) ?? '{}') as { fullName?: unknown };
      if (typeof profile.fullName === 'string' && profile.fullName.trim().split(/\s+/).length >= 2) {
        return profile.fullName.trim().replace(/\s+/g, ' ');
      }
    } catch {
      // Try the next profile source.
    }
  }
  const normalizedFallback = fallback.trim().replace(/\s+/g, ' ');
  return normalizedFallback.split(' ').length >= 2 ? normalizedFallback : '';
}

export function getLeaderboard(learnerName: string, learnerPoints: number): LeaderboardEntry[] {
  const name = learnerName.trim().replace(/\s+/g, ' ');
  return name.split(' ').length >= 2 ? [{ name, points: learnerPoints }] : [];
}
