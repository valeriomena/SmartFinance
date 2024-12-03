import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { fetchCountries } from '../../services/countryService';

interface RegisterProps {
    onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countries, setCountries] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const countriesData = await fetchCountries();
                setCountries(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        loadCountries();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await api.post('/api/users', {
                name,
                email,
                password,
                phone: phoneNumber,
                country: selectedCountry,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            navigate('/');
            onClose();
        } catch (error: any) {
            setErrorMessage('Ocurrió un error al registrar.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Registro</h2>
                {errorMessage && (
                    <p className="text-sm text-red-500 text-center">{errorMessage}</p>
                )}

                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Número de teléfono"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                />
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                >
                    <option value="">Seleccionar país</option>
                    {countries.map((country) => (
                        <option key={country.cca3} value={country.cca3}>
                            {country.name.common}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Registrar
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default Register;
