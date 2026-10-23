import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import ProgressBar from '../components/ProgressBar';
import { topics } from '../data/topics';
import { createGeneratedQuestions } from '../data/generatedQuestions';
import { flashcards } from '../data/flashcards';
import { getQuizHistory, getQuizStats } from '../services/quizService';
import { getFlashcardStats, getCardProgress } from '../services/flashcardService';
import { getTasks, getPlannerStats } from '../services/plannerService';
import { awardLoginPoint, getFullName, getLearnerPoints, getLeaderboard } from '../services/pointsService';
import { useAuth } from '../context/AuthContext';
import { getAvailableReviews, getDailyFeaturedReviews } from '../services/reviewService';
import { useAppLanguage } from '../services/i18n';
import type { QuizAttempt, StudyTask, TopicId } from '../types';

const PLAN_KEY = 'cloudsprint_study_plan';
// Add team members here when their names, profile images, and social links are ready.
const TEAM_MEMBERS: Array<{ name: string; role: string; image: string; linkedin: string; github: string }> = [];

function getDefaultExamDate(): string {
  return new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const generatedQuestions = createGeneratedQuestions();
  const { user, isGuest } = useAuth();
  const [, translate] = useAppLanguage();
  // Load live data from the async planner service.
  const [quizHistory] = useState<QuizAttempt[]>(() => getQuizHistory());
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [examDate, setExamDate] = useState(() => {
    try {
      const saved = localStorage.getItem(PLAN_KEY);
      return saved ? JSON.parse(saved).examDate || getDefaultExamDate() : getDefaultExamDate();
    } catch {
      return getDefaultExamDate();
    }
  });
  const [points, setPoints] = useState(0);
  const [topReviews, setTopReviews] = useState<Awaited<ReturnType<typeof getAvailableReviews>>>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    getTasks().then((loadedTasks) => {
      if (!mounted) return;

      setTasks(loadedTasks);
    });

    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (!isGuest) awardLoginPoint();
    setPoints(getLearnerPoints());
  }, [isGuest, tasks, quizHistory]);
  useEffect(() => {
    void getAvailableReviews(20).then((reviews) => {
      setTopReviews(getDailyFeaturedReviews(reviews));
      setTestimonialIndex(0);
    });
  }, []);

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
    const unitIds = topic.subtopics.map((subtopic) => subtopic.id);
    // Flashcard mastery for topic
    const topicCards = flashcards.filter((fc) => unitIds.includes(fc.topicId));
    const knownInTopic = topicCards.filter((fc) => {
      const p = cardProgress.find((cp) => cp.cardId === fc.id);
      return p?.status === 'know';
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
      questionsCount: generatedQuestions.filter((q) => unitIds.includes(q.topicId)).length,
    };
  });

  const today = new Date().toISOString().slice(0, 10);
  const daysUntilExam = Math.max(0, Math.ceil((new Date(`${examDate}T00:00:00`).getTime() - new Date(`${today}T00:00:00`).getTime()) / 86400000));
  const updateExamDate = (nextExamDate: string) => {
    if (!nextExamDate) return;
    setExamDate(nextExamDate);
    try {
      const saved = localStorage.getItem(PLAN_KEY);
      const currentPlan = saved ? JSON.parse(saved) : {};
      localStorage.setItem(PLAN_KEY, JSON.stringify({ ...currentPlan, examDate: nextExamDate }));
    } catch {
      // The planner page provides the full persisted edit flow if storage is unavailable.
    }
  };
  const activityDates = new Set([
    ...quizHistory.map((attempt) => attempt.completedAt.slice(0, 10)),
    ...cardProgress.map((progress) => progress.lastReviewedAt.slice(0, 10)),
    ...tasks.filter((task) => task.completedAt).map((task) => task.completedAt!.slice(0, 10)),
  ]);
  const activeToday = activityDates.has(today);
  let streak = 0;
  const streakCursor = new Date(`${today}T12:00:00`);
  while (activityDates.has(streakCursor.toISOString().slice(0, 10))) {
    streak += 1;
    streakCursor.setDate(streakCursor.getDate() - 1);
  }
  const weekStart = new Date(`${today}T12:00:00`);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return { label: date.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2), key: date.toISOString().slice(0, 10) };
  });
  const leaderboard = getLeaderboard(getFullName(user?.displayName), points);

  if (isGuest) {
    const t = translate;
    const testimonial = topReviews[testimonialIndex];
    const recordedProfiles = Object.keys(localStorage)
      .filter((key) => key.startsWith('cloudsprint_learner_profile_') && !key.includes('_prompt_'))
      .map((key) => {
        try { return JSON.parse(localStorage.getItem(key) ?? '{}') as { country?: string; school?: string }; } catch { return {}; }
      });
    const recordedCountries = new Set(recordedProfiles.map((profile) => profile.country).filter(Boolean)).size;
    const recordedSchools = new Set(recordedProfiles.map((profile) => profile.school).filter(Boolean)).size;
    return (
      <div className="public-landing">
        <section className="public-hero" aria-labelledby="landing-heading">
          <h1 id="landing-heading">{t('Your AZ-900 journey, made clearer.')}</h1>
          <p>{t('Practise cloud concepts, learn from mistakes, and prepare with a study plan built around your progress.')}</p>
          <div className="public-hero-actions">
            <button type="button" className="community-button" onClick={() => window.dispatchEvent(new CustomEvent('cloudsprint:open-auth'))}>{t('Get Started')} <span aria-hidden="true">→</span></button>
            <a href="#landing-features" className="public-secondary-action">{t('Explore Features')}</a>
          </div>
        </section>
        <section id="landing-features" className="public-features" aria-labelledby="landing-features-heading">
          <h2 id="landing-features-heading">{t('Everything you need to prepare')}</h2>
          <div className="public-feature-grid">
            <article><h3>{t('Practice quizzes')}</h3><p>{t('Test your knowledge and understand your mistakes.')}</p></article>
            <article><h3>{t('Smart flashcards')}</h3><p>{t('Review important terms and difficult concepts.')}</p></article>
            <article><h3>{t('Personal progress')}</h3><p>{t('Track your readiness and organize your next study session.')}</p></article>
          </div>
        </section>
        <section className="public-story-grid" aria-labelledby="about-cloudsprint-heading">
          <article className="public-values-intro"><h2 id="about-cloudsprint-heading">A clearer path to your next milestone.</h2><p>CloudSprint brings calm structure to ambitious learning, helping you turn complex cloud ideas into practical confidence.</p></article>
        </section>
        <section className="public-values-section" aria-label="CloudSprint values">
          <article><h3>{t('Our vision')}</h3><p>{t('A world where every learner can approach cloud fundamentals with clarity, regardless of background or starting point.')}</p></article>
          <article><h3>{t('Our mission')}</h3><p>{t('To make high-quality, concept-first exam preparation accessible, measurable, and easy to fit into real life.')}</p></article>
          <article><h3>{t('Our promise')}</h3><p>{t('We will keep the experience honest, useful, and learner-centred—never presenting unofficial practice as a real Microsoft exam.')}</p></article>
        </section>
        <section className="public-callout" aria-labelledby="why-prepare-heading">
          <span className="community-kicker">{t('PREPARE WITH CLOUDSPRINT')}</span><h2 id="why-prepare-heading">{t('Turn uncertainty into a plan.')}</h2><p>{t('Build a steady rhythm with original questions, active recall, feedback, and visible progress—all in one place.')}</p>
          <div className="video-placeholder" aria-label="YouTube video placeholder"><span aria-hidden="true">▶</span><strong>Your preparation guide is coming soon</strong><small>Add a YouTube video URL here when it is ready.</small></div>
        </section>
        <section className="public-reviews" aria-labelledby="landing-reviews-heading">
          <h2 id="landing-reviews-heading">{t('Learner testimonials')}</h2>
          {testimonial ? <div className="testimonial-carousel"><article className="app-review-card"><div className="review-stars" aria-label={`${testimonial.rating} out of 5 stars`}>{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</div><p>{testimonial.text || 'No comment provided.'}</p><small>{testimonial.author}</small></article><div className="testimonial-controls"><button type="button" onClick={() => setTestimonialIndex((index) => Math.max(0, index - 1))} disabled={testimonialIndex === 0}>← Previous</button><span>{testimonialIndex + 1} / {topReviews.length}</span><button type="button" onClick={() => setTestimonialIndex((index) => Math.min(topReviews.length - 1, index + 1))} disabled={testimonialIndex === topReviews.length - 1}>Next →</button></div></div> : <p className="public-empty-state">{t('Learner testimonials will appear here as reviews are submitted.')}</p>}
        </section>
        <section className="public-trust" aria-labelledby="trusted-heading">
          <span className="community-kicker">{t('TRUSTED BY LEARNERS')}</span><h2 id="trusted-heading">{t('Our students come from the world’s most prestigious programs.')}</h2><p>{t('CloudSprint welcomes learners wherever they are building their next opportunity.')}</p><p className="public-empty-state">No school or university affiliations have been added yet.</p>
        </section>
        <section className="public-impact" aria-labelledby="impact-heading">
          <div><span className="community-kicker">{t('OUR IMPACT')}</span><h2 id="impact-heading">{t('Live recorded reach')}</h2><p>{t('These figures reflect records currently available in this CloudSprint environment, not estimates.')}</p></div>
          <div className="impact-grid"><article><strong>0</strong><span>{t('Participants recorded')}</span></article><article><strong>0</strong><span>{t('Countries recorded')}</span></article><article><strong>0</strong><span>{t('Schools and universities recorded')}</span></article></div>
        </section>
        <section className="public-partners" aria-labelledby="partners-heading">
          <h2 id="partners-heading">{t('Our partners')}</h2>
          <p>Helping early-career talent bridge the gap between training and employment.</p>
          <div className="partner-grid">
            <article className="partner-card"><img src="https://octoprep.ai/assets/partners/plp.png" alt="Power Learn Project logo" /><div><h3>Power Learn Project</h3><p>Empowering African learners with practical digital skills and pathways toward meaningful careers in technology.</p></div></article>
          </div>
          <a href="mailto:hello@cloudsprint.example" className="public-secondary-action">{t('Partner with CloudSprint')} →</a>
        </section>
        <section className="public-team" id="landing-team" aria-labelledby="team-heading">
          <span className="community-kicker">ABOUT US</span><h2 id="team-heading">About Us</h2>
          <p>CloudSprint exists to make the move from learning to opportunity feel less overwhelming. We give emerging technologists a clear place to practise, measure their growth, and build the confidence to take their next professional step. With purposeful study paths and encouragement along the way, we help turn small, consistent actions into career momentum.</p>
          {TEAM_MEMBERS.length > 0 && <div className="team-grid">{TEAM_MEMBERS.map((member) => <article className="team-card" key={member.name}><img src={member.image} alt={`${member.name} profile`} /><h3>{member.name}</h3><p>{member.role}</p><div className="team-socials"><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><span aria-hidden="true">in</span></a><a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`}><span aria-hidden="true">GH</span></a></div></article>)}</div>}
        </section>
        <section className="public-faq" aria-labelledby="faq-heading"><h2 id="faq-heading">{t('Frequently asked questions')}</h2>{[['Is CloudSprint affiliated with Microsoft?', 'No. CloudSprint is an unofficial AZ-900 learning companion with original study content.'], ['Can I start before creating an account?', 'Yes. Explore the public Home page first; protected study features require sign-in.'], ['How do the impact figures work?', 'They count records currently available to this app environment and never use guessed totals.'], ['Can my school or programme partner with CloudSprint?', 'Yes. Use the partner link to start a conversation.']].map(([question, answer]) => <details key={question}><summary>{t(question)}<span aria-hidden="true">+</span></summary><p>{t(answer)}</p></details>)}</section>
      </div>
    );
  }

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
              <span className="text-xs text-slate-500">Passing Grade: 800 / 1000</span>
            </div>
            <h1
              id="hero-heading"
              className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              Sprint Readiness: <span className="gradient-text">{overallReadiness}%</span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              Your AZ-900 journey, made clearer. Practise cloud concepts, learn from mistakes, and prepare with a study plan built around your progress.
            </p>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              {overallReadiness === 0 &&
                'Welcome to your study sprint! Take your first quiz or review flashcards to calculate your diagnostic readiness score.'}
              {overallReadiness > 0 && overallReadiness < 50 &&
                'Good start! Solidify foundational cloud concepts and tackle daily tasks to elevate your exam confidence.'}
              {overallReadiness >= 50 && overallReadiness < 75 &&
                'Steady progress! Focus on high-weight architecture services and management tools to cross the 80% passing threshold.'}
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

      <section className="dashboard-overview-grid" aria-label="Dashboard overview">
        <article className="dashboard-tool-card leaderboard-card">
          <div className="tool-card-heading"><span className="tool-icon">🏆</span><span><strong>{translate('Leaderboard')}</strong><small>{translate('Top 10 learners')}</small></span></div>
          <ol className="leaderboard-list">{leaderboard.slice(0, 10).map((entry, index) => <li key={`${entry.name}-${index}`}><span><b>{index + 1}</b>{entry.name}</span><strong>{entry.points.toLocaleString()}</strong></li>)}</ol>
          {leaderboard.length === 0 && <p className="tool-note">Complete your profile with your full name to join the leaderboard.</p>}
        </article>
        <div className="dashboard-overview-metrics">
          <div className="dashboard-overview-row">
            <article id="daily-streak" className="dashboard-tool-card streak-card">
          <div className="tool-card-heading"><span className="tool-icon">🔥</span><span><strong>{translate('Daily streak')}</strong><small>Keep your momentum alive</small></span></div>
          <div className="streak-number">{streak} <small>days</small></div>
          <div className="streak-week" aria-label="Weekly activity">
            {weekDays.map((day) => <span key={day.key}><i className={`${day.key === today ? 'today' : ''} ${activityDates.has(day.key) ? 'active' : ''}`} />{day.label}</span>)}
          </div>
          <p className="tool-note">{activeToday ? `Great work today (${new Date(`${today}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long' })}) — keep it up!` : `No activity recorded for today (${new Date(`${today}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long' })}) yet.`}</p>
            </article>
            <article className="dashboard-tool-card points-card">
              <div className="tool-card-heading"><span className="tool-icon">✦</span><span><strong>{translate('Your points')}</strong><small>Earned from learning activities</small></span></div>
              <div className="streak-number">{points.toLocaleString()} <small>points</small></div>
              <p className="tool-note">Quizzes, flashcards, labs, and planner tasks count.</p>
            </article>
          </div>
          <article className="dashboard-tool-card countdown-card">
          <div className="tool-card-heading"><span className="tool-icon">⏱</span><span><strong>{translate('Exam countdown')}</strong><small>Set or update your target date</small></span></div>
          <div className="countdown-number">{daysUntilExam} <small>days</small></div>
          <div className="countdown-track"><span style={{ width: `${Math.min(100, Math.max(8, 100 - daysUntilExam / 3))}%` }} /></div>
          <label className="dashboard-date-control">Exam date
            <input id="dashboard-exam-date" name="dashboardExamDate" type="date" min={today} value={examDate} onChange={(event) => updateExamDate(event.target.value)} />
          </label>
          <p className="tool-note">Your study plan is on track. Aim for two focused sessions this week.</p>
          </article>
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

    </div>
  );
}
