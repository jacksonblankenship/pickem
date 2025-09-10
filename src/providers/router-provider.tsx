import { useSessionContext } from '@/context/session-context';
import { routeTree } from '@/routeTree.gen';
import { Session } from '@supabase/supabase-js';
import {
  createRouter,
  RouterProvider as TanStackRouterProvider,
} from '@tanstack/react-router';
import { useEffect } from 'react';

export type RouterContext = {
  session: Session | null;
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
  },
  scrollRestoration: true,
  scrollToTopSelectors: ['#main-scroll'],
  scrollRestorationBehavior: 'auto',
});

export function RouterProvider() {
  const { session } = useSessionContext();

  useEffect(() => {
    // Invalidate the router to re-run loaders and beforeLoad guards when the session changes
    router.invalidate();
  }, [session]);

  return <TanStackRouterProvider router={router} context={{ session }} />;
}
