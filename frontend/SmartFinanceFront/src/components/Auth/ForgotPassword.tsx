import React, { useState } from 'react';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css';

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await api.post('/api/users/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error: any) {
      setErrorMessage('No se pudo enviar el correo. Intenta nuevamente.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperar Contraseña</h2>
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
        <button type="submit">Enviar</button>
        {message && <p className="success-message">{message}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <span className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
