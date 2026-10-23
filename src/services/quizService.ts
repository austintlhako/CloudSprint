// ============================================================
// CloudSprint — Quiz Service
//
// Handles question selection, shuffling, scoring, and
// quiz attempt persistence via localStorage.
// ============================================================

import { questions } from '../data/questions';
import { getItem, setItem } from '../lib/storage';
import type { Question, QuizAnswer, QuizAttempt, TopicId } from '../types';

const QUIZ_HISTORY_KEY = 'quiz_history';

/**
 * Select questions based on the quiz configuration.
 * Filters by topic (if specified), shuffles, and returns the requested count.
 */
export function getQuestionsByTopics(topics: TopicId[], count: number): Question[] {
  let pool: Question[];

  if (topics.length === 0) {
    // Mixed quiz — use all questions
    pool = [...questions];
  } else {
    pool = questions.filter((q) => topics.includes(q.topicId));
  }

  // Shuffle using Fisher-Yates
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return at most `count` questions (or all if fewer available)
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Calculate score deterministically from questions and answers.
 * Returns the number of correct answers.
 */
export function calculateScore(questions: Question[], answers: QuizAnswer[]): number {
  let correct = 0;
  for (const answer of answers) {
    if (answer.selectedIndex === null) continue;
    const question = questions.find((q) => q.id === answer.questionId);
    if (question && answer.selectedIndex === question.correctIndex) {
      correct++;
    }
  }
  return correct;
}

/**
 * Get the maximum number of questions available for given topics.
 */
export function getAvailableQuestionCount(topics: TopicId[]): number {
  if (topics.length === 0) return questions.length;
  return questions.filter((q) => topics.includes(q.topicId)).length;
}

/**
 * Save a completed quiz attempt to localStorage.
 */
export function saveQuizAttempt(attempt: QuizAttempt): void {
  const history = getQuizHistory();
  history.unshift(attempt); // Most recent first
  // Keep at most 50 attempts
  setItem(QUIZ_HISTORY_KEY, history.slice(0, 50));
}

/**
 * Load all saved quiz attempts from localStorage.
 */
export function getQuizHistory(): QuizAttempt[] {
  return getItem<QuizAttempt[]>(QUIZ_HISTORY_KEY) ?? [];
}

/**
 * Get summary stats for the dashboard.
 */
export function getQuizStats() {
  const history = getQuizHistory();
  if (history.length === 0) {
    return { totalAttempts: 0, averageScore: 0, bestScore: 0 };
  }
  const percentages = history.map((a) =>
    a.totalQuestions > 0 ? Math.round((a.score / a.totalQuestions) * 100) : 0
  );
  return {
    totalAttempts: history.length,
    averageScore: Math.round(percentages.reduce((sum, p) => sum + p, 0) / percentages.length),
    bestScore: Math.max(...percentages),
  };
}
