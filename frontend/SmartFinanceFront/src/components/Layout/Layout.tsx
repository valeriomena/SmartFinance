import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';  
import Header from './Header';    
import Footer from './Footer'; 
import { useAuth } from '../Auth/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useAuth();  // Acceder al token desde el contexto global

  return (
    <div className="layout-container">
      <Header /> {/* El header siempre estará visible */}

      <div className="main-content">
        {state.token && (  // Verifica si hay token en el contexto antes de mostrar el Sidebar
          <div className="sidebar">
            <Sidebar />
          </div>
        )}

        <div className="content">
          {children} {/* Aquí se renderizan las rutas protegidas o públicas */}
        </div>
      </div>

      <Footer /> {/* El footer siempre estará visible */}
    </div>
  );
};

export default Layout;
