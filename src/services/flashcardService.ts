// ============================================================
// CloudSprint — Flashcard Service
//
// Handles flashcard retrieval and progress tracking
// via localStorage.
// ============================================================

import { flashcards } from '../data/flashcards';
import { getItem, setItem } from '../lib/storage';
import type { CardStatus, Flashcard, FlashcardProgress, TopicId } from '../types';

const FLASHCARD_PROGRESS_KEY = 'flashcard_progress';

/**
 * Get all flashcards, optionally filtered by topic.
 */
export function getFlashcardsByTopic(topicId: TopicId): Flashcard[] {
  return flashcards.filter((fc) => fc.topicId === topicId);
}

/**
 * Get all flashcards across all topics.
 */
export function getAllFlashcards(): Flashcard[] {
  return [...flashcards];
}

/**
 * Save the review state for a single card.
 */
export function saveCardProgress(cardId: string, status: CardStatus): void {
  const allProgress = getCardProgress();
  const existing = allProgress.findIndex((p) => p.cardId === cardId);
  const entry: FlashcardProgress = {
    cardId,
    status,
    lastReviewed: new Date().toISOString(),
  };

  if (existing >= 0) {
    allProgress[existing] = entry;
  } else {
    allProgress.push(entry);
  }

  setItem(FLASHCARD_PROGRESS_KEY, allProgress);
}

/**
 * Load all card progress from localStorage.
 */
export function getCardProgress(): FlashcardProgress[] {
  return getItem<FlashcardProgress[]>(FLASHCARD_PROGRESS_KEY) ?? [];
}

/**
 * Get the review status for a specific card.
 */
export function getCardStatus(cardId: string): CardStatus {
  const progress = getCardProgress();
  const entry = progress.find((p) => p.cardId === cardId);
  return entry?.status ?? 'unseen';
}

/**
 * Get summary stats for the dashboard.
 */
export function getFlashcardStats() {
  const total = flashcards.length;
  const progress = getCardProgress();
  const known = progress.filter((p) => p.status === 'know_it').length;
  const reviewing = progress.filter((p) => p.status === 'review_again').length;
  const unseen = total - known - reviewing;

  return { total, known, reviewing, unseen };
}
