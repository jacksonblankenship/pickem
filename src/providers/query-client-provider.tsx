import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import superjson from 'superjson';

const queryClient = new QueryClient();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
  serialize: data => superjson.stringify(data),
  deserialize: str => superjson.parse(str),
});

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}>
      {children}
    </PersistQueryClientProvider>
  );
}
