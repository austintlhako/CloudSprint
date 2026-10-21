// src/types/index.ts

// ──── Topic Taxonomy ────
export type DomainId =
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
}
