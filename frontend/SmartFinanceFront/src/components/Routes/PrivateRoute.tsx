import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode; // Asegura que 'children' sea del tipo adecuado
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { state } = useAuth(); // Accede al estado para obtener el token

  if (!state.token) { // Si no hay token, redirige al login
    return <Navigate to="/login" />;
  }

  return <>{children}</>; // Si el token está presente, renderiza los children
};

export default PrivateRoute;
