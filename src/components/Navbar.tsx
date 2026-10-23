import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkItem {
  to: string;
  label: string;
  icon: string;
  badge?: string;
}

const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/quiz', label: 'Quiz', icon: '📝' },
  { to: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { to: '/planner', label: 'Planner', icon: '📅' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);


  // Close mobile drawer on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/5 bg-navy-950/85 backdrop-blur-xl transition-colors"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="focus-ring group flex items-center gap-2.5 rounded-lg text-lg font-bold text-white no-underline"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-azure-500 to-teal-400 text-sm shadow-md shadow-azure-500/20 transition-transform group-hover:scale-105">
            ⚡
          </span>
          <div className="flex flex-col">
            <span className="gradient-text font-extrabold tracking-tight">CloudSprint</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:hidden">
              AZ-900 Sprint
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex sm:items-center sm:gap-1.5" role="menubar">
          {navLinks.map(({ to, label, icon }) => {
            const isActive =
              to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(to);

            return (
              <Link
                key={to}
                to={to}
                role="menuitem"
                className={`focus-ring flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium no-underline transition-all ${
                  isActive
                    ? 'border border-azure-500/30 bg-azure-500/15 text-azure-300 shadow-sm shadow-azure-500/10'
                    : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span aria-hidden="true" className="text-base">
                  {icon}
                </span>
                <span>{label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-azure-400" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-navigation-menu"
          className="border-t border-white/5 bg-navy-950/95 px-4 pt-3 pb-4 backdrop-blur-2xl sm:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map(({ to, label, icon }) => {
              const isActive =
                to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(to);

              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`focus-ring flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium no-underline transition-all ${
                    isActive
                      ? 'border border-azure-500/30 bg-azure-500/15 text-azure-300 font-semibold'
                      : 'border border-transparent text-slate-300 hover:border-white/5 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">
                      {icon}
                    </span>
                    <span>{label}</span>
                  </div>
                  {isActive && (
                    <span className="rounded-full bg-azure-500/20 px-2 py-0.5 text-xs font-semibold text-azure-300">
                      Active
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
