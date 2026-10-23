import { useState } from 'react';
import { createGeneratedQuestions } from '../data/generatedQuestions';

const labsKey = 'cloudsprint_labs';

export default function LabsPage() {
  const questions = createGeneratedQuestions().slice(0, 3).map((question) => ({ id: `lab-${question.id}`, question }));
  const [completed, setCompleted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(labsKey) ?? '[]') as string[]; } catch { return []; }
  });
  const toggle = (id: string) => {
    const next = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
    setCompleted(next);
    localStorage.setItem(labsKey, JSON.stringify(next));
  };
  return <div className="standalone-page">
    <div className="standalone-heading"><span className="community-kicker">LABS</span><h1>Practice labs</h1><p>Complete focused AZ-900 practice activities and reinforce the same concepts used in your study plan.</p></div>
    <section className="glass-card standalone-card labs-page-card" aria-labelledby="labs-heading">
      <h2 id="labs-heading">Labs to complete</h2>
      <div className="labs-page-list">{questions.map(({ id, question }) => <label className={`lab-row lab-question ${completed.includes(id) ? 'completed' : ''}`} key={id}><input id={id} name="completedLab" type="checkbox" checked={completed.includes(id)} onChange={() => toggle(id)} /><span><strong>Lab question:</strong> {question.question}</span><b>Practice</b></label>)}</div>
      <p className="support-note">{completed.length} of {questions.length} labs completed.</p>
    </section>
  </div>;
}
