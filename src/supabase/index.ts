import { env } from '@/lib/env';
import { useSession } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

export const useBackend = () => {
  const { session } = useSession();

  const supabase = createClient<Database>(
    env.VITE_SUPABASE_URL,
    env.VITE_SUPABASE_ANON_KEY,
    {
      async accessToken() {
        return session?.getToken() ?? null;
      },
    },
  );

  return { supabase, session };
};

export type SupabaseClient = ReturnType<typeof useBackend>['supabase'];
