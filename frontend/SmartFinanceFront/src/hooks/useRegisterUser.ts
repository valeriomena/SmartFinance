import { useState } from 'react';
import api from '../services/api'; // Ajusta el path según la ubicación correcta

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: {
    number: string;
    country_code: string;
    region: string;
  };
  whatsapp_country_code: string;
}

const useRegisterUser = () => {
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const registerUser = async (data: RegisterUserData) => {
    console.log('Datos recibidos en registerUser:', data);

    const { name, email, password, role, phone, whatsapp_country_code } = data;

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string) => /^\+?[1-9]\d{1,14}$/.test(phone);

    const newErrors: { email?: string; phone?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    if (!validatePhone(phone.number)) {
      newErrors.phone = 'El número de teléfono no es válido.';
    }

    if (Object.keys(newErrors).length > 0) {
      console.log('Errores de validación:', newErrors);
      setErrors(newErrors);
      return false;
    }

    try {
      console.log('Enviando datos a la API:', {
        name,
        email,
        password,
        role,
        phone,
        whatsapp_country_code
      });

      const response = await api.post('/api/users', {
        name,
        email,
        password,
        role,
        phone,
        whatsapp_country_code
      });

      console.log('Respuesta de la API:', response);

      setSuccessMessage('Usuario creado con éxito. Redirigiendo al inicio de sesión...');
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setErrors({ email: 'Error al crear el usuario.' });
      return false;
    }
  };

  return { registerUser, errors, successMessage };
};

export default useRegisterUser;
