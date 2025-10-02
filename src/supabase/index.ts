import { AUTH_TOKEN_STORAGE_KEY } from '@/lib/constants';
import { env } from '@/lib/env';
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

export const supabase =
  globalThis._supabase ??
  createClient<Database>(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
    auth: { storageKey: AUTH_TOKEN_STORAGE_KEY },
  });

if (env.VITE_VERCEL_ENV !== 'development') {
  globalThis._supabase = supabase;
}

export type SupabaseClient = typeof supabase;
