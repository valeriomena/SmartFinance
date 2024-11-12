import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css';

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Especifica que el tipo del parámetro es string
  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault(); // Prevenir el envío del formulario

    try {
      const response = await fetch('http://localhost:4000/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Correo de restablecimiento enviado.');
        setErrorMessage(null);
      } else {
        setErrorMessage(data.message || 'Hubo un error al enviar el correo.');
        setMessage(null);
      }
    } catch (error) {
      setErrorMessage('Error al solicitar restablecimiento de contraseña');
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleForgotPassword}>
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
