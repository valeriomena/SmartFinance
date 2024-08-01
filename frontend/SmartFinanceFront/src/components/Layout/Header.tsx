import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext'; // Usando el alias definido
import Login from '../Auth/Login'; 
import './Header.css';

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token, logout } = useAuth(); // Usar el contexto de autenticación

  const handleLogout = () => {
    logout();
    setShowLogin(false);
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
              <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? 'Cerrar Login' : 'Iniciar Sesión'}
              </button>
              <Link to="/register">
                <button>Registrarse</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {showLogin && !token && <Login />}
    </header>
  );
};

export default Header;
