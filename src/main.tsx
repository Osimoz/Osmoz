import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PostHogProvider } from 'posthog-js/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        debug: import.meta.env.MODE === 'development',
      }}
    >
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </PostHogProvider>
  </StrictMode>
);