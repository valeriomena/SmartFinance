// src/components/Costs/CalculateFixedCosts.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface CalculateFixedCostsProps {
  onClose: () => void;
  onSubmit: (fixedCosts: number) => void;
}

const CalculateFixedCosts: React.FC<CalculateFixedCostsProps> = ({ onClose, onSubmit }) => {
  const [rent, setRent] = useState<number>(0);
  const [salaries, setSalaries] = useState<number>(0);
  const [utilities, setUtilities] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [totalFixedCosts, setTotalFixedCosts] = useState<number | null>(null);

  useEffect(() => {
    const total = rent + salaries + utilities + insurance + other;
    setTotalFixedCosts(total);
  }, [rent, salaries, utilities, insurance, other]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalFixedCosts !== null) {
      onSubmit(totalFixedCosts);
      onClose();
    }
  };

  return (
    <div className="slide-form-container show">
      <div className="form-container">
        <div className="form-header">
          <h2>Calculadora de Costos Fijos</h2>
          <button onClick={onClose} className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Alquiler
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Costo del alquiler mensual de las instalaciones.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              placeholder="Introduce el alquiler"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Salarios
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Salarios del personal fijo.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={salaries}
              onChange={(e) => setSalaries(Number(e.target.value))}
              placeholder="Introduce los salarios"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Servicios Públicos
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Gastos mensuales en servicios públicos (agua, luz, gas).")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={utilities}
              onChange={(e) => setUtilities(Number(e.target.value))}
              placeholder="Introduce los servicios públicos"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Seguro
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Costo del seguro mensual.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
              placeholder="Introduce el seguro"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Otros
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Otros gastos fijos mensuales.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={other}
              onChange={(e) => setOther(Number(e.target.value))}
              placeholder="Introduce otros gastos"
              required
            />
          </div>
          <button type="submit">Calcular Costos Fijos</button>
          {totalFixedCosts !== null && (
            <div className="result">
              <p>Total Costos Fijos: ${totalFixedCosts.toFixed(2)}</p>
            </div>
          )}
        </form>
        {infoMessage && (
          <div className="info-error">
            <label>{infoMessage}</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculateFixedCosts;
