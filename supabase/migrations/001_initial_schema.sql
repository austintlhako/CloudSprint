-- ============================================================
-- CloudSprint: AZ-900 Learning Workspace
-- Migration: 001_initial_schema.sql
-- Owner: Dev B (Backend Engineer)
-- ============================================================
-- Run this in the Supabase SQL Editor for your project.
-- ============================================================

-- 1. STUDY TASKS (Personal Study Planner)
-- Stores custom study goals, scheduled topics, and completion status.
CREATE TABLE IF NOT EXISTS public.study_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  subtopic TEXT NOT NULL,
  due_date DATE NOT NULL,
  estimated_minutes INTEGER NOT NULL DEFAULT 30,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Index for speedy queries by user and date
CREATE INDEX IF NOT EXISTS idx_study_tasks_user_id ON public.study_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_study_tasks_due_date ON public.study_tasks(due_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;

-- Study Tasks RLS Policies
CREATE POLICY "Users can view their own study tasks"
  ON public.study_tasks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study tasks"
  ON public.study_tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study tasks"
  ON public.study_tasks
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study tasks"
  ON public.study_tasks
  FOR DELETE
  USING (auth.uid() = user_id);


-- 2. FLASHCARD PROGRESS (Flashcard Coach)
-- Tracks mastery status (know vs review) per card per user.
CREATE TABLE IF NOT EXISTS public.flashcard_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unseen' CHECK (status IN ('unseen', 'know', 'review')),
  last_reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_card UNIQUE (user_id, card_id)
);

-- Index for rapid lookup by user and card
CREATE INDEX IF NOT EXISTS idx_flashcard_progress_user ON public.flashcard_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcard_progress_status ON public.flashcard_progress(user_id, status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;

-- Flashcard Progress RLS Policies
CREATE POLICY "Users can view their own flashcard progress"
  ON public.flashcard_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own flashcard progress"
  ON public.flashcard_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own flashcard progress"
  ON public.flashcard_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own flashcard progress"
  ON public.flashcard_progress
  FOR DELETE
  USING (auth.uid() = user_id);


-- 3. QUIZ ATTEMPTS (Smart Quiz Builder)
-- Records historical quiz sessions, answers, and scores.
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  config_json JSONB NOT NULL,
  question_ids TEXT[] NOT NULL,
  answers INTEGER[] NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for historical query retrieval by user
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed_at ON public.quiz_attempts(completed_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Quiz Attempts RLS Policies
CREATE POLICY "Users can view their own quiz attempts"
  ON public.quiz_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts"
  ON public.quiz_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quiz attempts"
  ON public.quiz_attempts
  FOR DELETE
  USING (auth.uid() = user_id);
