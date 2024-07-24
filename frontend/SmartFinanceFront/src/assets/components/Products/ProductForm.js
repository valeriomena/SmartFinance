import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [businessId, setBusinessId] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, description, price, businessId });
      history.push('/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Negocio:</label>
          <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ProductForm;
