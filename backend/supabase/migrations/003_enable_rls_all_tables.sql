-- CloudSprint: ensure RLS is enabled on every application table.
-- Safe to run against an existing Supabase project.

ALTER TABLE IF EXISTS public.study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.app_reviews ENABLE ROW LEVEL SECURITY;
