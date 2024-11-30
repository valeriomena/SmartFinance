import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { toggleTheme } from '../../themeToggle';
import './Header.css';

const Header: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const { state, logout } = useAuth();

    const handleToggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        toggleTheme();
    };

    const handleLogout = () => {
        logout();
        setShowLogin(false);
        setShowRegister(false);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <h1 className="header-title">SmartFinance</h1>
                </div>
                <div className="header-right">
                    <button
                        onClick={handleToggleTheme}
                        className={`theme-toggle ${isDarkMode ? 'active' : ''}`}
                    >
                        Modo {isDarkMode ? 'Claro' : 'Oscuro'}
                    </button>
                    {state.token ? (
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    ) : (
                        <div className="header-buttons">
                            <button onClick={() => setShowLogin(!showLogin)}>
                                {showLogin ? 'Cerrar Login' : 'Iniciar Sesión'}
                            </button>
                            <button onClick={() => setShowRegister(!showRegister)}>
                                {showRegister ? 'Cerrar Registro' : 'Registrarse'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={`slide-form-container ${showLogin ? 'show' : ''}`}>
                {showLogin && !state.token && <Login onClose={() => setShowLogin(false)} />}
            </div>
            <div className={`slide-form-container ${showRegister ? 'show' : ''}`}>
                {showRegister && !state.token && <Register onClose={() => setShowRegister(false)} />}
            </div>
        </header>
    );
};

export default Header;
