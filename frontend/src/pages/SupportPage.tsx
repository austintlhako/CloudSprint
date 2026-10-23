import { useEffect, useState, type FormEvent } from 'react';
import { getCountryOptions } from '../data/countries';
import { useAuth } from '../context/AuthContext';

const issueKey = 'cloudsprint_support_issues';
const accessibilityKey = 'cloudsprint_accessibility';

const phoneCodes: Record<string, string> = {
  US: '+1', CA: '+1', GB: '+44', IN: '+91', AU: '+61', ZA: '+27', NG: '+234',
  KE: '+254', GH: '+233', DE: '+49', FR: '+33', ES: '+34', IT: '+39', BR: '+55',
  MX: '+52', JP: '+81', CN: '+86', KR: '+82', SG: '+65', AE: '+971', SA: '+966',
};

function flag(code: string) {
  return code.replace(/[A-Z]/g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
}

export default function SupportPage() {
  const { user, isGuest } = useAuth();
  const countries = getCountryOptions();
  const [name, setName] = useState(user?.displayName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phoneCountry, setPhoneCountry] = useState('US');
  const [phone, setPhone] = useState('');
  const [kind, setKind] = useState('Something is not working');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [sent, setSent] = useState(false);
  const [accessibility, setAccessibility] = useState(() => {
    try { return JSON.parse(localStorage.getItem(accessibilityKey) ?? '{"largeText":false,"highContrast":false,"reducedMotion":false}'); } catch { return { largeText: false, highContrast: false, reducedMotion: false }; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('accessibility-large-text', accessibility.largeText);
    document.documentElement.classList.toggle('accessibility-high-contrast', accessibility.highContrast);
    document.documentElement.classList.toggle('accessibility-reduced-motion', accessibility.reducedMotion);
  }, [accessibility]);

  const updateAccessibility = (key: keyof typeof accessibility) => {
    const next = { ...accessibility, [key]: !accessibility[key] };
    setAccessibility(next);
    localStorage.setItem(accessibilityKey, JSON.stringify(next));
    document.documentElement.classList.toggle('accessibility-large-text', next.largeText);
    document.documentElement.classList.toggle('accessibility-high-contrast', next.highContrast);
    document.documentElement.classList.toggle('accessibility-reduced-motion', next.reducedMotion);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const issue = { id: crypto.randomUUID(), name, email, phone: `${phoneCodes[phoneCountry] ?? '+'} ${phone}`, country: phoneCountry, kind, subject, description, createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem(issueKey) ?? '[]');
    localStorage.setItem(issueKey, JSON.stringify([issue, ...existing]));
    setSent(true);
    setSubject('');
    setDescription('');
  };

  return <div className="standalone-page support-page">
    <div className="standalone-heading"><span className="community-kicker">HELP & SUPPORT</span><h1>How can we help?</h1><p>Tell us what is getting in your way. You can contact us as a guest or while signed in.</p></div>
    <div className="standalone-grid">
      <form className="glass-card standalone-card support-form" onSubmit={submit}>
        <h2>Raise an issue</h2>
        {isGuest && <p className="support-note">You are using guest mode. Add an email if you would like a reply.</p>}
        {sent && <p className="support-success" role="status">Thanks — your issue has been recorded for the CloudSprint team.</p>}
        <label htmlFor="support-name">Name<input id="support-name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label htmlFor="support-email">Email<input id="support-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label htmlFor="support-phone-country">Phone number<div className="phone-field"><select id="support-phone-country" name="phoneCountry" value={phoneCountry} onChange={(event) => setPhoneCountry(event.target.value)} aria-label="Phone country code">{countries.map((country) => <option key={country.code} value={country.code}>{flag(country.code)} {country.name} ({phoneCodes[country.code] ?? '+…'})</option>)}</select><input id="support-phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number" /></div></label>
        <label htmlFor="support-kind">What kind of issue are you facing?<select id="support-kind" name="issueKind" value={kind} onChange={(event) => setKind(event.target.value)}><option>Something is not working</option><option>Account or sign-in problem</option><option>Quiz or flashcard content</option><option>Planner or progress problem</option><option>Accessibility issue</option><option>Suggestion or feedback</option><option>Something else</option></select></label>
        <label htmlFor="support-subject">Subject<input id="support-subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} required /></label>
        <label htmlFor="support-description">Description<textarea id="support-description" name="description" rows={6} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What happened, and what did you expect to happen?" required /></label>
        <div className="support-actions"><button type="reset" onClick={() => { setSubject(''); setDescription(''); }}>Cancel</button><button className="community-button" type="submit">Raise issue</button></div>
      </form>
      <aside className="glass-card standalone-card accessibility-card">
        <h2>Accessibility</h2>
        <p className="support-note">Choose options that make CloudSprint easier to use. These preferences stay on this device.</p>
        <label className="accessibility-toggle"><input id="accessibility-large-text" name="largeText" type="checkbox" checked={accessibility.largeText} onChange={() => updateAccessibility('largeText')} /><span><strong>Larger text</strong><small>Increase readable text size</small></span></label>
        <label className="accessibility-toggle"><input id="accessibility-high-contrast" name="highContrast" type="checkbox" checked={accessibility.highContrast} onChange={() => updateAccessibility('highContrast')} /><span><strong>High contrast</strong><small>Strengthen text and control contrast</small></span></label>
        <label className="accessibility-toggle"><input id="accessibility-reduced-motion" name="reducedMotion" type="checkbox" checked={accessibility.reducedMotion} onChange={() => updateAccessibility('reducedMotion')} /><span><strong>Reduce motion</strong><small>Minimise animations and transitions</small></span></label>
        <h2 className="support-faq-heading">Friendly answers</h2>
        <details><summary>Where should I start?</summary><p>Try a five-question practice quiz, then review the flashcards for anything you missed.</p></details>
        <details><summary>Can I use CloudSprint as a guest?</summary><p>Yes. Guest progress is saved on this device. Sign in when you want account-based sync.</p></details>
        <details><summary>Are these real exam questions?</summary><p>No. CloudSprint uses original study questions based on the public AZ-900 skills outline.</p></details>
      </aside>
    </div>
  </div>;
}
