import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faTag, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css'; // Importa los estilos del formulario

const CostForm: React.FC = () => {
  const [businessId, setBusinessId] = useState('');
  const [tipoGasto, setTipoGasto] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/costs', { businessId, tipo_gasto: tipoGasto, monto });
      navigate('/costs');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Costo</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faBuilding} />
          <input
            type="text"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            placeholder="ID del negocio"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faTag} />
          <input
            type="text"
            value={tipoGasto}
            onChange={(e) => setTipoGasto(e.target.value)}
            placeholder="Tipo de gasto"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faDollarSign} />
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Monto"
            required
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CostForm;
