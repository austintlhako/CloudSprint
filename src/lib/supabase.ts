// ============================================================
// Supabase Client — Dev B owns this file
// ============================================================
// Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from .env.local
// Only the publishable anon key is used — never the service-role key.
// ============================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// If env vars are missing, we run in "guest-only" mode — no Supabase calls.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
