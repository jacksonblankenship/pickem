import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from './providers/query-client-provider';
import { RouterProvider } from './providers/router-provider';
import { SessionProvider } from './providers/session-provider';

import './index.css';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <SessionProvider>
        <QueryClientProvider>
          <RouterProvider />
        </QueryClientProvider>
      </SessionProvider>
    </StrictMode>,
  );
}
