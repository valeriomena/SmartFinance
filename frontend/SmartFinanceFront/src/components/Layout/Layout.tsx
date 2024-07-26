import React, { ReactNode } from 'react';
import './Layout.css'; // Asegúrate de tener estilos para el layout
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
