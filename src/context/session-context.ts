import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export const SessionContext = createContext<{
  session: Session | null;
  isPasswordRecovery: boolean;
}>({
  session: null,
  isPasswordRecovery: false,
});

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }

  return context;
}
