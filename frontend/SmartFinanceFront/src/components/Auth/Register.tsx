import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchCountries } from '../../services/countryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface RegisterProps {
  onClose: () => void;
}

interface RegisterResponse {
  token: string;
  userId: string;
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('');
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('');
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries() as any[];
        setCountries(countriesData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    loadCountries();
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find((c) => c.cca2 === countryCode);
    setSelectedCountry(country);
    setPhoneCountryCode(country ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '') : '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    if (!name || !email || !password || !phoneNumber || !phoneCountryCode) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.post<RegisterResponse>('/api/users', {
        name,
        email,
        password,
        role,
        phone: {
          number: phoneNumber,
          country_code: phoneCountryCode,
        },
        whatsapp_country_code: whatsappCountryCode,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/');
      onClose();
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response?.data;
        setErrorMessage(data?.message.includes('duplicate key error') ?
          'Este correo ya está registrado. Usa otro correo.' :
          'Error en el registro. Intenta nuevamente.');
      } else {
        setErrorMessage('Ocurrió un error inesperado.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar</h2>

      {/* Nombre */}
      <div className="input-group">
        <FontAwesomeIcon icon={faUser} />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
          required
        />
      </div>

      {/* Correo */}
      <div className="input-group">
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
      </div>

      {/* Contraseña */}
      <div className="input-group">
        <FontAwesomeIcon icon={faLock} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
      </div>

      {/* Confirmar Contraseña */}
      <div className="input-group">
        <FontAwesomeIcon icon={faLock} />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Contraseña"
          required
        />
      </div>

      {/* Teléfono */}
      <div className="input-group">
        <FontAwesomeIcon icon={faPhone} />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Número de teléfono"
          required
        />
      </div>

      {/* País */}
      <div className="input-group">
        <select onChange={handleCountryChange} value={selectedCountry?.cca2}>
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje de error */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="submit">Registrarse</button>
      <button type="button" className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </form>
  );
};

export default Register;
