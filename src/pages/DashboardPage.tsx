export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Hero Welcome Stub */}
      <section className="glass-card p-8 sm:p-10">
        <span className="inline-block rounded-full bg-azure-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-azure-400">
          AZ-900 Exam Sprint Workspace
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Welcome to <span className="gradient-text">CloudSprint</span>
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-400">
          Your focused workspace for mastering Microsoft Azure Fundamentals. Select a study module from the navigation or review your sprint readiness.
        </p>
      </section>

      {/* Placeholder Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="glass-card flex flex-col gap-2 p-6">
          <div className="text-2xl">📝</div>
          <h2 className="text-lg font-semibold text-white">Quiz Engine</h2>
          <p className="text-sm text-slate-400">33+ targeted questions across all 3 official AZ-900 domains.</p>
        </div>
        <div className="glass-card flex flex-col gap-2 p-6">
          <div className="text-2xl">🃏</div>
          <h2 className="text-lg font-semibold text-white">Flashcard Coach</h2>
          <p className="text-sm text-slate-400">Spaced active-recall cards with key definitions and architectures.</p>
        </div>
        <div className="glass-card flex flex-col gap-2 p-6">
          <div className="text-2xl">📅</div>
          <h2 className="text-lg font-semibold text-white">Study Planner</h2>
          <p className="text-sm text-slate-400">Organize daily study goals and track remaining preparation days.</p>
        </div>
      </div>
    </div>
  );
}
