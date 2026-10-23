export default function FlashcardsPage() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-3xl text-teal-400">
          🃏
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">Flashcard Coach</h1>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          Interactive 3D active recall flashcards are being built by Developer B.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-xs font-medium text-slate-400">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          Module Status: Feature in progress (Developer B)
        </div>
      </div>
    </div>
  );
}
