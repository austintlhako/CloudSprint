// ============================================================
// Auth Modal Component — Dev B
// ============================================================
// Allows users to Sign In, Sign Up, or Continue as Guest.
// Supports optional account authentication alongside guest mode.
// ============================================================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp, resetPassword, signInWithProvider, isGuest } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isForgotPassword) {
        const res = await resetPassword(email);
        if (res.error) setError(res.error);
        else setSuccessMsg('Password reset instructions sent. Check your email, then welcome back to CloudSprint.');
      } else if (isSignUp) {
        const res = await signUp(email, password, displayName);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccessMsg('Account created successfully! Check your email to confirm if required.');
          setTimeout(() => {
            setSuccessMsg('Welcome back to CloudSprint!');
            setTimeout(onClose, 900);
          }, 1500);
        }
      } else {
        const res = await signIn(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          onClose();
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: 'google' | 'github') => {
    setError(null);
    setLoading(true);
    const result = await signInWithProvider(provider);
    if (result.error) setError(result.error);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="auth-modal-card relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-1 text-white">
          {isForgotPassword ? 'Reset your CloudSprint password' : isSignUp ? 'Create your CloudSprint account' : 'Welcome back to CloudSprint'}
        </h2>
        <p className="text-sm text-slate-400 text-center mb-6">
          {isForgotPassword
            ? 'Enter your email and we will send you a secure password reset link.'
            : isSignUp
            ? 'Sign up to sync your study tasks and quiz progress across devices.'
            : 'Sign in to continue your AZ-900 study journey.'}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" aria-label={isForgotPassword ? 'Reset password form' : isSignUp ? 'Create account form' : 'Sign in form'}>
          {!isForgotPassword && <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => handleProviderSignIn('google')} disabled={loading} className="auth-provider-button rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
              <svg className="auth-provider-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M21.6 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.38a4.6 4.6 0 0 1-1.99 3.02v2.5h3.22c1.89-1.74 2.99-4.3 2.99-7.55Z" />
                <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.44l-3.22-2.5c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H3.06v2.58A10 10 0 0 0 12 22Z" />
                <path fill="#FBBC05" d="M6.39 13.89A6.02 6.02 0 0 1 6.08 12c0-.66.11-1.3.31-1.89V7.53H3.06A10 10 0 0 0 2 12c0 1.61.39 3.13 1.06 4.47l3.33-2.58Z" />
                <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.97 2.99 14.7 2 12 2a10 10 0 0 0-8.94 5.53l3.33 2.58C7.18 7.74 9.39 5.98 12 5.98Z" />
              </svg>
              <span>Google</span>
            </button>
            <button type="button" onClick={() => handleProviderSignIn('github')} disabled={loading} className="auth-provider-button rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
              <svg className="auth-provider-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 7.99c.85 0 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.73c0 .26.18.57.69.47A10 10 0 0 0 12 2Z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>}
          {!isForgotPassword && <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-slate-500">
            <span className="h-px flex-1 bg-slate-800" /> or email <span className="h-px flex-1 bg-slate-800" />
          </div>}
          {isSignUp && !isForgotPassword && (
            <div>
              <label htmlFor="signup-display-name" className="block text-xs font-medium text-slate-300 mb-1">Display Name</label>
              <input
                id="signup-display-name"
                name="displayName"
                type="text"
                autoComplete="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Azure Learner"
                pattern="^\s*\S+(?:\s+\S+)+\s*$"
                title="Enter your first and last name."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {!isForgotPassword && <div>
            <label htmlFor="auth-password" className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="password-input-wrap">
            <input
              id="auth-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button type="button" className="password-visibility-button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>}

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-600/30 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isForgotPassword ? 'Send reset link' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          {!isSignUp && !isForgotPassword && <button type="button" onClick={() => { setIsForgotPassword(true); setError(null); setSuccessMsg(null); }} className="underline hover:text-blue-400">Forgot password?</button>}
          {isForgotPassword && <button type="button" onClick={() => { setIsForgotPassword(false); setError(null); setSuccessMsg(null); }} className="underline hover:text-blue-400">Back to sign in</button>}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setIsForgotPassword(false);
              setError(null);
              setSuccessMsg(null);
            }}
            className="hover:text-blue-400 transition-colors"
          >
            {!isForgotPassword && (isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up")}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors underline"
          >
            {isGuest ? 'Continue as Guest' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
