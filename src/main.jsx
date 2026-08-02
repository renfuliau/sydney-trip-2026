import React from 'react';
import ReactDOM from 'react-dom/client';
import ExpenseTracker from './components/ExpenseTracker';
import SosSection from './components/SosSection';
import VoiceTranslator from './components/VoiceTranslator';
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

// 1. Render Expense Tracker
const expenseRoot = document.getElementById('expense-root');
if (expenseRoot) {
  ReactDOM.createRoot(expenseRoot).render(
    <React.StrictMode>
      <ExpenseTracker />
    </React.StrictMode>
  );
}

// 2. Render SOS Section
const sosRoot = document.getElementById('sos-root');
if (sosRoot) {
  ReactDOM.createRoot(sosRoot).render(
    <React.StrictMode>
      <SosSection />
    </React.StrictMode>
  );
}

// 3. Render Voice Translator Component
const translatorRoot = document.getElementById('translator-root');
if (translatorRoot) {
  ReactDOM.createRoot(translatorRoot).render(
    <React.StrictMode>
      <VoiceTranslator />
    </React.StrictMode>
  );
}
