import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const BusinessForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/businesses', { name, description });
      history.push('/business');
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
