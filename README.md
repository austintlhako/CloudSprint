# CloudSprint

CloudSprint is a React and TypeScript learning workspace for preparing for
Microsoft Azure Fundamentals (AZ-900). It provides original practice content,
progress tracking, study planning, authentication, and a public landing page.
It is an unofficial study companion and is not affiliated with or endorsed by
Microsoft.

## Current status

The application is functional in local development. It supports guest usage
for the public landing page and authenticated access for study features when
Supabase is configured. The application does not claim a number of learners,
countries, schools, or partner organizations. The public impact counters
currently display zero until real records are available.

The current deployment configuration still contains placeholder contact and
social URLs, and the developer testimonial studio is a temporary local-only
tool. These should be replaced with production values and server-enforced
permissions before a public launch.

## Features

### Learning workspace

- AZ-900 topics covering cloud concepts, Azure architecture and services, and
  Azure management and governance.
- Original quiz questions with mixed or topic-based selection.
- Timed and graded quiz sessions with answer locking, explanations, score
  breakdowns, retry behavior, and quiz history.
- Flashcards with flipping, keyboard controls, shuffle, review status, mastery
  tracking, and review history.
- Study planner with tasks, due dates, completion state, and study milestones.
- Labs, mistakes, progress, streak, exam countdown, points, and leaderboard
  views.

### Account and community features

- Supabase email/password authentication.
- Google and GitHub OAuth entry points.
- Password reset flow and password visibility control.
- Browser-session sign-in behavior: refreshes preserve the session, while a
  new browser session requires sign-in again.
- Profile settings for full name, nickname, education level, country, school or
  programme, language, profile image, GitHub, and LinkedIn.
- Community posts, replies, issue reporting, support, friends, and reviews.
- Multiple learner reviews with local fallback and optional Supabase sharing.
- Language selection with partial Spanish, French, German, and Portuguese
  translations. Other listed languages currently fall back to English.
- Theme, accessibility, reduced-motion, high-contrast, and large-text
  preferences.

### Public Home page

- Responsive hero and feature sections.
- CloudSprint vision, mission, and promise.
- Preparation section with a video placeholder for a future YouTube embed.
- Testimonial carousel.
- Trusted learner section with no fabricated school affiliations.
- Impact section with recorded counters that remain zero until real data exists.
- Power Learn Project partner section with original descriptive copy.
- About section and FAQ.
- Responsive footer with informational links and social contact icons.

## Points and leaderboard rules

The current points implementation intentionally uses simple, auditable rules:

- One point for a login on a calendar day.
- One point for completing an exam on a calendar day.
- Multiple exams on the same day count as one exam point.
- Flashcards, labs, planner tasks, and quiz scores do not currently add points.
- Fictional or seeded leaderboard users are not included.
- A learner must provide a full name containing at least two words before
  appearing on the leaderboard.

Points are currently calculated from browser data. They are not a
server-authoritative competitive ranking system.

## Technology

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Supabase JavaScript client
- Supabase Auth and PostgreSQL with Row Level Security
- Local storage fallback for guest and offline-compatible features

## Repository structure

```text
CloudSprint/
├── frontend/
│   ├── src/
│   │   ├── components/       # Layout, navbar, auth modal, shared UI
│   │   ├── context/          # Authentication context
│   │   ├── data/             # AZ-900 topics, questions, and flashcards
│   │   ├── pages/            # Public, workspace, account, and support pages
│   │   ├── services/         # Auth-adjacent data services and local fallbacks
│   │   └── types/            # Shared TypeScript contracts
│   ├── package.json
│   ├── .env.example
│   └── vite.config.ts
├── backend/
│   └── supabase/
│       └── migrations/
│           ├── 001_initial_schema.sql
│           └── 002_app_reviews.sql
└── README.md
```

## Local development

### Requirements

- Node.js compatible with the installed Vite and TypeScript versions.
- npm.
- Supabase is optional for the public landing page and local guest behavior.

### Install and run

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173/
```

### Production build

```bash
cd frontend
npm run build
```

The build runs TypeScript project checks and creates the Vite production
bundle. The current bundle reports a large-chunk warning; this is a
performance optimization item, not a build failure.

### Other scripts

```bash
cd frontend
npm run lint
npm run preview
```

## Supabase configuration

Copy the environment template and add the publishable browser credentials:

```bash
cd frontend
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-publishable-anon-key>
```

Apply the migrations in the Supabase SQL editor or through the project’s
migration workflow:

1. `backend/supabase/migrations/001_initial_schema.sql` creates the core
   learner data tables and policies.
2. `backend/supabase/migrations/002_app_reviews.sql` creates shared reviews,
   public read access, and owner-only insert/delete policies.

If the reviews migration has not been applied, the frontend logs a warning and
uses local browser storage for reviews instead.

Do not put a Supabase service-role key in the frontend. Browser code should use
only the publishable URL and anonymous key.

## Routes

The main routes currently include:

- `/` — public Home for guests and authenticated Dashboard for signed-in users
- `/quiz` — mock exams
- `/flashcards` — flashcard study
- `/planner` — study planner
- `/labs` — labs
- `/community` — community
- `/reviews` — learner reviews
- `/friends` — study with friends
- `/profile` — profile settings
- `/support` — issue reporting and support
- `/features`, `/resources`, `/help`, `/about`, `/why-cloudsprint`,
  `/partner` — public information pages
- `/developer/testimonials` — temporary local-only developer testimonial
  studio

All learning and support routes are available in guest mode. Guest activity is
stored locally in the browser; signing in remains optional for account-based
profile features and Supabase-backed synchronization.

## Data and privacy behavior

- Guest study data is stored in the browser.
- Authenticated user data can use Supabase-backed services where implemented.
- Account export downloads the account data available to the browser.
- Account deletion downloads data first, clears CloudSprint local storage, and
  signs the user out. Secure Supabase Auth user deletion requires a
  server-side function and is not performed with the publishable browser key.
- Review sharing depends on the `app_reviews` migration and its RLS policies.
- Local browser storage can be cleared by the user or browser, so it should
  not be treated as a backup.

## Developer testimonial studio

The current `/developer/testimonials` page is a temporary local-only workflow.
It accepts the placeholder developer profile names `dev-1`, `dev-2`, and
`dev-3`, and includes three starter drafts for each placeholder. This is not
secure authorization: a browser-controlled display name can be changed by a
user.

Before production use, replace this with Supabase-authenticated developer
roles or an explicit server-side email allowlist. Do not rely on the current
local name check for privileged access.

## Known limitations and next steps

- Replace placeholder LinkedIn, WhatsApp, X, and contact URLs.
- Add real developer identities and profile links.
- Replace the preparation video placeholder with an approved YouTube URL and
  responsive embed.
- Complete translations for all listed language options.
- Apply the reviews migration in the configured Supabase project.
- Move points and leaderboard calculations to a server-authoritative model if
  cross-user rankings are required.
- Add server-side developer authorization for testimonial publishing.
- Investigate code splitting to reduce the current large JavaScript chunk.
- Add automated component and end-to-end tests.

## Verification

The current frontend has been verified with:

```bash
cd frontend
npx vite build
git diff --check
```

The build passes. Vite reports a large bundle warning, and local development
may report a missing `app_reviews` schema-cache warning until the second
Supabase migration is applied.
