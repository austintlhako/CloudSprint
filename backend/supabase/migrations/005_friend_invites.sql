-- CloudSprint: friend invite records
CREATE TABLE IF NOT EXISTS public.friend_invites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inviter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient TEXT NOT NULL CHECK (char_length(trim(recipient)) >= 3),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.friend_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own friend invites"
  ON public.friend_invites FOR SELECT
  USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create their own friend invites"
  ON public.friend_invites FOR INSERT
  WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can update their own friend invites"
  ON public.friend_invites FOR UPDATE
  USING (auth.uid() = inviter_id)
  WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can delete their own friend invites"
  ON public.friend_invites FOR DELETE
  USING (auth.uid() = inviter_id);

GRANT ALL ON TABLE public.friend_invites TO authenticated, service_role;
