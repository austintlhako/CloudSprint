import { FormEvent, useState } from 'react';

interface Post { id: string; name: string; text: string; createdAt: string; }
const key = 'cloudsprint_community_posts';
interface Reply { id: string; name: string; text: string; }

export default function CommunityPage() {
  const [name, setName] = useState(() => localStorage.getItem('cloudsprint_community_name') ?? '');
  const [text, setText] = useState('');
  const [joined, setJoined] = useState(() => localStorage.getItem('cloudsprint_community_joined') === 'true');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [posts, setPosts] = useState<Post[]>(() => {
    try { return JSON.parse(localStorage.getItem(key) ?? '[]') as Post[]; } catch { return []; }
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const next = [{ id: crypto.randomUUID(), name: name.trim(), text: text.trim(), createdAt: new Date().toISOString() }, ...posts];
    setPosts(next); setText('');
    localStorage.setItem('cloudsprint_community_name', name.trim());
    localStorage.setItem(key, JSON.stringify(next));
  };
  const submitReply = (event: FormEvent, post: Post) => {
    event.preventDefault();
    if (!replyText.trim()) return;
    const replies = JSON.parse(localStorage.getItem('cloudsprint_community_replies') ?? '{}') as Record<string, Reply[]>;
    replies[post.id] = [...(replies[post.id] ?? []), { id: crypto.randomUUID(), name: name.trim() || 'Learner', text: replyText.trim() }];
    localStorage.setItem('cloudsprint_community_replies', JSON.stringify(replies));
    setReplyText('');
    setReplyingTo(null);
  };
  return <div className="standalone-page">
    <div className="standalone-heading"><span className="community-kicker">COMMUNITY</span><h1>Study together, get unstuck.</h1><p>Ask questions, share explanations, and help other AZ-900 learners.</p></div>
    <div className="standalone-grid">
      {!joined ? <section className="glass-card standalone-card community-form"><h2>Join the community</h2><p className="community-form-note">Join once before posting questions or replies. Use a nickname if you prefer.</p><button className="community-button" type="button" onClick={() => { setJoined(true); localStorage.setItem('cloudsprint_community_joined', 'true'); }}>Join community</button></section> : <form className="glass-card standalone-card community-form" onSubmit={submit}>
        <h2>Start a discussion</h2>
        <label htmlFor="community-page-name">Name or nickname<input id="community-page-name" name="communityName" value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label htmlFor="community-page-message">What are you stuck on?<textarea id="community-page-message" name="communityMessage" rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask for help with a cloud concept..." required /></label>
        <button className="community-button" type="submit">Post question</button>
      </form>}
      <section className="glass-card standalone-card" aria-label="Community discussions"><h2>Recent discussions</h2>{posts.length === 0 ? <p className="empty-state">No discussions yet. Be the first to ask for help.</p> : <div className="discussion-list">{posts.map((post) => <article className="discussion-post" key={post.id}><strong>{post.name}</strong><small>{new Date(post.createdAt).toLocaleString()}</small><p>{post.text}</p>{joined && <button type="button" onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}>Reply</button>}{replyingTo === post.id && <form className="discussion-reply" onSubmit={(event) => submitReply(event, post)}><label htmlFor={`reply-${post.id}`}>Your reply<textarea id={`reply-${post.id}`} name={`reply-${post.id}`} rows={2} value={replyText} onChange={(event) => setReplyText(event.target.value)} required /></label><button className="community-button" type="submit">Post reply</button></form>}</article>)}</div>}</section>
    </div>
  </div>;
}
