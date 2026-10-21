// src/lib/supabase.ts
// CloudSprint Supabase Client Configuration
// Only the anon key is used here. Never import service_role key in frontend code.

export interface QueryResponse<T> {
  data: T[] | null;
  error: Error | null;
}

export interface MutationResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface SupabaseClientLike {
  from: <T = Record<string, unknown>>(table: string) => {
    select: (columns?: string) => {
      eq: (column: string, value: unknown) => Promise<QueryResponse<T>>;
    };
    upsert: (values: Record<string, unknown>) => Promise<MutationResponse<T>>;
  };
}

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are configured in .env
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Supabase client instance.
 * Defaults to null in guest mode or before credentials are provided by Developer B.
 */
export const supabase: SupabaseClientLike | null = null;

export default supabase;
