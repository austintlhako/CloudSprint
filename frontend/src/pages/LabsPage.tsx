import { useEffect, useState } from 'react';
import { topics } from '../data/topics';
import { practiceLabs, type PracticeLab } from '../data/labs';
import { useAuth } from '../context/AuthContext';
import { getCompletedLabs, setLabCompleted } from '../services/labService';

export default function LabsPage() {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeLab, setActiveLab] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    void getCompletedLabs(user?.id ?? null).then((ids) => {
      if (mounted) setCompleted(ids);
    });
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const toggleCompleted = (lab: PracticeLab) => {
    const isCompleted = completed.includes(lab.id);
    const next = isCompleted ? completed.filter((id) => id !== lab.id) : [...completed, lab.id];
    setCompleted(next);
    void setLabCompleted(user?.id ?? null, lab.id, !isCompleted);
  };

  return (
    <main className="standalone-page">
      <div className="standalone-heading">
        <span className="community-kicker">LABS</span>
        <h1>Practice labs</h1>
        <p>Work through guided AZ-900 scenarios and check your understanding without needing an Azure subscription.</p>
      </div>
      <section className="glass-card standalone-card labs-page-card" aria-labelledby="labs-heading">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="labs-heading">Guided simulations</h2>
            <p className="support-note">Complete {completed.length} of {practiceLabs.length} labs.</p>
          </div>
          <span className="streak-badge">{user ? 'Synced to account' : 'Saved on this device'}</span>
        </div>
        <div className="labs-page-list">
          {practiceLabs.map((lab) => {
            const isCompleted = completed.includes(lab.id);
            const isActive = activeLab === lab.id;
            return (
              <article className={`lab-row ${isCompleted ? 'completed' : ''}`} key={lab.id}>
                <div className="flex items-start gap-3">
                  <input
                    id={lab.id}
                    name="completedLab"
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleCompleted(lab)}
                  />
                  <div className="min-w-0 flex-1">
                    <label htmlFor={lab.id}><strong>{lab.title}</strong></label>
                    <small>{topics.find((topic) => topic.subtopics.some((subtopic) => subtopic.id === lab.subtopicId))?.name ?? 'AZ-900 practice'}</small>
                    <p>{lab.scenario}</p>
                    {isActive && (
                      <div className="lab-details">
                        <strong>Steps</strong>
                        <ol>{lab.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                        <p><strong>Expected result:</strong> {lab.expectedResult}</p>
                      </div>
                    )}
                  </div>
                  <button type="button" className="task-action" onClick={() => setActiveLab(isActive ? null : lab.id)}>
                    {isActive ? 'Hide lab' : 'Open lab'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
