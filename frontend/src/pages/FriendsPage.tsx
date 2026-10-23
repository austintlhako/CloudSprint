import { useState } from 'react';

export default function FriendsPage() {
  const [invite, setInvite] = useState('');
  const [message, setMessage] = useState('');
  return <div className="standalone-page">
    <div className="standalone-heading"><span className="community-kicker">STUDY WITH FRIENDS</span><h1>Make progress together.</h1><p>Invite a study partner and keep each other accountable.</p></div>
    <section className="glass-card standalone-card friends-card">
      <h2>Invite a friend</h2>
      <label htmlFor="friend-invite">Email or username<input id="friend-invite" name="friendInvite" value={invite} onChange={(e) => setInvite(e.target.value)} placeholder="friend@example.com" /></label>
      <button className="community-button" type="button" onClick={() => { setMessage(invite ? `Invite ready for ${invite}.` : 'Enter an email or username first.'); }}>Send invite</button>
      {message && <p className="planner-message" role="status">{message}</p>}
      <div className="friends-actions"><a href="/quiz">Start a paired quiz</a><a href="/planner">Plan a shared session</a></div>
    </section>
  </div>;
}
