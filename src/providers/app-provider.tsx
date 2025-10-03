import { QueryClientProvider } from './query-client-provider';
import { RouterProvider } from './router-provider';
import { SessionProvider } from './session-provider';
import { ThemeProvider } from './theme-provider';

export function AppProvider() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pickem-theme">
      <SessionProvider>
        <QueryClientProvider>
          <RouterProvider />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
