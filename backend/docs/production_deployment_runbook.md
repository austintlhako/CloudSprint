# CloudSprint: Production Deployment & Backend Runbook

> **Author:** Developer B (Backend Specialist)  
> **Status:** Production Ready  
> **Target:** Vercel / Netlify + Supabase

---

## 1. Production Environment Variables

When deploying the frontend to **Vercel** or **Netlify**, configure the following environment variables in the project settings:

| Variable | Scope | Description | Example |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Client (Build & Runtime) | Your Supabase project API URL | `https://xyzproject.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Client (Build & Runtime) | Publishable anon key (safe for browser) | `eyJhbGciOiJIUzI1NiIsInR5cCI...` |

> [!CAUTION]
> **NEVER** add `SUPABASE_SERVICE_ROLE_KEY` to Vercel/Netlify environment variables. The service role key bypasses RLS and must never be included in client-side code bundles.

---

## 2. Supabase Production Authentication Settings

To ensure user sign-up and authentication work smoothly on the deployed production domain:

1. **Navigate to:** Supabase Dashboard -> **Authentication** -> **URL Configuration**.
2. **Site URL:** Set to your production domain (e.g. `https://cloudsprint.vercel.app` or `https://cloudsprint.netlify.app`).
3. **Redirect URLs:** Add:
   - `https://cloudsprint.vercel.app/**`
   - `http://localhost:5173/**` (for ongoing local development)
4. **Email Confirmation (Hackathon MVP Recommendation):**
   - Under **Authentication** -> **Providers** -> **Email**:
   - For frictionless hackathon live demos, you may toggle **"Confirm email"** to `OFF` so evaluators and judges can test registration and instant sign-in without waiting for an email verification token.

---

## 3. Database Health & Pre-Launch Checklist

- [x] Initial migration executed (`supabase/migrations/001_initial_schema.sql`).
- [x] RLS enabled on all three tables (`study_tasks`, `flashcard_progress`, `quiz_attempts`).
- [x] Indexing verified for `user_id`, `due_date`, and `completed_at`.
- [x] Fallback to `localStorage` verified if offline or if Supabase keys are missing.
- [x] Zero build errors during `npm run build` production bundling.
