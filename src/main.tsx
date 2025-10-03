import { SupabaseClient } from '@supabase/supabase-js';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './providers/app-provider';
import { Database } from './supabase/types';

import './index.css';

declare global {
  var _supabase: SupabaseClient<Database> | undefined;
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppProvider />
    </StrictMode>,
  );
}
