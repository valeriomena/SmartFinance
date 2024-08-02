import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css';
import '../../styles/SlideForm.css';

interface SetPriceProps {
  setPrice: (price: string) => void;
  onClose: () => void;
}

const SetPrice: React.FC<SetPriceProps> = ({ setPrice, onClose }) => {
  const [variableCosts, setVariableCosts] = useState<number>(0);
  const [contributionMargin, setContributionMargin] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number | null>(null);
  const [competitorPrice, setCompetitorPrice] = useState<number | null>(null);
  const [priceComparison, setPriceComparison] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const calculateSellingPrice = () => {
    if (contributionMargin >= 100) {
      setInfoMessage("El margen de contribución debe ser menor que 100%");
      return;
    }
    const price = (variableCosts / (100 - contributionMargin)) * 100;
    setSellingPrice(price);
    setPrice(price.toFixed(2));
    if (competitorPrice !== null) {
      const percentageDifference = ((price - competitorPrice) / competitorPrice) * 100;
      setPriceComparison(percentageDifference.toFixed(2));
    }
  };

  return (
    <div className="slide-form-container show">
      <div className="form-container">
        <div className="form-header">
          <h2>Calculadora de precios</h2>
          <button onClick={onClose} className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateSellingPrice();
          }}
        >
          <div className="input-group">
            <label>
              Costos Variables
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Introduce los costos variables por unidad. Los costos variables son aquellos gastos que cambian en proporción directa con el nivel de producción o ventas de una empresa. Ejemplos comunes incluyen el costo de materias primas, mano de obra directa, y comisiones de ventas, los cuales aumentan o disminuyen según la cantidad de bienes o servicios producidos.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={variableCosts}
              onChange={(e) => setVariableCosts(Number(e.target.value))}
              placeholder="Enter variable costs"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Porcentaje que desea ganar (%)
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Introduce el margen de contribución deseado (en %) El margen de ganancia es el porcentaje de ingresos que excede los costos de producción, representando la rentabilidad de un producto o servicio.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={contributionMargin}
              onChange={(e) => setContributionMargin(Number(e.target.value))}
              placeholder="Enter contribution margin"
              required
            />
          </div>
          <div className="input-group">
            <label>
              Precio de la competencia
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="info-icon"
                onMouseEnter={() => setInfoMessage("Introduce el precio del competidor. Conocer los precios de la competencia es esencial para establecer una estrategia de precios competitiva, garantizar que los productos o servicios ofrezcan valor y atraer clientes, y para posicionar adecuadamente en el mercado. Esto ayuda a evitar precios demasiado altos que desincentiven la compra o demasiado bajos que reduzcan las ganancias.")}
                onMouseLeave={() => setInfoMessage(null)}
              />
            </label>
            <input
              type="number"
              value={competitorPrice || ''}
              onChange={(e) => setCompetitorPrice(Number(e.target.value))}
              placeholder="Enter competitor price"
            />
          </div>
          <button type="submit">Calcular Precio</button>
          {sellingPrice !== null && (
            <div className="result">
              <p>Selling Price: ${sellingPrice.toFixed(2)}</p>
              {priceComparison !== null && (
                <p style={{ color: Number(priceComparison) < 0 ? 'blue' : 'red' }}>
                  {Number(priceComparison) < 0 ? `Better by ${-Number(priceComparison)}%` : `Higher by ${Number(priceComparison)}%`}
                </p>
              )}
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

export default SetPrice;
