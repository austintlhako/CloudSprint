// ============================================================
// Auth Context — Dev B owns this file
// ============================================================
// Provides authentication state throughout the app.
// Falls back to guest mode if Supabase is not configured.
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { AppUser } from '../types';

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const sessionMarkerKey = 'cloudsprint_authenticated_session';

function mapUser(sessionUser: User): AppUser {
  return {
    id: sessionUser.id,
    email: sessionUser.email ?? '',
    displayName: sessionUser.user_metadata?.display_name,
    avatarUrl: sessionUser.user_metadata?.avatar_url,
    provider: sessionUser.app_metadata?.provider,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // Guest mode — no auth available
      setIsLoading(false);
      return;
    }
    const client = supabase;

    // Listen for auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        if (event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') {
          sessionStorage.setItem(sessionMarkerKey, 'true');
        }
        setUser(mapUser(session.user));
      } else {
        sessionStorage.removeItem(sessionMarkerKey);
        setUser(null);
      }
    });

    // Supabase normally persists sessions in localStorage. Require a fresh
    // sign-in for each browser session while keeping refreshes signed in.
    client.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user && sessionStorage.getItem(sessionMarkerKey) === 'true') {
        setUser(mapUser(session.user));
      } else if (session?.user) {
        await client.auth.signOut();
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<{ error: string | null }> => {
    if (!supabase) return { error: 'Authentication is not configured.' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) sessionStorage.setItem(sessionMarkerKey, 'true');
    return { error: error?.message ?? null };
  };

  const signUp = async (
    email: string,
    password: string,
    displayName?: string,
  ): Promise<{ error: string | null }> => {
    if (!supabase) return { error: 'Authentication is not configured.' };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: displayName ? { data: { display_name: displayName } } : undefined,
    });
    if (!error) sessionStorage.setItem(sessionMarkerKey, 'true');
    return { error: error?.message ?? null };
  };

  const resetPassword = async (email: string): Promise<{ error: string | null }> => {
    if (!supabase) return { error: 'Password reset is not configured. Connect Supabase first.' };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    sessionStorage.removeItem(sessionMarkerKey);
  };

  const signInWithProvider = async (
    provider: 'google' | 'github',
  ): Promise<{ error: string | null }> => {
    if (!supabase) return { error: 'Authentication is not configured. Continue as a guest or connect Supabase first.' };
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    return { error: error?.message ?? null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isGuest: !user,
        signIn,
        resetPassword,
        signUp,
        signOut,
        signInWithProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
