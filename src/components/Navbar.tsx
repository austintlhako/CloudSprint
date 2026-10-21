import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/quiz', label: 'Quiz', icon: '📝' },
  { to: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { to: '/planner', label: 'Planner', icon: '📅' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/5 bg-navy-950/80 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="focus-ring flex items-center gap-2 rounded-lg text-lg font-bold text-white no-underline"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-azure-500 to-teal-400 text-sm">
            ⚡
          </span>
          <span className="gradient-text">CloudSprint</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ to, label, icon }) => {
            const isActive =
              to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(to);

            return (
              <Link
                key={to}
                to={to}
                className={`focus-ring flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="hidden sm:inline" aria-hidden="true">
                  {icon}
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
