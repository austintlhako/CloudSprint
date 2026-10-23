export interface AppReview {
  id: string;
  rating: number;
  text: string;
  author: string;
  createdAt: string;
}

const reviewsKey = 'cloudsprint_app_reviews';
const legacyReviewKey = 'cloudsprint_app_review';

export function getAppReviews(): AppReview[] {
  try {
    const saved = JSON.parse(localStorage.getItem(reviewsKey) ?? '[]');
    if (Array.isArray(saved)) return saved as AppReview[];

    const legacy = JSON.parse(localStorage.getItem(legacyReviewKey) ?? 'null');
    return legacy?.rating ? [{
      id: `review-${legacy.createdAt ?? Date.now()}`,
      rating: legacy.rating,
      text: legacy.text ?? '',
      author: 'CloudSprint learner',
      createdAt: legacy.createdAt ?? new Date().toISOString(),
    }] : [];
  } catch {
    return [];
  }
}

export function saveAppReview(review: Omit<AppReview, 'id' | 'createdAt'>): AppReview {
  const nextReview: AppReview = {
    ...review,
    id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(reviewsKey, JSON.stringify([nextReview, ...getAppReviews()]));
  return nextReview;
}

export function saveDeveloperReview(review: Omit<AppReview, 'id' | 'createdAt'>): AppReview {
  return saveAppReview({ ...review, author: review.author.trim() || 'CloudSprint developer' });
}

export function getTopAppReviews(limit = 3): AppReview[] {
  return [...getAppReviews()]
    .sort((a, b) => b.rating - a.rating || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getDailyFeaturedReviews(reviews: AppReview[], limit = 4): AppReview[] {
  if (reviews.length <= limit) return reviews;
  const day = Math.floor(Date.now() / 86400000);
  const start = day % reviews.length;
  return Array.from({ length: limit }, (_, index) => reviews[(start + index) % reviews.length]);
}

function mapSharedReview(review: { id: string; rating: number; review_text: string; author: string; created_at: string }): AppReview {
  return {
    id: review.id,
    rating: review.rating,
    text: review.review_text,
    author: review.author,
    createdAt: review.created_at,
  };
}

export async function getAvailableReviews(limit?: number): Promise<AppReview[]> {
  if (!supabase) return limit ? getTopAppReviews(limit) : getAppReviews();
  const query = supabase
    .from('app_reviews')
    .select('id, rating, review_text, author, created_at')
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false });
  const { data, error } = limit ? await query.limit(limit) : await query;
  if (error) {
    console.warn('[CloudSprint] Shared reviews unavailable; using local reviews.', error.message);
    return limit ? getTopAppReviews(limit) : getAppReviews();
  }
  return (data ?? []).map(mapSharedReview);
}

export async function saveAvailableReview(review: Omit<AppReview, 'id' | 'createdAt'>, userId?: string): Promise<AppReview> {
  if (!supabase || !userId) return saveAppReview(review);
  const { data, error } = await supabase
    .from('app_reviews')
    .insert({ user_id: userId, rating: review.rating, review_text: review.text, author: review.author })
    .select('id, rating, review_text, author, created_at')
    .single();
  if (error || !data) {
    console.warn('[CloudSprint] Shared review could not be saved; saving locally.', error?.message);
    return saveAppReview(review);
  }
  return mapSharedReview(data);
}
import { supabase } from '../lib/supabase';
