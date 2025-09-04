import { AppBar } from '@/components/app-bar';
import { Toaster } from '@/components/ui/sonner';
import { useSessionContext } from '@/context/session-context';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRoute,
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useEffect } from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matches = useMatches();
  const { session } = useSessionContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (session === null && location.pathname !== '/sign-in') {
      navigate({ to: '/sign-in' });
    }

    if (session !== null && location.pathname === '/sign-in') {
      navigate({ to: '/' });
    }
  }, [session, location.pathname]);

  const hideAppBar = matches.some(m => m.staticData?.hideAppBar === true);

  return (
    <>
      <div className="flex h-dvh flex-col">
        {!hideAppBar && <AppBar />}
        <main className="min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          <div className="container mx-auto px-4 py-4">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  );
}
