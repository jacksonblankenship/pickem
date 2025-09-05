import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { SessionProvider } from './providers/session-provider';
import { routeTree } from './routeTree.gen';

import './index.css';

// Create a query client
const queryClient = new QueryClient();

// Create a persister for the query client
const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

// Create a new router instance
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  scrollToTopSelectors: ['#main-scroll'],
  scrollRestorationBehavior: 'auto',
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface StaticDataRouteOption {
    hideAppBar?: boolean;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <SessionProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}>
          <RouterProvider router={router} />
        </PersistQueryClientProvider>
      </SessionProvider>
    </StrictMode>,
  );
}
