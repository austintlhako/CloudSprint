export default function QuizPage() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-azure-500/10 text-3xl text-azure-400">
          📝
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">Quiz Engine</h1>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          Domain-specific and full mock quizzes are being wired up by Developer C.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-xs font-medium text-slate-400">
          <span className="h-2 w-2 rounded-full bg-azure-400 animate-pulse" />
          Module Status: Feature in progress (Developer C)
        </div>
      </div>
    </div>
  );
}
