// ============================================================
// Supabase Client — Dev B
// ============================================================
// Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from .env
// Only the publishable anon key is used — never the service-role key.
// ============================================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Validate environment variables
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('your-project-ref')
);

// Helpful error message for missing configuration
export function getMissingEnvVarsMessage(): string {
  const missing: string[] = [];
  if (!supabaseUrl || supabaseUrl.trim() === '' || supabaseUrl.includes('your-project-ref')) {
    missing.push('VITE_SUPABASE_URL');
  }
  if (!supabaseAnonKey || supabaseAnonKey.trim() === '' || supabaseAnonKey.includes('your-publishable-anon-key')) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }
  return (
    `[CloudSprint] Missing required Supabase environment variable(s): ${missing.join(', ')}. ` +
    'Please copy .env.example to .env.local and populate with your Supabase project credentials.'
  );
}

// Assert helper that throws a clear, helpful error if env vars are missing
export function assertSupabaseConfigured(): void {
  if (!isSupabaseConfigured) {
    throw new Error(getMissingEnvVarsMessage());
  }
}

// Client retrieval helper that throws a helpful error if unconfigured
export function getSupabase(): SupabaseClient {
  assertSupabaseConfigured();
  return supabase!;
}

// Log a non-crashing helpful warning in development if unconfigured
if (!isSupabaseConfigured) {
  console.warn(getMissingEnvVarsMessage());
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
