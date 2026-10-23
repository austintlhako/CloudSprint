import { useState, type FormEvent } from 'react';
import { saveDeveloperReview } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';

const starterTestimonials = [
  { author: 'dev-1', text: 'CloudSprint was shaped around the moments when studying feels unclear. We wanted every session to give learners a practical next step.' },
  { author: 'dev-1', text: 'Building CloudSprint has shown us how much confidence grows when learners can practise, understand mistakes, and see steady progress in one place.' },
  { author: 'dev-1', text: 'Our goal is to make AZ-900 preparation feel focused and human, with useful guidance that helps learners move from uncertainty to action.' },
  { author: 'dev-2', text: 'We designed CloudSprint to turn cloud concepts into a routine learners can return to with confidence, clarity, and momentum.' },
  { author: 'dev-2', text: 'Every feature is meant to make preparation feel more useful: practise deliberately, learn from mistakes, and know what to work on next.' },
  { author: 'dev-2', text: 'The best part of building CloudSprint is creating a calmer path for learners who are ready to take their first step into cloud.' },
  { author: 'dev-3', text: 'CloudSprint brings structure to exam preparation without losing the encouragement that keeps learners moving forward.' },
  { author: 'dev-3', text: 'We are proud to build an experience where progress is visible, practice is purposeful, and every learner can begin from where they are.' },
  { author: 'dev-3', text: 'Our team built CloudSprint to help learners replace guesswork with a clear, repeatable study rhythm.' },
];

export default function DeveloperTestimonialsPage() {
  const { user } = useAuth();
  const [author, setAuthor] = useState('dev-1');
  const [text, setText] = useState(starterTestimonials[0].text);
  const [status, setStatus] = useState('');
  const developerNames = new Set(['dev-1', 'dev-2', 'dev-3']);
  const hasDeveloperAccess = developerNames.has(user?.displayName?.trim().toLowerCase() ?? '');

  if (!hasDeveloperAccess) {
    return <div className="login-required glass-card"><span className="community-kicker">DEVELOPER STUDIO</span><h1>Developer access only</h1><p>This local-only workspace is reserved for the CloudSprint development team. Use a developer profile name to continue.</p></div>;
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;
    saveDeveloperReview({ rating: 5, text: text.trim(), author: author.trim() || 'CloudSprint developer' });
    setStatus('Testimonial posted to the local testimonial collection.');
    setText('');
  };

  return <div className="standalone-page">
    <div className="standalone-heading">
      <span className="community-kicker">DEVELOPER STUDIO</span>
      <h1>Post a team testimonial.</h1>
      <p>Local-only workspace for the CloudSprint development team. These posts are stored in this browser and can be reviewed on the public Home page.</p>
    </div>
    <section className="glass-card standalone-card review-page-card">
      <form onSubmit={submit}>
        <label htmlFor="developer-testimonial-author">Developer name<input id="developer-testimonial-author" value={author} onChange={(event) => setAuthor(event.target.value)} required /></label>
        <label htmlFor="developer-testimonial-text">Testimonial<textarea id="developer-testimonial-text" value={text} onChange={(event) => setText(event.target.value)} rows={6} required /></label>
        <button className="community-button" type="submit">Post testimonial</button>
        {status && <p className="support-note" role="status">{status}</p>}
      </form>
      <div className="developer-testimonial-drafts">
        <h2>Starter drafts</h2>
        {starterTestimonials.map((draft, index) => <button type="button" key={`${draft.author}-${index}`} onClick={() => { setAuthor(draft.author); setText(draft.text); }}>Use {draft.author} draft {index + 1}</button>)}
      </div>
    </section>
  </div>;
}
