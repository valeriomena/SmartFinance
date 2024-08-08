import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faGlobe, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css';
import { fetchCountries } from '../../services/countryService';
import useRegisterUser from '../../hooks/useRegisterUser';
import '../../styles/SlideForm.css';
import './Register.css';

interface RegisterProps {
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [region, setRegion] = useState('');
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('');
  const [countries, setCountries] = useState<any[]>([]);
  const { registerUser, errors, successMessage } = useRegisterUser();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error('Error loading countries:', error);
      }
    };

    loadCountries();
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = e.target.value;
    setCountryCode(selectedCountryCode);

    const selectedCountry = countries.find((country: any) => country.cca2 === selectedCountryCode);
    if (selectedCountry) {
      setWhatsappCountryCode(selectedCountry.idd.root + selectedCountry.idd.suffixes[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await registerUser({
      name,
      email,
      password,
      role,
      phone: {
        number: phone,
        country_code: countryCode,
        region
      },
      whatsapp_country_code: whatsappCountryCode
    });

    if (success) {
      setTimeout(() => navigate('/login'), 1300);
    }
  };

  return (
    <div className="slide-form form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
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
          <FontAwesomeIcon icon={faPhone} />
          <input
            type="text"
            placeholder="Número"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
          <select
            value={countryCode}
            onChange={handleCountryChange}
            required
          >
            <option value="" disabled>Selecciona un país</option>
            {countries.map((country: any) => (
              <option key={country.cca2} value={country.cca2}>
                {country.name.common} <img src={country.flags.svg} alt={country.name.common} width="20" />
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faGlobe} />
          <input
            type="text"
            value={whatsappCountryCode}
            placeholder="Código de país para WhatsApp"
            readOnly
          />
        </div>
        <button type="submit">Registrarse</button>
        <button type="button" className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} /> 
        </button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default Register;
