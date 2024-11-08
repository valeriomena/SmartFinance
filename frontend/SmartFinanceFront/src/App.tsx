// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/Auth/AuthContext';
import { useEndpoint } from './contexts/EndpointContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import AppRoutes from './components/Routes/AppRoutes';

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { state, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { endpoint, setEndpoint } = useEndpoint();

  useEffect(() => {
    // Redirigir a la página principal si el usuario tiene un token
    if (state.token) {
      navigate('/');
    } else {
      setShowLogin(true);
    }

    // Configura el endpoint según la ruta
    let newEndpoint = '/api/businesses';
    if (location.pathname.includes('/indicators')) newEndpoint = '/api/indicators';
    else if (location.pathname.includes('/costs')) newEndpoint = '/api/costs';
    else if (location.pathname.includes('/products')) newEndpoint = '/api/productServices';
    else if (location.pathname.includes('/reports')) newEndpoint = '/api/reports';
    else if (location.pathname.includes('/sales')) newEndpoint = '/api/sales';
    setEndpoint(newEndpoint);
  }, [location, setEndpoint, state.token, navigate]);

  const handleLoginSuccess = (token: string, userId: string) => {
    login(token, userId);
    setShowLogin(false);
    navigate('/');
  };

  return (
    <>
      {showLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
};

export default App;
