import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_STORAGE_KEY = 'cloudsprint_labs';

function getLocalCompleted(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]') as string[];
  } catch (error) {
    console.error('Failed to parse local lab progress:', error);
    return [];
  }
}

function saveLocalCompleted(ids: string[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
}

export async function getCompletedLabs(userId: string | null): Promise<string[]> {
  if (userId && isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('lab_progress')
      .select('lab_id')
      .eq('user_id', userId)
      .eq('completed', true);

    if (!error) {
      return (data as Array<{ lab_id: string }>).map((row) => row.lab_id);
    }

    console.warn('Failed to fetch lab progress, using local progress:', error.message);
  }

  return getLocalCompleted();
}

export async function setLabCompleted(userId: string | null, labId: string, completed: boolean): Promise<void> {
  const localIds = getLocalCompleted();
  const nextLocalIds = completed
    ? [...new Set([...localIds, labId])]
    : localIds.filter((id) => id !== labId);
  saveLocalCompleted(nextLocalIds);

  if (!userId || !isSupabaseConfigured || !supabase) return;

  const { error } = await supabase
    .from('lab_progress')
    .upsert(
      { user_id: userId, lab_id: labId, completed, completed_at: completed ? new Date().toISOString() : null },
      { onConflict: 'user_id,lab_id' },
    );

  if (error) {
    console.warn('Failed to sync lab progress:', error.message);
  }
}
