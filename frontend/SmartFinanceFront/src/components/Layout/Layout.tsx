import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';  // Asumiendo que tienes un componente Sidebar
import Header from './Header';    // Asumiendo que tienes un componente Header
import { useAuth } from '../Auth/AuthContext';

interface LayoutProps {
  children: ReactNode; // Declara correctamente que 'children' es un ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { token } = useAuth();  // Acceder al token desde el contexto de autenticación

  return (
    <div className="layout-container">
      {token && (
        <div className="sidebar">
          <Sidebar />
        </div>
      )}
      {token && (
        <div className="header">
          <Header />
        </div>
      )}
      <div className="content">
        {children} {/* Aquí es donde se renderizan las rutas */}
      </div>
    </div>
  );
};

export default Layout;
