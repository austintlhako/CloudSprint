import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-navy-950">
      <Navbar />

      {/* Main content area */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-slate-500">
              CloudSprint — AZ-900 Learning Workspace · 1MillionDevs Hackathon 2026
            </p>
            <p className="text-xs text-slate-600">
              ⚠️ This tool supports revision but does not guarantee exam readiness
              or predict official examination results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
