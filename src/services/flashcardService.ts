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
}
