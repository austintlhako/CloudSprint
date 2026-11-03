import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { createFriendInvite } from '../services/friendService';

export default function FriendsPage() {
  const { user } = useAuth();
  const [invite, setInvite] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const submitInvite = async (event: FormEvent) => {
    event.preventDefault();
    const recipient = invite.trim();
    if (!recipient) {
      setMessage('Enter an email or username first.');
      return;
    }
    if (recipient.length < 3) {
      setMessage('Enter a valid email or username.');
      return;
    }

    setIsSending(true);
    try {
      await createFriendInvite(user?.id ?? null, recipient);
      setInvite('');
      setMessage(`Invite saved for ${recipient}. Share this with them so they can join your study session.`);
    } catch (error) {
      console.error('Unable to create friend invite:', error);
      setMessage('The invite could not be saved. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return <div className="standalone-page">
    <div className="standalone-heading"><span className="community-kicker">STUDY WITH FRIENDS</span><h1>Make progress together.</h1><p>Invite a study partner and keep each other accountable.</p></div>
    <section className="glass-card standalone-card friends-card">
      <h2>Invite a friend</h2>
      <form onSubmit={submitInvite}>
        <label htmlFor="friend-invite">Email or username<input id="friend-invite" name="friendInvite" value={invite} onChange={(event) => setInvite(event.target.value)} placeholder="friend@example.com or username" autoComplete="email" /></label>
        <button className="community-button" type="submit" disabled={isSending}>{isSending ? 'Saving invite…' : 'Send invite'}</button>
      </form>
      {message && <p className="planner-message" role="status">{message}</p>}
      <div className="friends-actions"><a href="/quiz">Start a paired quiz</a><a href="/planner">Plan a shared session</a></div>
    </section>
  </div>;
}
