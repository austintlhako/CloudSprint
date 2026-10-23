// ============================================================
// Study Planner Service — Dev B
// ============================================================
// Manages CRUD operations for AZ-900 study tasks.
// Transparently switches between Supabase (for authenticated users)
// and browser localStorage (for guest / offline mode).
// ============================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { StudyTask } from '../types';

const LOCAL_STORAGE_KEY = 'cloudsprint_study_tasks';

// Database row representation matching supabase schema
interface StudyTaskRow {
  id: string;
  user_id: string;
  title: string;
  domain: string;
  subtopic: string;
  due_date: string;
  estimated_minutes: number;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
}

// Convert DB row to Domain StudyTask model
function rowToTask(row: StudyTaskRow): StudyTask {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    domain: row.domain as StudyTask['domain'],
    subtopic: row.subtopic as StudyTask['subtopic'],
    dueDate: row.due_date,
    estimatedMinutes: row.estimated_minutes,
    completed: row.completed,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}

// Helper: read guest tasks from localStorage
function getLocalTasks(): StudyTask[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudyTask[]) : [];
  } catch (err) {
    console.error('Failed to parse local study tasks:', err);
    return [];
  }
}

// Helper: save guest tasks to localStorage
function saveLocalTasks(tasks: StudyTask[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to persist local study tasks:', err);
  }
}

/**
 * Fetch all study tasks for the current user.
 * Reads from Supabase if authenticated, else returns guest tasks from localStorage.
 */
export async function getTasks(userId: string | null): Promise<StudyTask[]> {
  if (userId && isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('study_tasks')
        .select('*')
        .eq('user_id', userId)
        .order('due_date', { ascending: true });

      if (error) {
        console.warn('Supabase fetch failed, falling back to local storage:', error.message);
        return getLocalTasks();
      }

      return (data as StudyTaskRow[]).map(rowToTask);
    } catch (err) {
      console.warn('Error fetching tasks from Supabase:', err);
      return getLocalTasks();
    }
  }

  return getLocalTasks();
}

/**
 * Create a new study task.
 */
export async function createTask(
  task: Omit<StudyTask, 'id' | 'createdAt'>
): Promise<StudyTask> {
  const now = new Date().toISOString();

  if (task.userId && isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('study_tasks')
        .insert({
          user_id: task.userId,
          title: task.title,
          domain: task.domain,
          subtopic: task.subtopic,
          due_date: task.dueDate,
          estimated_minutes: task.estimatedMinutes,
          completed: task.completed,
          completed_at: task.completedAt,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return rowToTask(data as StudyTaskRow);
    } catch (err) {
      console.warn('Supabase task creation failed, storing locally:', err);
    }
  }

  // Local storage fallback
  const newTask: StudyTask = {
    ...task,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
    createdAt: now,
  };

  const tasks = getLocalTasks();
  tasks.push(newTask);
  saveLocalTasks(tasks);

  return newTask;
}

/**
 * Update an existing study task.
 */
export async function updateTask(
  id: string,
  updates: Partial<StudyTask>
): Promise<StudyTask> {
  if (isSupabaseConfigured && supabase && updates.userId) {
    try {
      const payload: Partial<StudyTaskRow> = {};
      if (updates.title !== undefined) payload.title = updates.title;
      if (updates.domain !== undefined) payload.domain = updates.domain;
      if (updates.subtopic !== undefined) payload.subtopic = updates.subtopic;
      if (updates.dueDate !== undefined) payload.due_date = updates.dueDate;
      if (updates.estimatedMinutes !== undefined) payload.estimated_minutes = updates.estimatedMinutes;
      if (updates.completed !== undefined) {
        payload.completed = updates.completed;
        payload.completed_at = updates.completed ? new Date().toISOString() : null;
      }

      const { data, error } = await supabase
        .from('study_tasks')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return rowToTask(data as StudyTaskRow);
      }
    } catch (err) {
      console.warn('Supabase task update failed, updating local storage:', err);
    }
  }

  // Local storage fallback
  const tasks = getLocalTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Task with ID ${id} not found.`);
  }

  const updated: StudyTask = {
    ...tasks[index],
    ...updates,
    completedAt: updates.completed !== undefined
      ? (updates.completed ? new Date().toISOString() : null)
      : tasks[index].completedAt,
  };

  tasks[index] = updated;
  saveLocalTasks(tasks);

  return updated;
}

/**
 * Delete a study task.
 */
export async function deleteTask(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('study_tasks')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase task deletion error:', error.message);
      }
    } catch (err) {
      console.warn('Failed to delete task from Supabase:', err);
    }
  }

  // Always sync local storage
  const tasks = getLocalTasks().filter((t) => t.id !== id);
  saveLocalTasks(tasks);
// CloudSprint — Planner Service
//
// Full CRUD for study tasks with localStorage persistence.
// ============================================================

import { getItem, setItem } from '../lib/storage';
import type { StudyTask, TopicId } from '../types';

const TASKS_KEY = 'study_tasks';

/**
 * Generate a simple unique ID (no crypto needed for localStorage).
 */
function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Get all tasks, sorted by due date (earliest first).
 */
export function getTasks(): StudyTask[] {
  const tasks = getItem<StudyTask[]>(TASKS_KEY) ?? [];
  return tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/**
 * Create a new task. Returns the created task with generated fields.
 */
export function createTask(input: {
  title: string;
  topicId: TopicId;
  dueDate: string;
  estimatedMinutes: number;
}): StudyTask {
  const task: StudyTask = {
    id: generateId(),
    title: input.title,
    topicId: input.topicId,
    dueDate: input.dueDate,
    estimatedMinutes: input.estimatedMinutes,
    isCompleted: false,
    completedAt: null,
    createdAt: new Date().toISOString(),
  };

  const tasks = getTasks();
  tasks.push(task);
  setItem(TASKS_KEY, tasks);
  return task;
}

/**
 * Update an existing task by ID. Returns the updated task.
 * Throws if the task is not found.
 */
export function updateTask(id: string, updates: Partial<StudyTask>): StudyTask {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index < 0) throw new Error(`Task not found: ${id}`);

  tasks[index] = { ...tasks[index], ...updates };
  setItem(TASKS_KEY, tasks);
  return tasks[index];
}

/**
 * Delete a task by ID.
 */
export function deleteTask(id: string): void {
  const tasks = getTasks().filter((t) => t.id !== id);
  setItem(TASKS_KEY, tasks);
}

/**
 * Toggle a task's completed status.
 */
export function toggleTaskComplete(id: string): StudyTask {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error(`Task not found: ${id}`);

  task.isCompleted = !task.isCompleted;
  task.completedAt = task.isCompleted ? new Date().toISOString() : null;
  setItem(TASKS_KEY, tasks);
  return task;
}

/**
 * Get today's tasks (due today).
 */
export function getTodayTasks(): StudyTask[] {
  const today = new Date().toISOString().split('T')[0];
  return getTasks().filter((t) => t.dueDate === today);
}

/**
 * Get upcoming tasks (due after today, not completed).
 */
export function getUpcomingTasks(): StudyTask[] {
  const today = new Date().toISOString().split('T')[0];
  return getTasks().filter((t) => t.dueDate > today && !t.isCompleted);
}

/**
 * Get overdue tasks (due before today, not completed).
 */
export function getOverdueTasks(): StudyTask[] {
  const today = new Date().toISOString().split('T')[0];
  return getTasks().filter((t) => t.dueDate < today && !t.isCompleted);
}

/**
 * Get summary stats for the dashboard.
 */
export function getPlannerStats() {
  const tasks = getTasks();
  const total = tasks.length;
  const completed = tasks.filter((t) => t.isCompleted).length;
  const overdue = getOverdueTasks().length;
  const todayCount = getTodayTasks().length;

  return { total, completed, overdue, todayCount };
}
