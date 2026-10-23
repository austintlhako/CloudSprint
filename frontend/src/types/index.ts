// src/types/index.ts

// ──── Shared Type Contracts ────
// This file defines the canonical TypeScript types used across the CloudSprint frontend.
// It has been cleaned up to remove duplicate and conflicting definitions.

// ----- Domain -----
export type Domain =
  | 'cloud-concepts'
  | 'azure-architecture-services'
  | 'azure-management-governance';
export type DomainId = Domain;

// ----- Topic -----
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

export type QuizSelection = DomainId | SubtopicId | 'mixed';

export interface Subtopic {
  id: SubtopicId;
  name: string;
  parentTopicId: TopicId;
}

export interface Topic {
  id: TopicId;
  name: string;
  weight: string; // e.g. "25–30%"
  subtopics: Subtopic[];
  color: string; // HSL or hex for UI theming
  icon: string; // emoji for simple display
}

// ----- Quiz Engine -----
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string; // e.g. "q-cc-001"
  topicId: SubtopicId;
  question: string;
  options: string[]; // exactly 4 options: [A, B, C, D]
  correctIndex: number; // 0‑based index
  explanation: string;
  optionExplanations?: string[]; // explanation for options A-D
  sourceUrl: string;
  difficulty: Difficulty;
}

// Compatibility alias used throughout the codebase
export type Question = QuizQuestion;

export interface QuizConfig {
  topicId: QuizSelection;
  questionCount: number;
  examType?: 'practice' | 'revision' | 'mock';
}

export interface QuizAttempt {
  questions: QuizQuestion[];
  answers: (number | null)[]; // selected index per question (null if unanswered)
  currentIndex: number;
  isSubmitted: boolean;
  score: number; // total correct answers
}

// ----- Flashcards -----
export interface Flashcard {
  id: string; // e.g. "fc-cc-001"
  topicId: DomainId;
  subtopicId?: SubtopicId;
  front: string; // term or question
  back: string; // definition or answer
  sourceUrl: string;
}

export type FlashcardStatus = 'know' | 'review' | 'unseen';

export interface FlashcardProgress {
  cardId: string;
  status: FlashcardStatus;
  lastReviewedAt: string; // ISO 8601 timestamp
}

// ----- Personal Study Planner -----
export interface StudyTask {
  id: string; // UUID
  userId: string | null;
  title: string;
  domain: Domain;
  subtopic: SubtopicId;
  dueDate: string; // ISO date (YYYY‑MM‑DD)
  dueTime?: string; // Local time (HH:MM)
  estimatedMinutes: number;
  isCompleted: boolean;
  createdAt: string; // ISO timestamp
  completedAt: string | null; // ISO timestamp or null
}

export interface CreateTaskInput {
  title: string;
  topicId: SubtopicId;
  dueDate: string;
  estimatedMinutes: number;
}

// ----- Auth -----
export interface AuthUser {
  id: string;
  email: string;
}

export interface AppUser extends AuthUser {
  displayName?: string;
  avatarUrl?: string;
  provider?: string;
}

export type EducationLevel = 'other' | 'university' | 'college' | 'bootcamp' | 'highschool';

export interface LearnerProfile {
  fullName: string;
  nickname: string;
  educationLevel: EducationLevel;
  country: string;
  githubUrl: string;
  linkedinUrl: string;
  school: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isGuest: boolean;
}

// ----- UI Labels & Helpers -----
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

export const SUBTOPIC_LABELS: Record<SubtopicId, string> = {
  'cc-cloud-computing': 'Describe Cloud Computing',
  'cc-cloud-benefits': 'Benefits of Cloud Services',
  'cc-cloud-service-types': 'Cloud Service Types',
  'aas-core-architecture': 'Core Architecture',
  'aas-compute-networking': 'Compute & Networking',
  'aas-storage': 'Storage Services',
  'aas-identity-security': 'Identity & Security',
  'amg-cost-management': 'Cost Management',
  'amg-governance-compliance': 'Governance & Compliance',
  'amg-managing-deploying': 'Managing & Deploying Resources',
  'amg-monitoring': 'Monitoring Tools',
};

export const DOMAIN_SUBTOPICS: Record<Domain, SubtopicId[]> = {
  'cloud-concepts': ['cc-cloud-computing', 'cc-cloud-benefits', 'cc-cloud-service-types'],
  'azure-architecture-services': [
    'aas-core-architecture',
    'aas-compute-networking',
    'aas-storage',
    'aas-identity-security',
  ],
  'azure-management-governance': [
    'amg-cost-management',
    'amg-governance-compliance',
    'amg-managing-deploying',
    'amg-monitoring',
  ],
};

// End of src/types/index.ts
