// ============================================================
// Quiz Service — Dev B (Persistence) & Dev C (Scoring Engine)
// ============================================================
// Manages quiz attempt persistence and provides history logging.
// Supports Supabase and local storage fallback.
// ============================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { QuizAttempt, Question, QuizConfig } from '../types';

const LOCAL_STORAGE_KEY = 'cloudsprint_quiz_history';

// Default starter questions (mapped to the 3 official AZ-900 domains)
// Will be augmented by Dev C's 30 curated questions in data/questions.ts
export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q-cc-001',
    domain: 'cloud-concepts',
    subtopic: 'cloud-computing',
    difficulty: 'beginner',
    question: 'Which cloud computing model provides virtual machines, virtual networks, and storage, while giving the customer control over the OS and software stack?',
    options: [
      'Software as a Service (SaaS)',
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Function as a Service (FaaS)',
    ],
    correctIndex: 1,
    explanation: 'IaaS offers basic computing infrastructure like VMs and storage. Customers are responsible for configuring the OS and installed applications.',
    sourceUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-service-types/',
    sourceLabel: 'Microsoft Learn: Cloud Service Types',
  },
  {
    id: 'q-arch-001',
    domain: 'azure-architecture-services',
    subtopic: 'core-architecture',
    difficulty: 'intermediate',
    question: 'What is the primary benefit of deploying virtual machines across multiple Azure Availability Zones within a region?',
    options: [
      'Protection from regional catastrophic disasters across an entire continent',
      'Protection against individual datacenter failures with independent power, cooling, and networking',
      'Automatic reduction of Azure outbound bandwidth costs to zero',
      'Elimination of the need to configure network security groups',
    ],
    correctIndex: 1,
    explanation: 'Availability Zones are physically distinct datacenters within an Azure region designed to maintain high availability if a single datacenter experiences an outage.',
    sourceUrl: 'https://learn.microsoft.com/azure/reliability/availability-zones-overview',
    sourceLabel: 'Microsoft Learn: Azure Availability Zones',
  },
  {
    id: 'q-gov-001',
    domain: 'azure-management-governance',
    subtopic: 'governance-compliance',
    difficulty: 'intermediate',
    question: 'Which Azure service enables administrators to enforce organizational standards and assess compliance across subscriptions by blocking unapproved resource deployments?',
    options: [
      'Azure Role-Based Access Control (Azure RBAC)',
      'Azure Policy',
      'Azure Key Vault',
      'Azure Monitor',
    ],
    correctIndex: 1,
    explanation: 'Azure Policy enforces rules and effects over resources to ensure compliance with corporate standards, such as restricting allowed VM sizes or deployment locations.',
    sourceUrl: 'https://learn.microsoft.com/azure/governance/policy/overview',
    sourceLabel: 'Microsoft Learn: Azure Policy Overview',
  },
];

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
 * Filter and generate a question set based on user configuration.
 */
export function getQuestionsByConfig(config: QuizConfig): Question[] {
  let pool = [...DEFAULT_QUESTIONS];

  if (config.topics !== 'mixed' && Array.isArray(config.topics) && config.topics.length > 0) {
    pool = pool.filter((q) => config.topics.includes(q.domain));
  }

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(config.questionCount, pool.length));
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
 * Persists to Supabase for logged-in users and localStorage for guests.
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
