import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext'; // Usando el alias definido
import Login from '../Auth/Login'; 
import Register from '../Auth/Register'; 
import './Header.css';

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { token, logout } = useAuth(); // Usar el contexto de autenticación

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
          <h1>SmartFinance</h1>
        </div>
        <div className="header-right">
          {token ? (
            <button onClick={handleLogout}>Cerrar Sesión</button>
          ) : (
            <>
              <button onClick={handleShowLogin}>
                {showLogin ? 'Cerrar Login' : 'Iniciar Sesión'}
              </button>
              <button onClick={handleShowRegister}>
                {showRegister ? 'Cerrar Registro' : 'Registrarse'}
              </button>
            </>
          )}
        </div>
      </div>
      <div className={`slide-form-container ${showLogin ? 'show' : ''}`}>
        {showLogin && !token && <Login onClose={handleCloseForm} />}
      </div>
      <div className={`slide-form-container ${showRegister ? 'show' : ''}`}>
        {showRegister && !token && <Register onClose={handleCloseForm} />}
      </div>
    </header>
  );
};

export default Header;
