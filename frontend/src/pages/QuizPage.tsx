import { QuizPage as QuizFeature } from '../features/quiz/QuizPage';
import { useState } from 'react';
import { getQuizHistory } from '../services/quizService';

export default function QuizPage() {
  const [history] = useState(() => getQuizHistory());
  const latest = history[0];
  return <div className="quiz-page-with-history">
    <section className="glass-card quiz-history-card" aria-labelledby="latest-quiz-heading">
      <span className="community-kicker">MOCK EXAMS</span>
      <h1 id="latest-quiz-heading">Latest quiz attempt</h1>
      {latest ? <p><strong>{latest.score} / {latest.totalQuestions}</strong> · {Math.round((latest.score / latest.totalQuestions) * 100)}% · {new Date(latest.completedAt).toLocaleString()}</p> : <p>No quiz attempts yet. Start a practice assessment below.</p>}
    </section>
    <QuizFeature />
  </div>;
}
