import type { Flashcard, FlashcardStatus, FlashcardProgress, SubtopicId } from '../types';
import { FLASHCARDS } from '../data/flashcards';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'cloudsprint_flashcard_progress';
const REVIEW_HISTORY_KEY = 'cloudsprint_flashcard_reviews';

export interface FlashcardReview {
  id: string;
  userId: string | null;
  flashcardId: string;
  rating: 'know' | 'review';
  reviewedAt: string;
  nextReviewAt: string;
}

interface FlashcardProgressRow {
  card_id: string;
  status: FlashcardStatus;
}

/**
 * Returns all available flashcards across all domains
 */
export function getAllFlashcards(): Flashcard[] {
  return FLASHCARDS;
}

/**
 * Filters flashcards by a specific SubtopicId, or returns all if 'all'
 */
export function getFlashcardsByTopic(topicId: SubtopicId | 'all'): Flashcard[] {
  if (topicId === 'all') {
    return FLASHCARDS;
  }
  return FLASHCARDS.filter((card) => card.topicId === topicId);
}

/**
 * Reads local flashcard progress from localStorage
 */
export function getLocalProgress(): Record<string, FlashcardStatus> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, FlashcardStatus>;
  } catch (error) {
    console.warn('Failed to read flashcard progress from localStorage:', error);
    return {};
  }
}

/**
 * Saves a flashcard review status into localStorage
 */
export function saveLocalProgress(cardId: string, status: FlashcardStatus): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalProgress();
    current[cardId] = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (error) {
    console.warn('Failed to save flashcard progress to localStorage:', error);
  }
}

export function getFlashcardReviewHistory(): FlashcardReview[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(REVIEW_HISTORY_KEY) ?? '[]') as FlashcardReview[];
  } catch {
    return [];
  }
}

export function saveFlashcardReview(cardId: string, rating: 'know' | 'review', userId: string | null = null): void {
  if (typeof window === 'undefined') return;
  const reviewedAt = new Date();
  const nextReviewAt = new Date(reviewedAt);
  nextReviewAt.setDate(nextReviewAt.getDate() + (rating === 'review' ? 1 : 7));
  const review: FlashcardReview = {
    id: `${cardId}-${reviewedAt.getTime()}`,
    userId,
    flashcardId: cardId,
    rating,
    reviewedAt: reviewedAt.toISOString(),
    nextReviewAt: nextReviewAt.toISOString(),
  };
  const history = getFlashcardReviewHistory();
  localStorage.setItem(REVIEW_HISTORY_KEY, JSON.stringify([...history, review].slice(-500)));
}

/**
 * Helper to convert map to FlashcardProgress array
 */
export function toProgressArray(progressMap: Record<string, FlashcardStatus>): FlashcardProgress[] {
  return Object.entries(progressMap).map(([cardId, status]) => ({
    cardId,
    status,
    lastReviewedAt: new Date().toISOString(),
  }));
}

/**
 * Retrieves flashcard progress for a user.
 * Reads from Supabase if configured & user is authenticated; seamlessly falls back to localStorage.
 */
export async function getFlashcardProgress(
  userId?: string
): Promise<Record<string, FlashcardStatus>> {
  // Immediate localStorage fallback (Guest mode or offline)
  const localMap = getLocalProgress();

  if (!userId || !supabase) {
    return localMap;
  }

  try {
    const { data, error } = await supabase
      .from('flashcard_progress')
      .select('card_id, status')
      .eq('user_id', userId);

    if (!error && data && Array.isArray(data)) {
      const remoteMap: Record<string, FlashcardStatus> = { ...localMap };
      data.forEach((row) => {
        remoteMap[row.card_id] = row.status;
      });
      return remoteMap;
    }
  } catch (err) {
    console.warn('Supabase fetch failed, using local progress fallback:', err);
  }

  return localMap;
}

/**
 * Saves flashcard progress.
 * Always caches to localStorage immediately, and syncs to Supabase if authenticated.
 */
export async function saveFlashcardProgress(
  cardId: string,
  status: FlashcardStatus,
  userId?: string
): Promise<void> {
  // 1. Instant local persistence
  saveLocalProgress(cardId, status);
  saveFlashcardReview(cardId, status === 'review' ? 'review' : 'know', userId ?? null);

  // 2. Sync to Supabase if client is active and user is signed in
  if (userId && supabase) {
    try {
      await supabase.from('flashcard_progress').upsert({
        user_id: userId,
        card_id: cardId,
        status: status,
        last_reviewed_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Failed to sync flashcard progress to Supabase:', err);
    }
  }
}

export function getCardProgress(): FlashcardProgress[] {
  const progress = getLocalProgress();
  return Object.entries(progress).map(([cardId, status]) => ({
    cardId,
    status,
    lastReviewedAt: '',
  }));
}

export function getFlashcardStats() {
  const progress = getLocalProgress();
  const known = Object.values(progress).filter((status) => status === 'know').length;
  const reviewing = Object.values(progress).filter((status) => status === 'review').length;
  return {
    total: FLASHCARDS.length,
    known,
    reviewing,
    unseen: Math.max(0, FLASHCARDS.length - known - reviewing),
  };
}
