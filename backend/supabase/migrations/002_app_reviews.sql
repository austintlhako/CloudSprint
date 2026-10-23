CREATE TABLE IF NOT EXISTS public.app_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'CloudSprint learner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_app_reviews_rating_created_at
  ON public.app_reviews(rating DESC, created_at DESC);

ALTER TABLE public.app_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view app reviews"
  ON public.app_reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own app reviews"
  ON public.app_reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own app reviews"
  ON public.app_reviews
  FOR DELETE
  USING (auth.uid() = user_id);
