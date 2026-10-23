import { useState } from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import ProgressBar from '../components/ProgressBar';
import { topics } from '../data/topics';
import { questions } from '../data/questions';
import { flashcards } from '../data/flashcards';
import { getQuizHistory, getQuizStats } from '../services/quizService';
import { getFlashcardStats, getCardProgress } from '../services/flashcardService';
import { getTasks, getPlannerStats, getUpcomingTasks } from '../services/plannerService';
import type { QuizAttempt, StudyTask, TopicId } from '../types';

export default function DashboardPage() {
  // Load live data from services via lazy state initializers
  const [quizHistory] = useState<QuizAttempt[]>(() => getQuizHistory());
  const [tasks] = useState<StudyTask[]>(() => getTasks());
  const [upcomingTask] = useState<StudyTask | null>(() => {
    const upcoming = getUpcomingTasks();
    const all = getTasks();
    return upcoming.length > 0 ? upcoming[0] : all.find((t) => !t.isCompleted) ?? null;
  });

  const quizStats = getQuizStats();
  const flashcardStats = getFlashcardStats();
  const plannerStats = getPlannerStats();

  // Calculate overall readiness score (weighted average of quiz, flashcards, tasks)
  // Max weight: 40% Quiz performance, 35% Flashcards mastered, 25% Study tasks completed
  const quizComponent = quizStats.totalAttempts > 0 ? quizStats.averageScore : 0;
  const flashcardComponent = flashcardStats.total > 0
    ? Math.round((flashcardStats.known / flashcardStats.total) * 100)
    : 0;
  const taskComponent = plannerStats.total > 0
    ? Math.round((plannerStats.completed / plannerStats.total) * 100)
    : 0;

  const hasAnyActivity = quizStats.totalAttempts > 0 || flashcardStats.known > 0 || plannerStats.completed > 0;

  // Overall readiness calculation
  const overallReadiness = hasAnyActivity
    ? Math.min(100, Math.round(quizComponent * 0.4 + flashcardComponent * 0.35 + taskComponent * 0.25))
    : 0;

  // Domain progress calculations
  const cardProgress = getCardProgress();
  const domainProgress = topics.map((topic) => {
    // Flashcard mastery for topic
    const topicCards = flashcards.filter((fc) => fc.topicId === topic.id);
    const knownInTopic = topicCards.filter((fc) => {
      const p = cardProgress.find((cp) => cp.cardId === fc.id);
      return p?.status === 'know_it';
    }).length;
    const cardPct = topicCards.length > 0 ? (knownInTopic / topicCards.length) * 100 : 0;

    // Tasks completed for topic
    const topicTasks = tasks.filter((t) => t.topicId === topic.id);
    const doneTasks = topicTasks.filter((t) => t.isCompleted).length;
    const taskPct = topicTasks.length > 0 ? (doneTasks / topicTasks.length) * 100 : 0;

    // Combined domain readiness
    const hasTopicData = knownInTopic > 0 || doneTasks > 0;
    const score = hasTopicData
      ? Math.round(cardPct * 0.6 + (topicTasks.length > 0 ? taskPct * 0.4 : cardPct * 0.4))
      : 0;

    return {
      topic,
      score: Math.min(100, score),
      cardsCount: topicCards.length,
      knownCards: knownInTopic,
      questionsCount: questions.filter((q) => q.topicId === topic.id).length,
    };
  });

  const latestAttempt = quizHistory.length > 0 ? quizHistory[0] : null;

  return (
    <div className="flex flex-col gap-8 py-2">
      {/* ============================================================
          1. Hero Banner: AZ-900 Sprint Readiness
          ============================================================ */}
      <section
        className="glass-card relative overflow-hidden p-6 sm:p-8"
        aria-labelledby="hero-heading"
      >
        {/* Glow ambient background effect */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-azure-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-xl flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-azure-500/30 bg-azure-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-azure-300">
                <span className="h-1.5 w-1.5 rounded-full bg-azure-400 animate-pulse" />
                AZ-900 Exam Sprint
              </span>
              <span className="text-xs text-slate-500">Passing Grade: 700 / 1000</span>
            </div>

            <h1
              id="hero-heading"
              className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              Sprint Readiness: <span className="gradient-text">{overallReadiness}%</span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              {overallReadiness === 0 &&
                'Welcome to your study sprint! Take your first quiz or review flashcards to calculate your diagnostic readiness score.'}
              {overallReadiness > 0 && overallReadiness < 50 &&
                'Good start! Solidify foundational cloud concepts and tackle daily tasks to elevate your exam confidence.'}
              {overallReadiness >= 50 && overallReadiness < 75 &&
                'Steady progress! Focus on high-weight architecture services and management tools to cross the 70% passing threshold.'}
              {overallReadiness >= 75 &&
                'Excellent! You are in the target exam-readiness zone. Review flagged cards and take timed mock tests.'}
            </p>

            {/* Quick metrics ticker */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="text-azure-400 font-bold">{quizStats.totalAttempts}</span>
                <span className="text-slate-400">quizzes taken</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">{flashcardStats.known}</span>
                <span className="text-slate-400">/ {flashcardStats.total} cards mastered</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-purple-400 font-bold">{plannerStats.completed}</span>
                <span className="text-slate-400">/ {plannerStats.total} tasks completed</span>
              </div>
            </div>
          </div>

          {/* Overall Circular Gauge */}
          <div className="flex items-center justify-center self-center lg:self-auto">
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="stroke-white/5"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * overallReadiness) / 100}
                  strokeLinecap="round"
                  className="text-azure-500 transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-white sm:text-4xl">
                  {overallReadiness}%
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Readiness
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. Quick Actions
          ============================================================ */}
      <section aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading" className="sr-only">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <FeatureCard
            to="/quiz"
            icon="📝"
            title="Start Quiz"
            description="Test your AZ-900 knowledge with timed domain quizzes or full simulated practice exams."
            color="from-azure-500 to-teal-400"
            stat={quizStats.totalAttempts > 0 ? `${quizStats.bestScore}%` : 'Diagnostic'}
            statLabel={quizStats.totalAttempts > 0 ? 'Best Score' : 'Ready to start'}
          />

          <FeatureCard
            to="/flashcards"
            icon="🃏"
            title="Review Flashcards"
            description="Active recall drills on high-yield Azure terms, SLA targets, and service categories."
            color="from-teal-400 to-azure-500"
            stat={`${flashcardStats.known} / ${flashcardStats.total}`}
            statLabel="Mastered terms"
          />

          <FeatureCard
            to="/planner"
            icon="📅"
            title="View Study Schedule"
            description="Track daily milestones, balance exam weightings, and ensure full syllabus coverage."
            color="from-purple-500 to-azure-500"
            stat={`${plannerStats.completed} / ${plannerStats.total}`}
            statLabel="Tasks completed"
          />
        </div>
      </section>

      {/* ============================================================
          3. Domain Breakdown (AZ-900 Exam Weighting)
          ============================================================ */}
      <section aria-labelledby="domains-heading" className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <div>
            <h2 id="domains-heading" className="text-xl font-bold text-white">
              AZ-900 Domain Breakdown
            </h2>
            <p className="text-xs text-slate-400">
              Exam domain weightings measured as per official Microsoft curriculum.
            </p>
          </div>
          <span className="text-xs font-medium text-azure-400">
            3 Core Domains · 11 Subtopics
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {domainProgress.map(({ topic, score, cardsCount, knownCards, questionsCount }) => {
            const domainColors: Record<TopicId, { text: string; bg: string; bar: string }> = {
              'cloud-concepts': {
                text: 'text-azure-400',
                bg: 'bg-azure-500/10 border-azure-500/20',
                bar: 'bg-azure-500',
              },
              'azure-architecture-services': {
                text: 'text-teal-400',
                bg: 'bg-teal-500/10 border-teal-500/20',
                bar: 'bg-teal-400',
              },
              'azure-management-governance': {
                text: 'text-purple-400',
                bg: 'bg-purple-500/10 border-purple-500/20',
                bar: 'bg-purple-500',
              },
            };

            const styling = domainColors[topic.id];

            return (
              <div
                key={topic.id}
                className="glass-card flex flex-col justify-between gap-4 p-5 transition-all hover:border-white/10"
              >
                <div className="flex flex-col gap-3">
                  {/* Header: Icon + Weight Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl" aria-hidden="true">
                      {topic.icon}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styling.bg} ${styling.text}`}
                    >
                      Weight: {topic.weight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {topic.name}
                  </h3>

                  {/* Subtopics snippet */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {topic.subtopics.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-slate-400"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {topic.subtopics.length > 3 && (
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-slate-500">
                        +{topic.subtopics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar and details */}
                <div className="flex flex-col gap-2 border-t border-white/5 pt-3">
                  <ProgressBar
                    value={score}
                    label="Domain Mastery"
                    color={styling.bar}
                    size="sm"
                    showPercent
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{cardsCount} Flashcards ({knownCards} known)</span>
                    <span>{questionsCount} Questions</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          4. Recent Activity & Up Next Feed
          ============================================================ */}
      <section
        aria-labelledby="activity-heading"
        className="grid grid-cols-1 gap-5 lg:grid-cols-2"
      >
        {/* Recent Quiz Performance */}
        <div className="glass-card flex flex-col justify-between p-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 id="activity-heading" className="text-base font-semibold text-white">
              Latest Quiz Attempt
            </h3>
            <Link
              to="/quiz"
              className="focus-ring text-xs font-medium text-azure-400 hover:text-azure-300 no-underline"
            >
              Take Quiz →
            </Link>
          </div>

          <div className="py-4">
            {latestAttempt ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-white">
                      {latestAttempt.score} / {latestAttempt.totalQuestions}
                    </span>
                    <span className="ml-2 text-xs text-slate-400">
                      ({Math.round((latestAttempt.score / latestAttempt.totalQuestions) * 100)}%)
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      (latestAttempt.score / latestAttempt.totalQuestions) >= 0.7
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {(latestAttempt.score / latestAttempt.totalQuestions) >= 0.7 ? 'PASSED (≥70%)' : 'NEEDS REVIEW'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Completed on {new Date(latestAttempt.completedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <span className="text-3xl text-slate-600 mb-2">📊</span>
                <p className="text-sm font-medium text-slate-300">No quizzes completed yet</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Start with a 5-question diagnostic to benchmark your initial score.
                </p>
                <Link
                  to="/quiz"
                  className="focus-ring mt-3 inline-flex items-center rounded-lg bg-azure-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-azure-500 no-underline"
                >
                  Start Diagnostic Quiz
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-white/5 pt-3 text-xs text-slate-500">
            {quizStats.totalAttempts > 0 ? (
              <span>Average score across {quizStats.totalAttempts} attempts: <strong className="text-slate-300">{quizStats.averageScore}%</strong></span>
            ) : (
              <span>Practice quizzes simulate real exam conditions and scoring.</span>
            )}
          </div>
        </div>

        {/* Up Next in Study Planner */}
        <div className="glass-card flex flex-col justify-between p-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-semibold text-white">Next Study Milestone</h3>
            <Link
              to="/planner"
              className="focus-ring text-xs font-medium text-azure-400 hover:text-azure-300 no-underline"
            >
              Open Planner →
            </Link>
          </div>

          <div className="py-4">
            {upcomingTask ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-white">{upcomingTask.title}</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-slate-400">
                    ⏱️ {upcomingTask.estimatedMinutes} min
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>📅 Due: {upcomingTask.dueDate}</span>
                  <span>•</span>
                  <span className="capitalize text-azure-400">
                    {upcomingTask.topicId.replace(/-/g, ' ')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <span className="text-3xl text-slate-600 mb-2">🎯</span>
                <p className="text-sm font-medium text-slate-300">All caught up or no tasks scheduled</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Plan your daily AZ-900 milestones to stay on pace for exam day.
                </p>
                <Link
                  to="/planner"
                  className="focus-ring mt-3 inline-flex items-center rounded-lg bg-azure-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-azure-500 no-underline"
                >
                  Create Study Task
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-white/5 pt-3 text-xs text-slate-500">
            {plannerStats.total > 0 ? (
              <span>{plannerStats.completed} of {plannerStats.total} sprint milestones finished ({Math.round((plannerStats.completed / plannerStats.total) * 100)}%)</span>
            ) : (
              <span>Break down your AZ-900 preparation into manageable daily sprints.</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
