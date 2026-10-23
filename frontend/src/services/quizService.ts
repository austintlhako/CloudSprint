import type { QuizQuestion, QuizSelection, DomainId } from '../types';
import { QUESTIONS } from '../data/questions';
import { createGeneratedQuestions } from '../data/generatedQuestions';
import { getTopicById } from '../data/topics';

export interface DomainScoreDetail {
  correct: number;
  total: number;
  percentage: number;
  domainName: string;
}

export interface ScoreBreakdown {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  domainBreakdown: Record<DomainId, DomainScoreDetail>;
}

export interface QuizHistoryEntry {
  id: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  answers: (number | null)[];
}

/**
 * Fisher-Yates shuffle algorithm to safely randomize questions without mutating the source array
 */
function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Returns a randomized set of questions filtered by topicId (or mixed from all domains)
 */
export function getQuestionsByTopic(
  topicId: QuizSelection,
  count: number = 10
): QuizQuestion[] {
  const allQuestions = [...QUESTIONS, ...createGeneratedQuestions()];
  const scopedQuestions = topicId === 'mixed'
    ? allQuestions
    : allQuestions.filter((q) =>
      q.topicId === topicId || getTopicById(q.topicId)?.id === topicId
    );

  if (scopedQuestions.length === 0) {
    return [];
  }

  const shuffled = shuffleArray(scopedQuestions);
  const targetCount = Math.min(Math.max(1, count), 50, shuffled.length);
  return shuffled.slice(0, targetCount);
}

/**
 * Calculates the total number of correct answers
 */
export function calculateScore(
  questions: QuizQuestion[],
  answers: (number | null)[]
): number {
  if (!questions || questions.length === 0) return 0;

  return questions.reduce((acc, question, index) => {
    const userAnswer = answers[index];
    if (userAnswer !== null && userAnswer !== undefined && userAnswer === question.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

/**
 * Calculates a comprehensive score breakdown including pass/fail status (80% benchmark)
 * and performance categorized across the 3 core Azure domains.
 */
export function calculateScoreBreakdown(
  questions: QuizQuestion[],
  answers: (number | null)[]
): ScoreBreakdown {
  const total = questions.length;
  const score = calculateScore(questions, answers);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 80;

  // Initialize domain breakdown for all 3 official domains
  const domainBreakdown: Record<DomainId, DomainScoreDetail> = {
    'cloud-concepts': { correct: 0, total: 0, percentage: 0, domainName: 'Cloud Concepts' },
    'azure-architecture-services': {
      correct: 0,
      total: 0,
      percentage: 0,
      domainName: 'Azure Architecture & Services',
    },
    'azure-management-governance': {
      correct: 0,
      total: 0,
      percentage: 0,
      domainName: 'Azure Management & Governance',
    },
  };

  questions.forEach((question, index) => {
    const topic = getTopicById(question.topicId);
    if (!topic) return;

    const domainId = topic.id as DomainId;
    if (domainBreakdown[domainId]) {
      domainBreakdown[domainId].total += 1;
      const userAnswer = answers[index];
      if (userAnswer !== null && userAnswer !== undefined && userAnswer === question.correctIndex) {
        domainBreakdown[domainId].correct += 1;
      }
    }
  });

  // Calculate percentages for each domain
  (Object.keys(domainBreakdown) as DomainId[]).forEach((domainKey) => {
    const item = domainBreakdown[domainKey];
    item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
  });

  return {
    score,
    total,
    percentage,
    passed,
    domainBreakdown,
  };
}

/**
 * Helper to determine the total available questions for a given topic or 'mixed' mode
 */
export function getAvailableQuestionCount(topicId: QuizSelection): number {
  if (topicId === 'mixed') {
    return 50;
  }
  return 50;
}

export function getQuizHistory() {
  try {
    const raw = localStorage.getItem('cloudsprint_quiz_history');
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Failed to read quiz history:', error);
    return [];
  }
}

export function recordQuizAttempt(questions: QuizQuestion[], answers: (number | null)[]): void {
  const entry: QuizHistoryEntry = {
    id: `attempt-${Date.now()}`,
    completedAt: new Date().toISOString(),
    score: calculateScore(questions, answers),
    totalQuestions: questions.length,
    questions,
    answers,
  };
  const history = getQuizHistory() as QuizHistoryEntry[];
  localStorage.setItem('cloudsprint_quiz_history', JSON.stringify([entry, ...history].slice(0, 50)));
}

export function getMistakeReviewItems() {
  const latest = getQuizHistory() as QuizHistoryEntry[];
  const seen = new Set<string>();
  return latest.flatMap((attempt) => attempt.questions.flatMap((question, index) => {
    const answer = attempt.answers[index];
    if (answer === question.correctIndex || seen.has(question.id)) return [];
    seen.add(question.id);
    return [{ question, selectedAnswer: answer, attemptId: attempt.id }];
  }));
}

export function getQuizStats() {
  const history = getQuizHistory();
  const percentages = history.map((attempt: { score: number; totalQuestions: number }) =>
    attempt.totalQuestions > 0 ? Math.round((attempt.score / attempt.totalQuestions) * 100) : 0
  );
  return {
    totalAttempts: history.length,
    averageScore: percentages.length
      ? Math.round(percentages.reduce((sum: number, value: number) => sum + value, 0) / percentages.length)
      : 0,
    bestScore: percentages.length ? Math.max(...percentages) : 0,
  };
}
