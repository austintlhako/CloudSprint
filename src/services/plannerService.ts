// ============================================================
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
