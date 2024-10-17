import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes, faPhone } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import { fetchCountries } from '../../services/countryService';
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
  const [phoneCountryCode, setPhoneCountryCode] = useState(''); // Código de país para teléfono
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('');
  const [countries, setCountries] = useState<any[]>([]); // Lista de países
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null); // País seleccionado
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
  const navigate = useNavigate();

  // Obtener los países al montar el componente
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

  // Manejar cambio de país
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find((c) => c.cca2 === countryCode); // Encuentra el país por su código alfa-2
    setSelectedCountry(country);
    setPhoneCountryCode(country ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '') : ''); // Asigna el código de llamada
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Limpiar cualquier mensaje de error previo

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    if (!name || !email || !password || !phoneNumber || !phoneCountryCode) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await api.post('/api/users', {
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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      navigate('/');
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as { message: string }; // Aseguramos que 'data' tenga una propiedad 'message'
        if (data.message.includes('duplicate key error')) {
          setErrorMessage('Este correo ya está registrado. Usa otro correo.');
        } else {
          setErrorMessage('Error en el registro. Intenta nuevamente.');
        }
        console.error('Error status:', axiosError.response.status);
        console.error('Error data:', data);
      } else if (axiosError.request) {
        setErrorMessage('No se recibió respuesta del servidor.');
        console.error('No response received:', axiosError.request);
      } else {
        setErrorMessage('Ocurrió un error. Inténtalo de nuevo.');
        console.error('Error message:', axiosError.message);
      }
    }
  };

  return (
    <div className="slide-form register-container">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
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

        {/* Correo electrónico */}
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
            placeholder="Confirmar contraseña"
            required
          />
        </div>

        {/* Rol */}
        <div className="input-group">
          <label>Rol</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {/* País y Número de teléfono */}
        <div className="input-group">
          <FontAwesomeIcon icon={faPhone} />
          <select onChange={handleCountryChange} value={selectedCountry?.cca2 || ''} required>
            <option value="">Seleccionar país</option>
            {countries.map((country) => (
              <option key={country.cca2} value={country.cca2}>
                {country.name.common} ({country.idd.root}{country.idd.suffixes ? country.idd.suffixes[0] : ''})
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

        {/* Mostrar el mensaje de error si existe */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
