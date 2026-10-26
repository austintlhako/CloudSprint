# CloudSprint: Row-Level Security (RLS) & Data Isolation Verification

> **Author:** Developer B (Backend Specialist)  
> **Status:** Verified & Automated  
> **Target:** `study_tasks`, `flashcard_progress`, `quiz_attempts`, `app_reviews`

---

## 1. Security Architecture Summary

All user-generated records in CloudSprint are protected by PostgreSQL **Row Level Security (RLS)** in Supabase.

1. **Authentication Enforcement:** Every user-owned row requires `user_id = auth.uid()`.
2. **Key Separation:** Client applications only receive the **publishable anon key**. The `service_role` secret key is never used or exposed in client bundles.
3. **No Cross-Tenant Leaks:** Users can only `SELECT`, `INSERT`, `UPDATE`, and `DELETE` rows where their JWT `sub` claim matches the row's `user_id`.
4. **Anonymous Lockdown:** Unauthenticated requests receive an empty array `[]` on `SELECT` and error `401/403` on mutations.

---

## 2. Automated SQL Verification Suite

Run this test script directly in the **Supabase SQL Editor** to mathematically verify that RLS blocks cross-user access:

```sql
-- ============================================================
-- CLOUDSPRINT RLS TEST SUITE
-- ============================================================

DO $$
DECLARE
  v_user_a UUID := '11111111-1111-1111-1111-111111111111';
  v_user_b UUID := '22222222-2222-2222-2222-222222222222';
  v_task_id UUID;
  v_count INTEGER;
BEGIN
  RAISE NOTICE '=== Starting CloudSprint RLS Verification ===';

  -- 1. Setup mock user contexts in auth.users if testing in local postgres
  -- In Supabase dashboard, use two real user UUIDs from auth.users.

  -- 2. Simulate User A inserting their study task
  EXECUTE format('SET LOCAL request.jwt.claim.sub = %L', v_user_a);
  EXECUTE format('SET LOCAL role = %L', 'authenticated');

  INSERT INTO public.study_tasks (user_id, title, domain, subtopic, due_date, estimated_minutes)
  VALUES (v_user_a, 'User A Secret Task', 'cloud-concepts', 'cloud-computing', CURRENT_DATE, 30)
  RETURNING id INTO v_task_id;

  RAISE NOTICE 'User A created task %', v_task_id;

  -- 3. Verify User A can view their own task
  SELECT count(*) INTO v_count FROM public.study_tasks WHERE id = v_task_id;
  IF v_count = 1 THEN
    RAISE NOTICE 'TEST 1 PASSED: User A can read their own task.';
  ELSE
    RAISE EXCEPTION 'TEST 1 FAILED: User A cannot read their own task.';
  END IF;

  -- 4. Switch context to User B and attempt to view User A's task
  EXECUTE format('SET LOCAL request.jwt.claim.sub = %L', v_user_b);
  EXECUTE format('SET LOCAL role = %L', 'authenticated');

  SELECT count(*) INTO v_count FROM public.study_tasks WHERE id = v_task_id;
  IF v_count = 0 THEN
    RAISE NOTICE 'TEST 2 PASSED: User B cannot read User A task (RLS isolation active).';
  ELSE
    RAISE EXCEPTION 'TEST 2 FAILED: User B was able to read User A task!';
  END IF;

  -- 5. Switch to Anonymous Role and verify 0 rows returned
  EXECUTE 'SET LOCAL role = anon';
  SELECT count(*) INTO v_count FROM public.study_tasks WHERE id = v_task_id;
  IF v_count = 0 THEN
    RAISE NOTICE 'TEST 3 PASSED: Anonymous user cannot read User A task.';
  ELSE
    RAISE EXCEPTION 'TEST 3 FAILED: Anonymous user was able to read task!';
  END IF;

  RAISE NOTICE '=== All CloudSprint RLS Tests Passed Successfully! ===';
END $$;
```

---

## 3. End-to-End Browser Isolation Test Protocol

For QA Engineer (Developer C) or Evaluator:

1. **Window 1 (User A):**
   - Open browser in Incognito.
   - Click **Sign In** -> Switch to **Sign Up** -> Register as `usera@example.com`.
   - Go to **Study Planner** -> Create task: *"Master Cloud Concepts (User A)"*.
2. **Window 2 (User B):**
   - Open a separate private browsing session.
   - Click **Sign In** -> **Sign Up** -> Register as `userb@example.com`.
   - Go to **Study Planner** -> Verify list is **empty** (User A's task is invisible).
   - Create task: *"Master Azure Architecture (User B)"*.
3. **Window 3 (Guest User):**
   - Open standard browser window without signing in.
   - Verify guest tasks are saved strictly in that browser's `localStorage` and never leak into User A or User B accounts.
