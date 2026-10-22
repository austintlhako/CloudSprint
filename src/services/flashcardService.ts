import type { Flashcard, FlashcardStatus, FlashcardProgress, SubtopicId } from '../types';
import { FLASHCARDS } from '../data/flashcards';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'cloudsprint_flashcard_progress';

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
      .from<FlashcardProgressRow>('flashcard_progress')
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
