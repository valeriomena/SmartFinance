import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode; // Esto asegura que 'children' sea de tipo adecuado
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>; // Renderiza los children si el token está presente
};

export default PrivateRoute;
