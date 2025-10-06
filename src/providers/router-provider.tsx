import { useSessionContext } from '@/context/session-context';
import { routeTree } from '@/routeTree.gen';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import {
  createRouter,
  RouterProvider as TanStackRouterProvider,
} from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export type RouterContext = {
  session: Session | null;
  authChangeEvent: AuthChangeEvent | null;
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
    authChangeEvent: null,
  },
  scrollRestoration: true,
  scrollToTopSelectors: ['#main-scroll'],
  scrollRestorationBehavior: 'auto',
});

export function RouterProvider() {
  const { session, authChangeEvent } = useSessionContext();

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

  useEffect(() => {
    console.log('authChangeEvent', authChangeEvent);

    if (authChangeEvent === 'PASSWORD_RECOVERY') {
      console.log('navigating to update-password');

      router.navigate({ to: '/update-password' });
    }
  }, [authChangeEvent]);

  return (
    <TanStackRouterProvider
      router={router}
      context={{ session, authChangeEvent }}
    />
  );
}
