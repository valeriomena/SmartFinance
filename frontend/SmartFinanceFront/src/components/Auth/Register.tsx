import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface RegisterProps {
  onClose: () => void; // Asegúrate de que onClose esté definido en las props
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await api.post('/api/users/register', { email, password });

      console.log('Response data:', response.data);
      console.log('Token:', response.data.token);
      console.log('User ID:', response.data.userId);

      // Almacenar el token y el ID de usuario en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      // Redirigir al inicio o a la ruta deseada
      navigate('/');

      // Cerrar el componente después de la redirección
      onClose();  // Llama a onClose después de la redirección

    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error status:', axiosError.response.status);
        console.error('Error data:', axiosError.response.data);
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
      } else {
        console.error('Error message:', axiosError.message);
      }
    }
  };

  return (
    <div className="slide-form register-container">
      <h2>Registrar</h2>
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
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        <button type="button" className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} /> 
        </button>
      </form>
    </div>
  );
};

export default Register;
