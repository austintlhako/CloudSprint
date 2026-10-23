import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import LoginRequired from './LoginRequired';

const loginRequiredPaths = ['/quiz', '/flashcards', '/planner', '/labs', '/community', '/friends', '/profile', '/reviews', '/support', '/developer/testimonials'];

export default function Layout() {
  const { isGuest } = useAuth();
  const location = useLocation();
  const requiresLogin = isGuest && loginRequiredPaths.some((path) => location.pathname.startsWith(path));
  const showFooter = location.pathname === '/';
  const isPublicHome = isGuest && location.pathname === '/';
  useEffect(() => {
    try {
      const preferences = JSON.parse(localStorage.getItem('cloudsprint_accessibility') ?? '{}');
      document.documentElement.classList.toggle('accessibility-large-text', Boolean(preferences.largeText));
      document.documentElement.classList.toggle('accessibility-high-contrast', Boolean(preferences.highContrast));
      document.documentElement.classList.toggle('accessibility-reduced-motion', Boolean(preferences.reducedMotion));
    } catch {
      // Ignore malformed preferences and retain the default presentation.
    }
  }, []);

  return (
    <div className={`app-shell ${isPublicHome ? 'public-app-shell' : ''} flex min-h-dvh flex-col bg-navy-950 text-slate-100 selection:bg-azure-500 selection:text-white`}>
      {/* Skip to Content for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus-ring absolute top-3 left-3 z-60 rounded-lg bg-azure-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-azure-600/30"
      >
        Skip to main content
      </a>

      {/* Sticky Header / Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="app-main mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 focus:outline-none"
      >
        {requiresLogin ? <LoginRequired /> : <Outlet />}
      </main>

      {/* Persistent Footer */}
      {showFooter && <footer className="mt-auto border-t border-white/5 bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="footer-grid">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold text-slate-300">CloudSprint</p>
              <p className="text-[11px] text-slate-500">An unofficial AZ-900 learning companion.</p>
            </div>
            <div className="footer-links" aria-label="CloudSprint information">
              <div><strong>Features & programs</strong><Link to="/features">What's in CloudSprint</Link><Link to="/resources">Resources catalog</Link><Link to="/help">Help & FAQs</Link></div>
              <div><strong>About</strong><Link to="/about">About us</Link><Link to="/why-cloudsprint">Why CloudSprint</Link><Link to="/partner">Partner with CloudSprint</Link><a href="#landing-team">Meet the team</a></div>
              <div className="footer-contact"><strong>Contact</strong><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="CloudSprint on LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.2 3.5a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM1.1 8h4.2v12.5H1.1V8Zm6.8 0h4v1.7h.1c.6-1.1 2-2.2 4.1-2.2 4.3 0 5.1 2.8 5.1 6.5v6.5H17v-5.8c0-1.4 0-3.3-2-3.3s-2.3 1.5-2.3 3.2v5.9H7.9V8Z"/></svg></a><a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="CloudSprint on WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a12 12 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.4-8.3Zm-8.4 18.2h-.1a10 10 0 0 1-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a10 10 0 1 1 8.6 4.7Zm5.5-7.5c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.3 3.6 5.6 5 .8.3 1.5.5 2 .6.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z"/></svg></a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="CloudSprint on X" title="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.2 2h3.7l-8.1 9.3L23.3 22h-7.5l-5.9-7.7L3.2 22H-.5l8.7-10L-.3 2h7.7l5.3 7L18.2 2Zm-1.3 17.8h2L5.7 4H3.5l13.4 15.8Z"/></svg></a></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-4 text-center sm:flex-row sm:text-left">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] text-slate-500">
                © 2026 CloudSprint. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>}
    </div>
  );
}
