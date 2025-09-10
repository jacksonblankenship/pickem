import { AppBar } from '@/components/app-bar';
import { Toaster } from '@/components/ui/sonner';
import { RouterContext } from '@/providers/router-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  Outlet,
  useMatches,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const matches = useMatches();
  const hideAppBar = matches.some(m => m.staticData?.hideAppBar === true);

  return (
    <>
      <div className="flex min-h-dvh flex-col">
        {!hideAppBar && <AppBar />}
        <main className="flex-1 pb-[env(safe-area-inset-bottom)]">
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
