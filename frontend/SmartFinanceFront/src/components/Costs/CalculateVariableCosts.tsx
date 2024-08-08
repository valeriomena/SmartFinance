import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface CalculateVariableCostsProps {
  onClose: () => void;
  onSubmit: (variableCosts: number) => void;
}

const CalculateVariableCosts: React.FC<CalculateVariableCostsProps> = ({ onClose, onSubmit }) => {
  const [materials, setMaterials] = useState<number>(0);
  const [directLabor, setDirectLabor] = useState<number>(0);
  const [commissions, setCommissions] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [packaging, setPackaging] = useState<number>(0);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [totalVariableCosts, setTotalVariableCosts] = useState<number | null>(null);

  useEffect(() => {
    const total = materials + directLabor + commissions + shipping + packaging;
    setTotalVariableCosts(total);
  }, [materials, directLabor, commissions, shipping, packaging]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalVariableCosts !== null) {
      onSubmit(totalVariableCosts);
      onClose();
    }
  };

  return (
    <div className="slide-form-container show">
      <div className="form-container">
        <div className="form-header">
          <h2>Calculadora de Costos Variables</h2>
          <button onClick={onClose} className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Materias Primas
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Materiales directos utilizados en la producción de bienes.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={materials}
              onChange={(e) => setMaterials(Number(e.target.value))}
              placeholder="Introduce las materias primas"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Mano de Obra Directa
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Costos laborales directamente asociados con la producción.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={directLabor}
              onChange={(e) => setDirectLabor(Number(e.target.value))}
              placeholder="Introduce la mano de obra directa"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Comisiones
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Pagos a vendedores basados en el volumen de ventas.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={commissions}
              onChange={(e) => setCommissions(Number(e.target.value))}
              placeholder="Introduce las comisiones"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Envío y Transporte
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Costos asociados con el envío de productos a los clientes.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={shipping}
              onChange={(e) => setShipping(Number(e.target.value))}
              placeholder="Introduce el envío y transporte"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Empaque
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Gastos de materiales y mano de obra para empaquetar productos.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={packaging}
              onChange={(e) => setPackaging(Number(e.target.value))}
              placeholder="Introduce el empaque"
              required
            />
          </div>
          <button type="submit">Calcular Costos Variables</button>
          {totalVariableCosts !== null && (
            <div className="result">
              <p>Total Costos Variables: ${totalVariableCosts.toFixed(2)}</p>
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

export default CalculateVariableCosts;
