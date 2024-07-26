import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTag, faDollarSign, faStore } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css'; // Importa los estilos del formulario

const ProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [businessId, setBusinessId] = useState('');
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, description, price, businessId });
      navigate('/products'); // Usar navigate en lugar de history.push
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faBox} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faTag} />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del producto"
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faDollarSign} />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faStore} />
          <input
            type="text"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            placeholder="ID del negocio"
            required
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ProductForm;
