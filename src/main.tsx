import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { reportWebVitals, observePerformance } from './utils/webVitals';

// Start performance monitoring
observePerformance();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Report web vitals in development
if (import.meta.env.DEV) {
  reportWebVitals();
}
