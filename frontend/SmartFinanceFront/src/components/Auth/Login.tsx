import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';
import '../../styles/Form.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      // Aquí iría tu llamada al backend para autenticar
      const token = 'dummyToken';
      const userId = 'dummyUserId';

      // Simulación de inicio de sesión exitoso
      login(token, userId);
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="slide-form login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
