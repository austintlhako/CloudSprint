// ============================================================
// CloudSprint — Shared Type Contracts
// ============================================================
// This file is SHARED across all developers.
// Changes require team agreement before editing.
// ============================================================

// ─── Topic Taxonomy (verified from AZ-900 study guide, July 20 2026) ───

export type Domain =
  | 'cloud-concepts'
  | 'azure-architecture-services'
  | 'azure-management-governance';

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
}
