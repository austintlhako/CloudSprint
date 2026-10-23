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
// ============================================================
// Flashcard Service — Dev B
// ============================================================
// Manages flashcard recall progress ('unseen', 'know', 'review').
// Persists to Supabase for logged-in users and localStorage for guests.
// ============================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Domain, Flashcard, FlashcardProgress } from '../types';

const LOCAL_STORAGE_KEY = 'cloudsprint_flashcard_progress';

// Starter flashcards in case data/flashcards.ts is still being authored by Dev C
export const DEFAULT_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-cc-001',
    domain: 'cloud-concepts',
    subtopic: 'cloud-computing',
    front: 'What is High Availability (HA) in Cloud Computing?',
    back: 'The ability of a system to remain operational and accessible with minimal downtime, typically measured in 99.9% to 99.999% uptime SLAs.',
    sourceUrl: 'https://learn.microsoft.com/azure/well-architected/reliability/',
  },
  {
    id: 'fc-cc-002',
    domain: 'cloud-concepts',
    subtopic: 'cloud-benefits',
    front: 'Differentiate CapEx vs. OpEx.',
    back: 'CapEx (Capital Expenditure) requires upfront spending on physical hardware. OpEx (Operational Expenditure) involves paying for services as you consume them with no upfront cost.',
    sourceUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/',
  },
  {
    id: 'fc-arch-001',
    domain: 'azure-architecture-services',
    subtopic: 'core-architecture',
    front: 'What is an Azure Availability Zone?',
    back: 'Physically separate datacenters within an Azure region, each equipped with independent power, cooling, and networking.',
    sourceUrl: 'https://learn.microsoft.com/azure/reliability/availability-zones-overview',
  },
];

// Helper: read progress from localStorage
function getLocalProgress(): FlashcardProgress[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FlashcardProgress[]) : [];
  } catch (err) {
    console.error('Failed to parse local flashcard progress:', err);
    return [];
  }
}

// Helper: save progress to localStorage
function saveLocalProgress(progressList: FlashcardProgress[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progressList));
  } catch (err) {
    console.error('Failed to persist local flashcard progress:', err);
  }
}

/**
 * Get flashcards filtered by domain (optional).
 */
export function getFlashcardsByTopic(domain?: Domain): Flashcard[] {
  if (!domain) return DEFAULT_FLASHCARDS;
  return DEFAULT_FLASHCARDS.filter((card) => card.domain === domain);
}

/**
 * Fetch progress for all flashcards for a specific user.
 */
export async function getFlashcardProgress(
  userId: string | null
): Promise<FlashcardProgress[]> {
  if (userId && isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('flashcard_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.warn('Supabase flashcard progress fetch failed, falling back to local storage:', error.message);
        return getLocalProgress();
      }

      return (data || []).map((row) => ({
        cardId: row.card_id,
        userId: row.user_id,
        status: row.status,
        lastReviewedAt: row.last_reviewed_at,
      }));
    } catch (err) {
      console.warn('Error fetching flashcard progress:', err);
      return getLocalProgress();
    }
  }

  return getLocalProgress();
}

/**
 * Update the user's progress for a flashcard (marking as 'know' or 'review').
 */
export async function updateFlashcardProgress(
  progress: FlashcardProgress
): Promise<void> {
  const now = new Date().toISOString();

  if (progress.userId && isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('flashcard_progress')
        .upsert(
          {
            user_id: progress.userId,
            card_id: progress.cardId,
            status: progress.status,
            last_reviewed_at: now,
          },
          { onConflict: 'user_id,card_id' }
        );

      if (error) {
        console.warn('Supabase progress upsert failed, syncing to local storage:', error.message);
      }
    } catch (err) {
      console.warn('Error saving flashcard progress to Supabase:', err);
    }
  }

  // Always update local storage
  const list = getLocalProgress();
  const idx = list.findIndex((item) => item.cardId === progress.cardId);

  const updatedItem: FlashcardProgress = {
    ...progress,
    lastReviewedAt: now,
  };

  if (idx >= 0) {
    list[idx] = updatedItem;
  } else {
    list.push(updatedItem);
  }

  saveLocalProgress(list);
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
