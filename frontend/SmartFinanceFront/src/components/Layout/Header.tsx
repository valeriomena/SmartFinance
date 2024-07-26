import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom
import Login from '../Auth/Login'; // Usa rutas relativas si no tienes alias configurados
import './Header.css';

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>SmartFinance</h1>
        </div>
        <div className="header-right">
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Cerrar Login' : 'Iniciar Sesión'}
          </button>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
      {showLogin && <Login />}
    </header>
  );
};

export default Header;
