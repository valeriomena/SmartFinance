import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Auth/AuthContext';
import ForgotPassword from '../Auth/ForgotPassword';
import Register from './Register';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await api.post('/api/users/login', { email, password });
      const { token, userId } = response.data;
      login(token, userId);
      navigate('/');
    } catch (error: any) {
      setErrorMessage('Credenciales incorrectas.');
    }
  };

  return (
    <div className="login-container">
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

        {/* Botón para abrir el formulario de registro */}
        <button type="button" onClick={() => setShowRegister(true)}>
          ¿No tienes una cuenta? Regístrate
        </button>

        <button type="button" onClick={() => setShowForgotPassword(true)}>
          ¿Olvidaste tu contraseña?
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      {/* Formulario de recuperación de contraseña */}
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}

      {/* Formulario de registro como modal */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Register onClose={() => setShowRegister(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
