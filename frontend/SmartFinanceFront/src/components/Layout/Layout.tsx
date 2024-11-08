// Layout.tsx
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../Auth/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useAuth();  // Acceder al token desde el contexto global
  
  return (
    <div className="layout">
      <Header /> 

      <div className="main-content">
        {state.token && (
          <Sidebar />
        )}

        <div className="content">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
