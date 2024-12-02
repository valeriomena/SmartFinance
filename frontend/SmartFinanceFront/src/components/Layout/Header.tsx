import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { toggleTheme } from '../../themeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

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
        <header className="bg-gray-800 text-white shadow-md fixed w-full z-10 top-0 left-0">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Left Section */}
                <div>
                    <h1 className="text-2xl font-bold text-indigo-500">SmartFinance</h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle Switch */}
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faSun} className="w-5 h-5 text-yellow-500" />
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={handleToggleTheme}
                                className="sr-only"
                            />
                            <span className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300"></span>
                            <span
                                className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${isDarkMode ? 'translate-x-5' : ''
                                    }`}
                            ></span>
                        </label>
                        <FontAwesomeIcon icon={faMoon} className="w-5 h-5 text-blue-500" />
                    </div>

                    {/* Conditional Buttons */}
                    {state.token ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition duration-300"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowLogin(!showLogin)}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300"
                            >
                                {showLogin ? 'Cerrar Login' : 'Iniciar Sesión'}
                            </button>
                            <button
                                onClick={() => setShowRegister(!showRegister)}
                                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition duration-300"
                            >
                                {showRegister ? 'Cerrar Registro' : 'Registrarse'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Conditional Slide Forms */}
            <div className={`transition-all duration-300 ${showLogin ? 'translate-x-0' : 'translate-x-full'} fixed inset-0 bg-black bg-opacity-50 z-20`}>
                {showLogin && !state.token && <Login onClose={() => setShowLogin(false)} />}
            </div>
            <div className={`transition-all duration-300 ${showRegister ? 'translate-x-0' : 'translate-x-full'} fixed inset-0 bg-black bg-opacity-50 z-20`}>
                {showRegister && !state.token && <Register onClose={() => setShowRegister(false)} />}
            </div>
        </header>
    );
};

export default Header;
