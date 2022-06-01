import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './assets/styles/main.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root');
}

const root = createRoot(container);

root.render(<App />);
