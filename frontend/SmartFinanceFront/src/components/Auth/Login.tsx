import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../Auth/AuthContext';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import logo from '../../Img/SF.svg'; // Ruta del logo

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(null);

        try {
            const response = await api.post('/api/users/login', { email, password });
            const { token, userId } = response.data;
            login(token, userId);
            navigate('/');
        } catch (error: any) {
            setErrorMessage('Credenciales incorrectas.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
            {/* Logo y descripción */}
            <div className="text-center mb-8">
                <img src={logo} alt="SmartFinance Logo" className="w-24 h-24 mx-auto" />
                <h1 className="mt-4 text-3xl font-bold text-white">¡Bienvenido a SmartFinance!</h1>
                <p className="mt-2 text-lg text-gray-200">
                    Organiza tus negocios, productos y ventas en un solo lugar. Regístrate y da el primer paso hacia una gestión financiera inteligente.
                </p>
            </div>

            {/* Contenedor del formulario */}
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                    >
                        Entrar
                    </button>
                </form>

                {/* Enlaces adicionales */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        className="text-sm text-indigo-600 hover:underline"
                        onClick={() => setShowRegister(true)}
                    >
                        Crear una cuenta gratuita.
                    </button>
                </div>
                <div className="mt-2 text-center">
                    <button
                        type="button"
                        className="text-sm text-indigo-600 hover:underline"
                        onClick={() => setShowForgotPassword(true)}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
            </div>

            {/* Render Condicional */}
            {showRegister && (
                <div className="absolute inset-0 bg-white rounded-lg shadow-lg z-10 p-4">
                    <Register onClose={() => setShowRegister(false)} />
                </div>
            )}
            {showForgotPassword && (
                <div className="absolute inset-0 bg-white rounded-lg shadow-lg z-10 p-4">
                    <ForgotPassword onClose={() => setShowForgotPassword(false)} />
                </div>
            )}
        </div>
    );
};

export default Login;
