import { useSessionContext } from '@/context/session-context';
import { routeTree } from '@/routeTree.gen';
import { Session } from '@supabase/supabase-js';
import {
  createRouter,
  RouterProvider as TanStackRouterProvider,
} from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export type RouterContext = {
  session: Session | null;
  isPasswordRecovery: boolean;
};

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface StaticDataRouteOption {
    hideAppBar?: boolean;
  }
}

const router = createRouter({
  routeTree,
  context: {
    session: null,
    isPasswordRecovery: false,
  },
  scrollRestoration: true,
  scrollToTopSelectors: ['#main-scroll'],
  scrollRestorationBehavior: 'auto',
});

export function RouterProvider() {
  const { session, isPasswordRecovery } = useSessionContext();

  const previousSession = useRef<Session | null>(null);

  useEffect(() => {
    // don't bother invalidating the router if the session has not changed
    if (
      previousSession.current?.access_token === session?.access_token &&
      previousSession.current?.refresh_token === session?.refresh_token
    )
      return;

    previousSession.current = session;

    // invalidate the router to re-run loaders and beforeLoad guards when the session changes
    router.invalidate();
  }, [session]);

  return (
    <TanStackRouterProvider
      router={router}
      context={{ session, isPasswordRecovery }}
    />
  );
}
