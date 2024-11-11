import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface LoginProps {
  onClose: () => void;
}

interface LoginResponse {
  token: string;
  userId: string;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      // Realiza la solicitud de autenticación al servidor
      const response = await api.post<LoginResponse>('/api/users/login', { email, password });
      const { token, userId } = response.data;

      // Guardar el token y userId en localStorage junto con la fecha de expiración
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // Expira en 1 día
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('tokenExpiration', expirationDate.toISOString());

      // Actualizar el contexto de autenticación
      login(token, userId);

      // Redirigir al usuario a la página principal y cerrar el formulario
      navigate('/');
      onClose();
    } catch (error: any) {
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
