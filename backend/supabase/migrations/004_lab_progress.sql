-- CloudSprint: guided lab completion tracking
CREATE TABLE IF NOT EXISTS public.lab_progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, lab_id)
);

ALTER TABLE public.lab_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own lab progress"
  ON public.lab_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own lab progress"
  ON public.lab_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lab progress"
  ON public.lab_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lab progress"
  ON public.lab_progress FOR DELETE
  USING (auth.uid() = user_id);

GRANT ALL ON TABLE public.lab_progress TO authenticated, service_role;
