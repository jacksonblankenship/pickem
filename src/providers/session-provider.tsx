import { SessionContext } from '@/context/session-context';
import { AUTH_TOKEN_STORAGE_KEY } from '@/lib/constants';
import { supabase } from '@/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import z from 'zod';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [authChangeEvent, setAuthChangeEvent] =
    useState<AuthChangeEvent | null>(null);

  const [session, setSession] = useState<Session | null>(() => {
    try {
      const storageItem = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
      if (storageItem === null) return null;

      const unsafeJson = JSON.parse(storageItem);
      const session = z
        .object({
          expires_at: z.int().positive(),
        })
        .loose()
        .safeParse(unsafeJson);
      if (session.success === false) return null;

      const { expires_at } = session.data;
      if (expires_at * 1000 < Date.now()) return null;

      // unfortunately, casting seems to make the most sense here (gross)
      return session.data as unknown as Session;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setAuthChangeEvent(event);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, authChangeEvent }}>
      {children}
    </SessionContext.Provider>
  );
}
