import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/Auth/AuthContext';
import { useEndpoint } from './contexts/EndpointContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import AppRoutes from './components/Routes/AppRoutes';

const App: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setEndpoint } = useEndpoint();

  useEffect(() => {
    // Redirige si no hay token al intentar acceder a otra ruta
    if (!state.token && location.pathname !== '/login') {
      navigate('/login');
    }

    // Configurar el endpoint según la ruta
    let newEndpoint = '/api/businesses';
    if (location.pathname.includes('/indicators')) newEndpoint = '/api/indicators';
    else if (location.pathname.includes('/costs')) newEndpoint = '/api/costs';
    else if (location.pathname.includes('/products')) newEndpoint = '/api/productServices';
    else if (location.pathname.includes('/reports')) newEndpoint = '/api/reports';
    else if (location.pathname.includes('/sales')) newEndpoint = '/api/sales';
    setEndpoint(newEndpoint);
  }, [location, setEndpoint, state.token, navigate]);

  return state.token ? (
    <Layout>
      <AppRoutes />
    </Layout>
  ) : (
    <Login />
  );
};

export default App;
