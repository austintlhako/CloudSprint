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
  due_time?: string;
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
    dueTime: row.due_time,
    estimatedMinutes: row.estimated_minutes,
    isCompleted: row.completed,
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
export async function getTasks(userId: string | null = null): Promise<StudyTask[]> {
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
          due_time: task.dueTime,
          estimated_minutes: task.estimatedMinutes,
          completed: task.isCompleted,
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
      if (updates.dueTime !== undefined) payload.due_time = updates.dueTime;
      if (updates.estimatedMinutes !== undefined) payload.estimated_minutes = updates.estimatedMinutes;
      if (updates.isCompleted !== undefined) {
        payload.completed = updates.isCompleted;
        payload.completed_at = updates.isCompleted ? new Date().toISOString() : null;
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
    completedAt: updates.isCompleted !== undefined
      ? (updates.isCompleted ? new Date().toISOString() : null)
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
}

export function getUpcomingTasks(): StudyTask[] {
  const today = new Date().toISOString().split('T')[0];
  return getLocalTasks().filter((task) => task.dueDate >= today && !task.isCompleted);
}

export function getPlannerStats() {
  const tasks = getLocalTasks();
  const today = new Date().toISOString().split('T')[0];
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.isCompleted).length,
    overdue: tasks.filter((task) => task.dueDate < today && !task.isCompleted).length,
    todayCount: tasks.filter((task) => task.dueDate === today).length,
  };
}
