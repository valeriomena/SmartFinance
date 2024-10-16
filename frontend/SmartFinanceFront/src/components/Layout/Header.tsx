import React, { useState } from 'react';
import { useAuth } from '@components/Auth/AuthContext';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import './Header.css';

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { state, logout } = useAuth(); // Usar `state.token` en lugar de `token`

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    setShowLogin(false);
    setShowRegister(false);
  };

  // Mostrar el formulario de Login
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false); // Ocultar el registro al abrir el login
  };

  // Mostrar el formulario de Registro
  const handleShowRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false); // Ocultar el login al abrir el registro
  };

  // Función para cerrar cualquier formulario
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
          {state.token ? (  // Aquí usamos state.token
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
      {/* Contenedor para el formulario de Login */}
      <div className={`slide-form-container ${showLogin ? 'show' : ''}`}>
        {showLogin && !state.token && <Login onClose={handleCloseForm} />}
      </div>
      {/* Contenedor para el formulario de Registro */}
      <div className={`slide-form-container ${showRegister ? 'show' : ''}`}>
        {showRegister && !state.token && <Register onClose={handleCloseForm} />}
      </div>
    </header>
  );
};

export default Header;
