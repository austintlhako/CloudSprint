// ============================================================
// CloudSprint — Shared Type Definitions
// All features import types from this single file.
// Only Developer C should edit this file directly.
// ============================================================

// === Topic Taxonomy ===

export type TopicId =
  | 'cloud-concepts'
  | 'azure-architecture-services'
  | 'azure-management-governance';

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
