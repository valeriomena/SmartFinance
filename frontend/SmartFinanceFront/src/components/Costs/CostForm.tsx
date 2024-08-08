// src/components/Products/CostForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faTag, faDollarSign, faCalculator } from '@fortawesome/free-solid-svg-icons';
import CalculateFixedCosts from './CalculateFixedCosts';
import '../../styles/Form.css'; // Importa los estilos del formulario
import '../../styles/SlideForm.css'; // Importa los estilos del formulario deslizante

const CostForm: React.FC = () => {
  const [businessId, setBusinessId] = useState('');
  const [tipoGasto, setTipoGasto] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();
  const [showCalculateFixedCosts, setShowCalculateFixedCosts] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/costs', { businessId, tipo_gasto: tipoGasto, monto });
      navigate('/costs');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseCalculateFixedCosts = () => {
    setShowCalculateFixedCosts(false);
  };

  const handleFixedCostsSubmit = (costs: number) => {
    setMonto(costs.toFixed(2));
    setShowCalculateFixedCosts(false);
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
          <FontAwesomeIcon 
            icon={faCalculator} 
            className="info-icon" 
            onClick={() => setShowCalculateFixedCosts(!showCalculateFixedCosts)}
            onMouseEnter={() => setInfoMessage("Calculadora de ayuda para estimar los costos fijos de tu negocio.")}
            onMouseLeave={() => setInfoMessage(null)}
            title="Haz clic para calcular los costos fijos de tu negocio"
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
      {showCalculateFixedCosts && (
        <CalculateFixedCosts onClose={handleCloseCalculateFixedCosts} onSubmit={handleFixedCostsSubmit} />
      )}
      {infoMessage && (
          <div className="info-error">
            <label>{infoMessage}</label>
          </div>
        )}
    </div>
  );
};

export default CostForm;
