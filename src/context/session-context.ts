import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export const SessionContext = createContext<{
  session: Session | null;
  authChangeEvent: AuthChangeEvent | null;
}>({
  session: null,
  authChangeEvent: null,
});

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }

  return context;
}
