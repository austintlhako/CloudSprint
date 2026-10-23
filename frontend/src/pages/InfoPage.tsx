import { Link } from 'react-router-dom';

type InfoPageType = 'features' | 'about' | 'why' | 'partner' | 'resources' | 'help';

const content: Record<InfoPageType, { label: string; title: string; intro: string; sections: Array<[string, string]> }> = {
  features: {
    label: 'FEATURES & PROGRAMS',
    title: 'Everything you need for a focused AZ-900 study sprint.',
    intro: 'CloudSprint brings practice, active recall, planning, and progress tracking into one calm learning workspace.',
    sections: [['Practice quizzes', 'Build confidence with original practice questions, explanations, scoring, and mistake review.'], ['Smart flashcards', 'Review key Azure concepts with active recall and simple self-assessment.'], ['Study planning', 'Create a realistic schedule around your exam date, available time, and weaker domains.']],
  },
  about: {
    label: 'ABOUT CLOUDSPRINT',
    title: 'A clearer way to prepare for Azure fundamentals.',
    intro: 'CloudSprint is an unofficial learning companion designed to make AZ-900 preparation more practical and consistent.',
    sections: [['Our approach', 'We combine short practice sessions with feedback and planning so learners always know what to do next.'], ['Original learning content', 'Our study prompts are original and concept-based, using the public skills outline rather than copied exam questions.']],
  },
  why: {
    label: 'WHY CLOUDSPRINT',
    title: 'Make every study session count.',
    intro: 'CloudSprint helps turn an overwhelming syllabus into small, measurable steps.',
    sections: [['Learn from mistakes', 'Review explanations and focus future sessions on areas that need more attention.'], ['See your momentum', 'Use streaks, points, progress, and milestones to keep your preparation visible.']],
  },
  partner: {
    label: 'PARTNER WITH CLOUDSPRINT',
    title: 'Help learners prepare with confidence.',
    intro: 'We welcome conversations with instructors, bootcamps, schools, and learning communities.',
    sections: [['For instructors', 'Use CloudSprint as a supplementary practice workspace alongside your teaching programme.'], ['Start a conversation', 'Contact the team through Raise an issue and choose Suggestion or feedback.']],
  },
  resources: {
    label: 'RESOURCES CATALOG',
    title: 'Explore your study resources.',
    intro: 'Find the right CloudSprint tool for the session you have available today.',
    sections: [['Practice', 'Mock exams and targeted quizzes help you measure understanding.'], ['Recall', 'Flashcards reinforce terminology, service categories, and important distinctions.'], ['Plan', 'The planner turns your target date into manageable study sessions.']],
  },
  help: {
    label: 'HELP & FAQS',
    title: 'Find an answer and keep learning.',
    intro: 'CloudSprint is designed for guest-first exploration, with optional account-based access when Supabase is configured.',
    sections: [['Can I study as a guest?', 'Yes. Guest progress is saved locally in your browser. Sign in when you want account-based access.'], ['Are these real exam questions?', 'No. CloudSprint uses original study content based on the public AZ-900 skills scope.'], ['Need more help?', 'Use the Raise an issue page to send a question or report a problem.']],
  },
};

export default function InfoPage({ type }: { type: InfoPageType }) {
  const page = content[type];
  return <div className="standalone-page legal-copy">
    <div className="standalone-heading"><span className="community-kicker">{page.label}</span><h1>{page.title}</h1><p>{page.intro}</p></div>
    <section className="glass-card standalone-card">
      {page.sections.map(([heading, text]) => <div className="info-page-section" key={heading}><h2>{heading}</h2><p>{text}</p></div>)}
      <Link className="community-button inline-flex no-underline" to="/">Back to CloudSprint</Link>
    </section>
  </div>;
}
