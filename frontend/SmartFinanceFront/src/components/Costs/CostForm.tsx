import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazar useHistory con useNavigate
import api from '../../services/api';

const CostForm: React.FC = () => {
  const [businessId, setBusinessId] = useState('');
  const [tipoGasto, setTipoGasto] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/costs', { businessId, tipo_gasto: tipoGasto, monto });
      navigate('/costs'); // Usar navigate en lugar de history.push
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Costo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Negocio:</label>
          <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} required />
        </div>
        <div>
          <label>Tipo de Gasto:</label>
          <input type="text" value={tipoGasto} onChange={(e) => setTipoGasto(e.target.value)} required />
        </div>
        <div>
          <label>Monto:</label>
          <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CostForm;
