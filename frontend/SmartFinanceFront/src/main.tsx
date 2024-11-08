// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { EndpointProvider } from './contexts/EndpointContext';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EndpointProvider>
          <App />
        </EndpointProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
