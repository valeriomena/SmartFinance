import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes, faPhone } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface RegisterProps {
  onClose: () => void;
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
  const [countries, setCountries] = useState<any[]>([]); // Almacenamos los países
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null); // País seleccionado
  const navigate = useNavigate();


  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find((c) => c.cca2 === countryCode); // Encuentra el país por el código
    setSelectedCountry(country);
    setPhoneCountryCode(country ? country.callingCodes[0] : ''); // Asignar el código de llamada
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!name || !email || !password || !phoneNumber || !phoneCountryCode) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await api.post('/api/users/register', {
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

      console.log('Response data:', response.data);
      console.log('Token:', response.data.token);
      console.log('User ID:', response.data.userId);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      navigate('/');
      onClose();

    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error status:', axiosError.response.status);
        console.error('Error data:', axiosError.response.data);
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
      } else {
        console.error('Error message:', axiosError.message);
      }
    }
  };

  return (
    <div className="slide-form register-container">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            required
          />
        </div>
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
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        <div className="input-group">
          <label>Rol</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faPhone} />
          <select onChange={handleCountryChange} value={selectedCountry?.cca2 || ''} required>
            <option value="">Seleccionar país</option>
            {countries.map((country) => (
              <option key={country.cca2} value={country.cca2}>
                {country.name.common}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Número de teléfono"
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        <button type="button" className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </form>
    </div>
  );
};

export default Register;
