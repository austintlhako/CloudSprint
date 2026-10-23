import { useEffect, useState, type FormEvent } from 'react';
import { getAvailableReviews, saveAvailableReview, type AppReview } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [reviews, setReviews] = useState<AppReview[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    void getAvailableReviews().then(setReviews);
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!rating) return;
    void saveAvailableReview({ rating, text, author: 'CloudSprint learner' }, user?.id).then((review) => {
      setReviews((current) => [review, ...current]);
      setRating(0);
      setText('');
    });
  };

  return <div className="standalone-page">
    <div className="standalone-heading"><span className="community-kicker">REVIEWS</span><h1>Share your CloudSprint experience.</h1><p>Reviews are available after your first exam and flashcard session, so your feedback reflects real use.</p></div>
    <section className="glass-card standalone-card review-page-card">
      <form onSubmit={submit}>
        <h2>How was your first study session?</h2>
        <p className="support-note">Share feedback after each study session. Your reviews remain available after refresh.</p>
        <fieldset className="review-rating"><legend>Rating</legend><div>{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" className={value <= rating ? 'selected' : ''} onClick={() => setRating(value)} aria-label={`${value} out of 5 stars`}>★</button>)}</div></fieldset>
        <label htmlFor="review-page-text">Comment<textarea id="review-page-text" name="reviewText" value={text} onChange={(event) => setText(event.target.value)} rows={6} placeholder="What worked well or what should we improve?" /></label>
        <button className="community-button" type="submit">Submit review</button>
      </form>
    </section>
    {reviews.length > 0 && <section className="glass-card standalone-card app-review-list" aria-labelledby="your-reviews-heading">
      <h2 id="your-reviews-heading">Community reviews</h2>
      <div className="app-review-grid">{reviews.map((review) => <article className="app-review-card" key={review.id}><div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div><p>{review.text || 'No comment provided.'}</p><small>{review.author} · {new Date(review.createdAt).toLocaleDateString()}</small></article>)}</div>
    </section>}
  </div>;
}
