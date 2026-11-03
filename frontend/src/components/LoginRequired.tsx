export default function LoginRequired() {
  return (
    <section className="login-required glass-card" aria-labelledby="login-required-heading">
      <span className="community-kicker">SIGN IN REQUIRED</span>
      <h1 id="login-required-heading">Continue with CloudSprint</h1>
      <p>Explore the public feature overview on Home, then log in to use quizzes, flashcards, planning, labs, and community tools.</p>
      <button type="button" className="community-button" onClick={() => window.dispatchEvent(new CustomEvent('cloudsprint:open-auth'))}>Log in to continue</button>
    </section>
  );
}
