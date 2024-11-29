// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { EndpointProvider } from './contexts/EndpointContext';
import { ItemsProvider } from './contexts/ListContext';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <EndpointProvider>
        <AuthProvider>
          <ItemsProvider> {/* Agregar ItemsProvider aquí */}
            <App />
          </ItemsProvider>
        </AuthProvider>
      </EndpointProvider>
    </BrowserRouter>
  </React.StrictMode>
);
