import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { DOMAINS, getTopicsByDomain } from '../data/topics';
import { createTask, deleteTask, getTasks, updateTask } from '../services/plannerService';
import { getMistakeReviewItems, getQuizStats } from '../services/quizService';
import type { Domain, StudyTask, SubtopicId } from '../types';

const today = new Date().toISOString().slice(0, 10);
const PLAN_KEY = 'cloudsprint_study_plan';
const BOOKMARK_KEY = 'cloudsprint_planner_bookmarks';

interface PlanSettings {
  examDate: string;
  minutesPerDay: number;
  weakDomains: Domain[];
}

const defaultPlan: PlanSettings = {
  examDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  minutesPerDay: 60,
  weakDomains: [],
};

function readPlan(): PlanSettings {
  try {
    return { ...defaultPlan, ...JSON.parse(localStorage.getItem(PLAN_KEY) ?? '{}') };
  } catch {
    return defaultPlan;
  }
}

function dateLabel(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function daysBetween(start: string, end: string) {
  return Math.max(0, Math.ceil((new Date(`${end}T12:00:00`).getTime() - new Date(`${start}T12:00:00`).getTime()) / 86400000));
}

export default function PlannerPage() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [plan, setPlan] = useState<PlanSettings>(readPlan);
  const [title, setTitle] = useState('');
  const [subtopic, setSubtopic] = useState<SubtopicId>('cc-cloud-computing');
  const [dueDate, setDueDate] = useState(today);
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [dueTime, setDueTime] = useState('18:00');
  const [month, setMonth] = useState(() => new Date(`${today}T12:00:00`));
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) ?? '[]') as string[]; } catch { return []; }
  });
  const [message, setMessage] = useState('');
  const quizStats = getQuizStats();
  const mistakes = getMistakeReviewItems();

  const loadTasks = () => getTasks().then(setTasks);
  useEffect(() => { loadTasks(); }, []);

  const daysRemaining = daysBetween(today, plan.examDate);
  const completed = tasks.filter((task) => task.isCompleted).length;
  const totalMinutes = tasks.reduce((sum, task) => sum + task.estimatedMinutes, 0);
  const completedMinutes = tasks.filter((task) => task.isCompleted).reduce((sum, task) => sum + task.estimatedMinutes, 0);
  const nextMilestone = tasks.filter((task) => !task.isCompleted).sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0] ?? null;
  const streak = useMemo(() => {
    const dates = new Set(tasks.filter((task) => task.isCompleted).map((task) => task.completedAt?.slice(0, 10)));
    let count = 0;
    const cursor = new Date(`${today}T12:00:00`);
    while (dates.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }, [tasks]);

  const domainProgress = DOMAINS.map((domain) => {
    const ids = getTopicsByDomain(domain.id).map((unit) => unit.id);
    const domainTasks = tasks.filter((task) => ids.includes(task.subtopic));
    const done = domainTasks.filter((task) => task.isCompleted).length;
    return { domain, done, total: domainTasks.length, percentage: domainTasks.length ? Math.round((done / domainTasks.length) * 100) : 0 };
  });

  const calendarDays = useMemo(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const count = new Date(year, monthIndex + 1, 0).getDate();
    return [...Array(firstDay).fill(null), ...Array.from({ length: count }, (_, index) => `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`)];
  }, [month]);

  const persistPlan = (next: PlanSettings) => {
    setPlan(next);
    localStorage.setItem(PLAN_KEY, JSON.stringify(next));
  };

  const toggleWeakDomain = (domain: Domain) => {
    persistPlan({ ...plan, weakDomains: plan.weakDomains.includes(domain) ? plan.weakDomains.filter((item) => item !== domain) : [...plan.weakDomains, domain] });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const domain = DOMAINS.find((item) => getTopicsByDomain(item.id).some((unit) => unit.id === subtopic))?.id ?? 'cloud-concepts';
    await createTask({ userId: null, title: title.trim() || 'Study session', domain, subtopic, dueDate, dueTime, estimatedMinutes, isCompleted: false, completedAt: null });
    setTitle('');
    await loadTasks();
  };

  const generatePlan = async () => {
    if (plan.examDate <= today) {
      setMessage('Choose an exam date in the future before generating a plan.');
      return;
    }
    const units = DOMAINS.flatMap((domain) => getTopicsByDomain(domain.id).map((unit) => ({ unit, domain: domain.id })));
    const totalDays = Math.min(daysRemaining, 365);
    const selected = plan.weakDomains.length ? units.filter(({ domain }) => plan.weakDomains.includes(domain)) : units;
    if (!selected.length || plan.minutesPerDay < 5) {
      setMessage('Choose at least one weak domain and 5 or more minutes per day.');
      return;
    }
    const generated: Promise<StudyTask>[] = [];
    for (let day = 0; day < totalDays; day += 1) {
      const date = new Date(`${today}T12:00:00`);
      date.setDate(date.getDate() + day);
      const unit = selected[day % selected.length];
      generated.push(createTask({
        userId: null,
        title: `Study ${unit.unit.name}`,
        domain: unit.domain,
        subtopic: unit.unit.id,
        dueDate: date.toISOString().slice(0, 10),
        estimatedMinutes: plan.minutesPerDay,
        dueTime: '18:00',
        isCompleted: false,
        completedAt: null,
      }));
    }
    await Promise.all(generated);
    setMessage(`${totalDays} sessions generated through ${dateLabel(plan.examDate)}.`);
    await loadTasks();
  };

  const toggleTask = async (task: StudyTask) => {
    await updateTask(task.id, { isCompleted: !task.isCompleted });
    await loadTasks();
  };

  const reschedule = async (task: StudyTask) => {
    const next = new Date(`${task.dueDate}T12:00:00`);
    next.setDate(next.getDate() + 1);
    await updateTask(task.id, { dueDate: next.toISOString().slice(0, 10) });
    await loadTasks();
  };

  const toggleBookmark = (id: string) => {
    const next = bookmarks.includes(id) ? bookmarks.filter((item) => item !== id) : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
  };

  const addMistakeToPlan = async (questionId: string) => {
    const item = mistakes.find((entry) => entry.question.id === questionId);
    if (!item) return;
    const domain = DOMAINS.find((candidate) => getTopicsByDomain(candidate.id).some((unit) => unit.id === item.question.topicId))?.id ?? 'cloud-concepts';
    await createTask({
      userId: null,
      title: `Review mistake: ${item.question.question.slice(0, 48)}…`,
      domain,
      subtopic: item.question.topicId,
      dueDate: today,
      dueTime: '18:00',
      estimatedMinutes: 20,
      isCompleted: false,
      completedAt: null,
    });
    await loadTasks();
  };

  return (
    <main className="planner-page flex flex-col gap-6 py-4">
      <section className="glass-card planner-hero p-6">
        <div>
          <p className="planner-kicker">YOUR STUDY PLAN</p>
          <h1 className="text-2xl font-bold text-white">Plan your year, one focused day at a time.</h1>
          <p className="mt-2 text-sm text-slate-400">A realistic schedule based on your available time and weak domains.</p>
        </div>
        <div className="countdown-box"><span>Exam countdown</span><strong>{daysRemaining}</strong><small>days remaining · {dateLabel(plan.examDate)}</small></div>
      </section>

      <section className="planner-grid">
        <form className="glass-card flex flex-col gap-4 p-6" onSubmit={(event) => { event.preventDefault(); persistPlan(plan); setMessage('Plan settings saved.'); }}>
          <div><h2 className="text-lg font-semibold text-white">Plan setup</h2><p className="text-xs text-slate-400">Change these settings anytime.</p></div>
          <label className="planner-label" htmlFor="planner-exam-date">Exam date<input id="planner-exam-date" name="examDate" className="planner-input" type="date" min={today} value={plan.examDate} onChange={(event) => persistPlan({ ...plan, examDate: event.target.value })} /></label>
          <label className="planner-label" htmlFor="planner-minutes-per-day">Available minutes per day<input id="planner-minutes-per-day" name="minutesPerDay" className="planner-input" type="number" min="5" max="720" step="5" value={plan.minutesPerDay} onChange={(event) => persistPlan({ ...plan, minutesPerDay: Number(event.target.value) })} /></label>
          <fieldset><legend className="planner-label">Weak domains to prioritise</legend>{DOMAINS.map((domain) => <label className="planner-check" key={domain.id}><input id={`weak-domain-${domain.id}`} name="weakDomains" type="checkbox" checked={plan.weakDomains.includes(domain.id)} onChange={() => toggleWeakDomain(domain.id)} />{domain.name}</label>)}</fieldset>
          <button className="planner-primary" type="button" onClick={generatePlan}>Generate daily schedule</button>
          {message && <p className="planner-message" role="status">{message}</p>}
        </form>

        <section className="glass-card p-6">
          <div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-white">Progress overview</h2><p className="text-xs text-slate-400">Yearly and topical progress</p></div><span className="streak-badge">🔥 {streak} day streak</span></div>
          <div className="progress-summary"><strong>{completedMinutes}m</strong><span>of {totalMinutes}m planned complete</span><div className="progress-track"><i style={{ width: `${totalMinutes ? (completedMinutes / totalMinutes) * 100 : 0}%` }} /></div></div>
          <div className="topic-progress-list">{domainProgress.map(({ domain, done, total, percentage }) => <div key={domain.id}><div className="flex justify-between text-xs"><span className="text-slate-300">{domain.name}</span><span className="text-slate-500">{done}/{total} · {percentage}%</span></div><div className="progress-track"><i style={{ width: `${percentage}%` }} /></div></div>)}</div>
        </section>

        <section className="glass-card p-6 planner-milestone-card" aria-labelledby="next-milestone-heading">
          <div className="flex items-center justify-between gap-4"><div><h2 id="next-milestone-heading" className="text-lg font-semibold text-white">Next study milestone</h2><p className="text-xs text-slate-400">Your next planned step toward exam day.</p></div>{nextMilestone && <span className="streak-badge">⏱️ {nextMilestone.estimatedMinutes} min</span>}</div>
          {nextMilestone ? <p className="mt-4 text-sm text-slate-300"><strong>{nextMilestone.title}</strong> · due {dateLabel(nextMilestone.dueDate)}</p> : <p className="mt-4 text-sm text-slate-400">No milestone scheduled yet. Generate a plan or add a study session below.</p>}
        </section>
      </section>

      <section className="glass-card p-6">
        <div className="calendar-heading"><div><h2 className="text-lg font-semibold text-white">Full calendar</h2><p className="text-xs text-slate-400">Select a day to see scheduled sessions.</p></div><div className="calendar-nav"><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>←</button><strong>{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</strong><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>→</button></div></div>
        <div className="calendar-grid calendar-weekdays">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="calendar-grid">{calendarDays.map((date, index) => <div className={`calendar-day ${date === today ? 'today' : ''}`} key={date ?? `blank-${index}`}>{date && <><b>{Number(date.slice(-2))}</b>{tasks.filter((task) => task.dueDate === date).slice(0, 2).map((task) => <span className={task.isCompleted ? 'done' : ''} key={task.id}>{task.dueTime ? `${task.dueTime} ` : ''}{task.title}</span>)}</>}</div>)}</div>
      </section>

      <section className="glass-card p-6">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-white">Session checklist</h2><p className="text-xs text-slate-400">{completed} of {tasks.length} complete · {bookmarks.length} bookmarked</p></div><span className="text-xs text-slate-500">{dateLabel(today)}</span></div>
        <div className="mt-4 flex flex-col gap-3">{tasks.length === 0 ? <p className="text-sm text-slate-400">Generate a plan or add a session below.</p> : tasks.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((task) => <div className="planner-task" key={task.id}><input id={`task-complete-${task.id}`} name="completedTask" type="checkbox" checked={task.isCompleted} onChange={() => void toggleTask(task)} /><div className="min-w-0 flex-1"><strong className={task.isCompleted ? 'completed' : ''}>{task.title}</strong><small>{dateLabel(task.dueDate)}{task.dueTime ? ` at ${task.dueTime}` : ''} · {task.estimatedMinutes} minutes</small></div><button type="button" className="task-icon" onClick={() => toggleBookmark(task.id)} aria-label="Bookmark session">{bookmarks.includes(task.id) ? '★' : '☆'}</button>{!task.isCompleted && <button type="button" className="task-action" onClick={() => void reschedule(task)}>Reschedule</button>}<button type="button" className="task-delete" onClick={() => void deleteTask(task.id).then(loadTasks)}>Delete</button></div>)}</div>
      </section>

      <section className="planner-quick-actions">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-white">AI study assistant</h2><p className="text-xs text-slate-400">Quick actions based on local progress</p></div><span className="assistant-spark">✦</span></div>
          <div className="quick-action-buttons"><button type="button" onClick={() => { setDueDate(today); document.getElementById('custom-session-form')?.scrollIntoView({ behavior: 'smooth' }); }}>+ Add task for today</button><button type="button" onClick={() => { setDueDate(plan.examDate); document.getElementById('custom-session-form')?.scrollIntoView({ behavior: 'smooth' }); }}>Plan exam-day review</button><button type="button" onClick={() => window.location.assign('/quiz')}>Start targeted quiz</button></div>
          <p className="assistant-note">{quizStats.totalAttempts ? `You have ${quizStats.totalAttempts} quiz attempt${quizStats.totalAttempts === 1 ? '' : 's'} with a ${quizStats.averageScore}% average. Keep it up!` : 'Complete a quiz and I will suggest review sessions from your actual mistakes.'}</p>
        </div>
        <div className="glass-card p-6"><h2 className="text-lg font-semibold text-white">Progress summary</h2><div className="summary-stat-grid"><div><strong>{quizStats.totalAttempts}</strong><span>quiz attempts</span></div><div><strong>{quizStats.averageScore}%</strong><span>average accuracy</span></div><div><strong>{domainProgress.filter((item) => item.percentage < 80).length}</strong><span>topics to strengthen</span></div></div><p className="assistant-note">{quizStats.totalAttempts ? 'Recommendation: review missed questions, then retry a targeted quiz.' : 'Recommendation: start with a short diagnostic quiz.'}</p></div>
      </section>

      <section className="glass-card p-6">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-white">Mistake review</h2><p className="text-xs text-slate-400">Review incorrect answers and add them to your plan.</p></div><span className="streak-badge">{mistakes.length} to review</span></div>
        {mistakes.length === 0 ? <p className="mt-4 text-sm text-slate-400">No mistakes recorded yet. Complete a quiz to build your review list.</p> : <div className="mistake-list">{mistakes.slice(0, 8).map(({ question, selectedAnswer }) => <div className="mistake-item" key={question.id}><div><strong>{question.question}</strong><small>{selectedAnswer === null ? 'Unanswered' : `Selected: ${question.options[selectedAnswer]}`}</small></div><button type="button" onClick={() => void addMistakeToPlan(question.id)}>Add to plan</button></div>)}</div>}
      </section>

      <form id="custom-session-form" className="glass-card grid gap-4 p-6 md:grid-cols-2" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-white md:col-span-2">Add a custom session</h2>
        <input id="custom-session-title" name="sessionTitle" className="planner-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Session title" aria-label="Session title" />
        <select id="custom-session-topic" name="sessionTopic" className="planner-input" value={subtopic} onChange={(event) => setSubtopic(event.target.value as SubtopicId)} aria-label="Study unit">{DOMAINS.flatMap((domain) => getTopicsByDomain(domain.id)).map((unit) => <option key={unit.id} value={unit.id}>{unit.name}</option>)}</select>
        <input id="custom-session-date" name="sessionDate" className="planner-input" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} aria-label="Session date" />
        <input id="custom-session-time" name="sessionTime" className="planner-input" type="time" value={dueTime} onChange={(event) => setDueTime(event.target.value)} aria-label="Session time" />
        <input id="custom-session-minutes" name="sessionMinutes" className="planner-input" type="number" min="5" step="5" value={estimatedMinutes} onChange={(event) => setEstimatedMinutes(Number(event.target.value))} aria-label="Session minutes" />
        <button className="planner-primary md:col-span-2" type="submit">Add study session</button>
      </form>
    </main>
  );
}
