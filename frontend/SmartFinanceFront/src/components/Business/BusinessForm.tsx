import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazar useHistory con useNavigate
import api from '../../services/api';

const BusinessForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/businesses', { name, description });
      navigate('/business'); // Usar navigate en lugar de history.push
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Negocio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default BusinessForm;
