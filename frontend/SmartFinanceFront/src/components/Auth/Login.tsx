import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Auth/AuthContext';  
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

/**
 * Props for the Login component.
 */
interface LoginProps {
  /** Function to close the login form. */
  onClose: () => void;
}

/**
 * Interface for the response from the login API.
 */
interface LoginResponse {
  token: string;
  userId: string;
}

/**
 * Login component allows users to log into the application.
 * It handles form submission, calls the API for login, and manages error states.
 * 
 * @component
 * @example
 * const handleClose = () => { console.log('Closed!'); }
 * return (
 *   <Login onClose={handleClose} />
 * );
 * 
 * @param {LoginProps} props - The component props.
 * @returns {JSX.Element} - Rendered Login component.
 */
const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Error state
  const navigate = useNavigate();

  // Obtener la función login del contexto
  const { login } = useAuth();

  /**
   * Handle form submission for login.
   * This function sends the login data to the API and handles responses.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Reset previous error message

    try {
      const response = await api.post<LoginResponse>('/api/users/login', { email, password });

      // Save token and user ID in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      // Update auth context
      login(response.data.token, response.data.userId);

      // Redirect and close the form
      navigate('/');
      onClose();

    } catch (error: any) {
      // Comprobamos las propiedades del error
      if (error.response) {
        // Error con respuesta del servidor
        setErrorMessage('Error en el inicio de sesión. Verifica tus credenciales.');
      } else if (error.request) {
        // Error sin respuesta del servidor
        setErrorMessage('No se recibió respuesta del servidor.');
      } else {
        // Otro tipo de error
        setErrorMessage('Ocurrió un error inesperado. Inténtalo nuevamente.');
      }
    }
  };

  return (
    <div className="slide-form login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
        <button type="button" className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} /> 
        </button>
      </form>

      {/* Show error message if exists */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
