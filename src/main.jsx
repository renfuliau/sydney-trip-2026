import React from 'react';
import ReactDOM from 'react-dom/client';
import ExpenseTracker from './components/ExpenseTracker';
import { registerSW } from 'virtual:pwa-register';

// Register service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('新版本已就緒，是否重新載入？')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

const rootElement = document.getElementById('expense-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ExpenseTracker />
    </React.StrictMode>
  );
}
