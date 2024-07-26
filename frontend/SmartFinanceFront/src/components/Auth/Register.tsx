import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css'; // Importa los estilos del formulario
import { fetchCountries } from '../../services/countryService'; // Importa el servicio

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [region, setRegion] = useState('');
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('');
  const [countries, setCountries] = useState<any[]>([]); // Estado para los países
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = e.target.value;
    setCountryCode(selectedCountryCode);

    // Buscar el país seleccionado en el array de países y actualizar el código de WhatsApp
    const selectedCountry = countries.find((country: any) => country.cca2 === selectedCountryCode);
    if (selectedCountry) {
      setWhatsappCountryCode(selectedCountry.idd.root + selectedCountry.idd.suffixes[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; phone?: string } = {};

    if (!validateEmail(email)) {
      errors.email = 'El correo electrónico no es válido.';
    }

    if (!validatePhone(phone)) {
      errors.phone = 'El número de teléfono no es válido.';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      await api.post('/auth/register', {
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
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
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
            onChange={(e) => setWhatsappCountryCode(e.target.value)}
            placeholder="Código de país para WhatsApp"
            required
            readOnly
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
