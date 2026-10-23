// ============================================================
// CloudSprint — localStorage Adapter
//
// All persistence goes through these functions.
// When Supabase is added, we can swap the implementation
// without changing the service layer.
// ============================================================

const STORAGE_PREFIX = 'cloudsprint_';

/**
 * Read a value from localStorage, parsed from JSON.
 * Returns null if the key doesn't exist or parsing fails.
 */
export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[storage] Failed to read key "${key}"`);
    return null;
  }
}

/**
 * Write a value to localStorage as JSON.
 */
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    console.warn(`[storage] Failed to write key "${key}"`);
  }
}

/**
 * Remove a value from localStorage.
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    console.warn(`[storage] Failed to remove key "${key}"`);
  }
}

/**
 * List all keys managed by CloudSprint.
 */
export function getAllKeys(): string[] {
  const keys: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        keys.push(key.slice(STORAGE_PREFIX.length));
      }
    }
  } catch {
    console.warn('[storage] Failed to list keys');
  }
  return keys;
}
