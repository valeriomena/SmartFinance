import React, { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ForgotPasswordProps {
    onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Correo de restablecimiento enviado.');
                setErrorMessage(null);
            } else {
                setErrorMessage(data.message || 'Hubo un error al enviar el correo.');
                setMessage(null);
            }
        } catch (error) {
            setErrorMessage('Error al solicitar restablecimiento de contraseña');
            console.error(error);
        }
    };

    return (
        <div className="relative p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-center text-gray-800">Recuperar Contraseña</h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                    </label>
                    <div className="relative mt-1">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="absolute left-3 top-3 text-gray-400"
                        />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-10 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                >
                    Enviar
                </button>
                {message && <p className="text-sm text-green-600">{message}</p>}
                {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            </form>
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
};

export default ForgotPassword;
