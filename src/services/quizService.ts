// ============================================================
// Quiz Service — Dev B (Persistence) & Dev C (Scoring Engine)
// ============================================================
// Manages quiz attempt persistence and provides history logging.
// Supports Supabase and local storage fallback.
// ============================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { QuizAttempt, Question, QuizConfig } from '../types';

const LOCAL_STORAGE_KEY = 'cloudsprint_quiz_history';

// Helper: read attempts from localStorage
function getLocalAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
  } catch (err) {
    console.error('Failed to parse local quiz history:', err);
    return [];
  }
}

// Helper: save attempts to localStorage
function saveLocalAttempts(attempts: QuizAttempt[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(attempts));
  } catch (err) {
    console.error('Failed to persist local quiz history:', err);
  }
}

/**
 * Calculate user score from answered questions.
 */
export function calculateScore(
  questions: Question[],
  answers: (number | null)[]
): number {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] !== null && answers[i] === questions[i].correctIndex) {
      score++;
    }
  }
  return score;
}

/**
 * Save a completed quiz attempt.
 */
export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  if (attempt.userId && isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('quiz_attempts').insert({
        user_id: attempt.userId,
        config_json: attempt.config,
        question_ids: attempt.questionIds,
        answers: attempt.answers.map((ans) => (ans === null ? -1 : ans)),
        score: attempt.score,
        total_questions: attempt.totalQuestions,
        completed_at: attempt.completedAt,
      });

      if (error) {
        console.warn('Supabase quiz attempt save error, storing locally:', error.message);
      }
    } catch (err) {
      console.warn('Error saving quiz attempt to Supabase:', err);
    }
  }

  // Always keep local history updated
  const history = getLocalAttempts();
  history.unshift(attempt);
  saveLocalAttempts(history);
}

/**
 * Retrieve historical quiz attempts for a user.
 */
export async function getQuizHistory(
  userId: string | null
): Promise<QuizAttempt[]> {
  if (userId && isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (error) {
        console.warn('Supabase quiz history fetch failed, returning local storage:', error.message);
        return getLocalAttempts();
      }

      return (data || []).map((row) => ({
        id: row.id,
        userId: row.user_id,
        config: row.config_json as QuizConfig,
        questionIds: row.question_ids,
        answers: (row.answers as number[]).map((ans) => (ans === -1 ? null : ans)),
        score: row.score,
        totalQuestions: row.total_questions,
        completedAt: row.completed_at,
      }));
    } catch (err) {
      console.warn('Error fetching quiz history from Supabase:', err);
      return getLocalAttempts();
    }
  }

  return getLocalAttempts();
}
