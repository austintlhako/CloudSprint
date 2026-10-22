import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-navy-950 text-slate-100 selection:bg-azure-500 selection:text-white">
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
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 focus:outline-none"
      >
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <footer className="mt-auto border-t border-white/5 bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold text-slate-300">
                CloudSprint — AZ-900 Learning Workspace
              </p>
              <p className="text-[11px] text-slate-500">
                1MillionDevs Hackathon 2026 · Built with React & Tailwind CSS
              </p>
            </div>
            <p className="max-w-md text-[11px] leading-relaxed text-slate-400">
              <span className="mr-1" aria-hidden="true">⚠️</span>
              This tool supports revision but does not guarantee exam readiness or predict official examination results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
