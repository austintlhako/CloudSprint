// src/types/index.ts

// ──── Topic Taxonomy ────
export type DomainId =
// ============================================================
// CloudSprint — Shared Type Contracts
// ============================================================
// This file is SHARED across all developers.
// Changes require team agreement before editing.
// ============================================================

// ─── Topic Taxonomy (verified from AZ-900 study guide, July 20 2026) ───

export type Domain =
// CloudSprint — Shared Type Definitions
// All features import types from this single file.
// Only Developer C should edit this file directly.
// ============================================================

// === Topic Taxonomy ===

export type TopicId =
  | 'cloud-concepts'
  | 'azure-architecture-services'
  | 'azure-management-governance';

export type SubtopicId =
  | 'cc-cloud-computing'
  | 'cc-cloud-benefits'
  | 'cc-cloud-service-types'
  | 'aas-core-architecture'
  | 'aas-compute-networking'
  | 'aas-storage'
  | 'aas-identity-security'
  | 'amg-cost-management'
  | 'amg-governance-compliance'
  | 'amg-managing-deploying'
  | 'amg-monitoring';

export interface Topic {
  id: SubtopicId;
  domainId: DomainId;
  domainName: string;
  name: string;
}

// ──── Quiz Engine ────
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;                    // e.g. "q-cc-001"
  topicId: SubtopicId;
  question: string;
  options: string[];             // exactly 4 options: [A, B, C, D]
  correctIndex: number;          // 0-based index: 0, 1, 2, or 3
  explanation: string;
  sourceUrl: string;             // official Microsoft Learn documentation URL
  difficulty: Difficulty;
}

export interface QuizConfig {
  topicId: SubtopicId | 'mixed';
  questionCount: number;         // e.g. 5, 10, or all available
}

export interface QuizAttempt {
  questions: QuizQuestion[];
  answers: (number | null)[];    // selected index per question (null if unanswered)
  currentIndex: number;
  isSubmitted: boolean;
  score: number;                 // calculated total of correct answers
}

// ──── Flashcard Coach ────
export interface Flashcard {
  id: string;                    // e.g. "fc-cc-001"
  topicId: SubtopicId;
  front: string;                 // key term, scenario, or question
  back: string;                  // definition, answer, or core concept
  sourceUrl: string;             // official Microsoft Learn reference
}

export type FlashcardStatus = 'know' | 'review' | 'unseen';

export interface FlashcardProgress {
  cardId: string;
  status: FlashcardStatus;
  lastReviewedAt: string;        // ISO 8601 string
}

// ──── Personal Study Planner ────
export interface StudyTask {
  id: string;                    // UUID
  userId: string;
  title: string;
  topicId: SubtopicId;
  dueDate: string;               // ISO date format (YYYY-MM-DD)
  estimatedMinutes: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  topicId: SubtopicId;
  dueDate: string;
  estimatedMinutes: number;
}

// ──── Auth ────
export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isGuest: boolean;
export type Subtopic =
  | 'cloud-computing'
  | 'cloud-benefits'
  | 'cloud-service-types'
  | 'core-architecture'
  | 'compute-networking'
  | 'storage-services'
  | 'identity-security'
  | 'cost-management'
  | 'governance-compliance'
  | 'managing-deploying'
  | 'monitoring-tools';

export const DOMAIN_LABELS: Record<Domain, string> = {
  'cloud-concepts': 'Cloud Concepts',
  'azure-architecture-services': 'Azure Architecture & Services',
  'azure-management-governance': 'Azure Management & Governance',
};

export const DOMAIN_WEIGHTS: Record<Domain, string> = {
  'cloud-concepts': '25–30%',
  'azure-architecture-services': '35–40%',
  'azure-management-governance': '30–35%',
};

export const SUBTOPIC_LABELS: Record<Subtopic, string> = {
  'cloud-computing': 'Describe Cloud Computing',
  'cloud-benefits': 'Benefits of Cloud Services',
  'cloud-service-types': 'Cloud Service Types',
  'core-architecture': 'Core Architectural Components',
  'compute-networking': 'Compute & Networking Services',
  'storage-services': 'Storage Services',
  'identity-security': 'Identity, Access & Security',
  'cost-management': 'Cost Management',
  'governance-compliance': 'Governance & Compliance',
  'managing-deploying': 'Managing & Deploying Resources',
  'monitoring-tools': 'Monitoring Tools',
};

export const DOMAIN_SUBTOPICS: Record<Domain, Subtopic[]> = {
  'cloud-concepts': ['cloud-computing', 'cloud-benefits', 'cloud-service-types'],
  'azure-architecture-services': [
    'core-architecture',
    'compute-networking',
    'storage-services',
    'identity-security',
  ],
  'azure-management-governance': [
    'cost-management',
    'governance-compliance',
    'managing-deploying',
    'monitoring-tools',
  ],
};

// ─── Quiz ───

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  domain: Domain;
  subtopic: Subtopic;
  difficulty: Difficulty;
export interface Subtopic {
  id: string;
  name: string;
  parentTopicId: TopicId;
}

export interface Topic {
  id: TopicId;
  name: string;
  weight: string;        // e.g. "25–30%"
  subtopics: Subtopic[];
  color: string;         // HSL or hex for UI theming
  icon: string;          // emoji for simple display
}

// === Quiz ===

export interface Question {
  id: string;            // e.g. "q-cc-001"
  topicId: TopicId;
  subtopicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceUrl: string;
  sourceLabel: string;
  flaggedForReview?: boolean;
}

export interface QuizConfig {
  topics: Domain[] | 'mixed';
  questionCount: number;
}

export interface QuizAttempt {
  id: string;
  userId: string | null;
  config: QuizConfig;
  questionIds: string[];
  answers: (number | null)[];
  score: number;
  totalQuestions: number;
  completedAt: string;
}

// ─── Flashcards ───

export interface Flashcard {
  id: string;
  domain: Domain;
  subtopic: Subtopic;
  front: string;
  back: string;
  sourceUrl: string;
}

export type FlashcardStatus = 'unseen' | 'know' | 'review';

export interface FlashcardProgress {
  cardId: string;
  userId: string | null;
  status: FlashcardStatus;
  lastReviewedAt: string;
}

// ─── Planner ───

export interface StudyTask {
  id: string;
  userId: string | null;
  title: string;
  domain: Domain;
  subtopic: Subtopic;
  dueDate: string;
  estimatedMinutes: number;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

// ─── Auth ───

export interface AppUser {
  id: string;
  email: string;
  displayName?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizConfig {
  topics: TopicId[];     // empty array = mixed (all topics)
  questionCount: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: string;
  config: QuizConfig;
  answers: QuizAnswer[];
  score: number;         // number of correct answers
  totalQuestions: number;
  completedAt: string;   // ISO 8601
}

// === Flashcard ===

export interface Flashcard {
  id: string;            // e.g. "fc-cc-001"
  topicId: TopicId;
  subtopicId: string;
  front: string;         // question or term
  back: string;          // answer or definition
  sourceUrl: string;
}

export type CardStatus = 'know_it' | 'review_again' | 'unseen';

export interface FlashcardProgress {
  cardId: string;
  status: CardStatus;
  lastReviewed: string;  // ISO 8601
}

// === Planner ===

export interface StudyTask {
  id: string;
  title: string;
  topicId: TopicId;
  dueDate: string;       // YYYY-MM-DD
  estimatedMinutes: number;
  isCompleted: boolean;
  completedAt: string | null;
  createdAt: string;     // ISO 8601
}
