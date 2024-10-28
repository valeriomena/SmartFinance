// Login.tsx

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
 * @interface
 */
interface LoginProps {
  /** Function to close the login form. */
  onClose: () => void;
}

/**
 * Interface for the response from the login API.
 * @interface
 */
interface LoginResponse {
  /** Token received from the server upon successful login. */
  token: string;
  /** User ID of the authenticated user. */
  userId: string;
}

/**
 * The Login component renders a login form that allows users to authenticate
 * themselves by entering their email and password. On submission, it communicates
 * with the API, retrieves a token, and updates the authentication context.
 * Additionally, it handles error states and displays messages for failed login attempts.
 *
 * @component
 * @example
 * const handleClose = () => { console.log('Closed!'); };
 * return (
 *   <Login onClose={handleClose} />
 * );
 *
 * @param {LoginProps} props - The component props.
 * @param {() => void} props.onClose - Function to close the login form.
 * @returns {JSX.Element} Rendered Login component.
 */
const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');          // State to manage the email input
  const [password, setPassword] = useState('');     // State to manage the password input
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // State for error message
  const navigate = useNavigate();

  // Retrieve login function from the authentication context
  const { login } = useAuth();

  /**
   * Handles the form submission for login. This function sends the login data
   * (email and password) to the API, saves the token and user ID in localStorage,
   * updates the authentication context, and redirects the user.
   *
   * @async
   * @function
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
      // Set specific error message based on error type
      if (error.response) {
        setErrorMessage('Error en el inicio de sesión. Verifica tus credenciales.');
      } else if (error.request) {
        setErrorMessage('No se recibió respuesta del servidor.');
      } else {
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

      {/* Error message displayed if login fails */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
