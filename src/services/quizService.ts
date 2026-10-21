import type { QuizQuestion, SubtopicId, DomainId } from '../types';
import { QUESTIONS } from '../data/questions';
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
  topicId: SubtopicId | 'mixed',
  count: number = 10
): QuizQuestion[] {
  const filtered =
    topicId === 'mixed'
      ? QUESTIONS
      : QUESTIONS.filter((q) => q.topicId === topicId);

  if (!filtered || filtered.length === 0) {
    return [];
  }

  const shuffled = shuffleArray(filtered);
  const targetCount = Math.min(Math.max(1, count), shuffled.length);
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
 * Calculates a comprehensive score breakdown including pass/fail status (70% AZ-900 benchmark)
 * and performance categorized across the 3 core Azure domains.
 */
export function calculateScoreBreakdown(
  questions: QuizQuestion[],
  answers: (number | null)[]
): ScoreBreakdown {
  const total = questions.length;
  const score = calculateScore(questions, answers);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 70; // AZ-900 passing mark is 70% (700/1000)

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

    const domainId = topic.domainId;
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
export function getAvailableQuestionCount(topicId: SubtopicId | 'mixed'): number {
  if (topicId === 'mixed') {
    return QUESTIONS.length;
  }
  return QUESTIONS.filter((q) => q.topicId === topicId).length;
}
