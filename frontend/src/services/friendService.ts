import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_STORAGE_KEY = 'cloudsprint_friend_invites';

export interface FriendInvite {
  recipient: string;
  createdAt: string;
  status: 'pending';
}

function getLocalInvites(): FriendInvite[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]') as FriendInvite[];
  } catch (error) {
    console.error('Failed to parse local friend invites:', error);
    return [];
  }
}

export async function createFriendInvite(userId: string | null, recipient: string): Promise<void> {
  const invite: FriendInvite = {
    recipient,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  const localInvites = getLocalInvites();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...localInvites, invite]));

  if (!userId || !isSupabaseConfigured || !supabase) return;

  const { error } = await supabase.from('friend_invites').insert({
    inviter_id: userId,
    recipient,
  });
  if (error) {
    console.warn('Failed to sync friend invite:', error.message);
  }
}
