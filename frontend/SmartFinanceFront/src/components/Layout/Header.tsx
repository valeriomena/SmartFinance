import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import './Header.css';

interface HeaderProps {
  businessName: string;
}

const Header: React.FC<HeaderProps> = ({ businessName }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { state, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleCloseForm = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">{businessName}</h1>
        </div>
        <div className="header-right">
          {state.token ? (
            <button onClick={handleLogout}>Cerrar Sesión</button>
          ) : (
            <div className="header-buttons">
              <button onClick={handleShowLogin}>
                {showLogin ? 'Cerrar Login' : 'Iniciar Sesión'}
              </button>
              <button onClick={handleShowRegister}>
                {showRegister ? 'Cerrar Registro' : 'Registrarse'}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`slide-form-container ${showLogin ? 'show' : ''}`}>
        {showLogin && !state.token && <Login onClose={handleCloseForm} />}
      </div>
      <div className={`slide-form-container ${showRegister ? 'show' : ''}`}>
        {showRegister && !state.token && <Register onClose={handleCloseForm} />}
      </div>
    </header>
  );
};

export default Header;
