import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface LoginProps {
  onLoginSuccess: (token: string, userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null); // Clear any previous errors

    try {
      // Aquí se haría la solicitud al backend para autenticar
      const token = 'dummyToken';
      const userId = 'dummyUserId';

      // Simulación de inicio de sesión exitoso
      onLoginSuccess(token, userId);
      navigate('/');
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleOpenRegister = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <div className="slide-form login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
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

        <button type="submit">Iniciar Sesión</button>

        {/* Mostrar el mensaje de error si existe */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Botón para abrir el formulario de registro */}
        <button type="button" className="register-button" onClick={handleOpenRegister}>
          Registrarse
        </button>
      </form>

      {/* Renderizar el formulario de registro si showRegister es true */}
      {showRegister && <Register onClose={handleCloseRegister} />}
    </div>
  );
};

export default Login;
