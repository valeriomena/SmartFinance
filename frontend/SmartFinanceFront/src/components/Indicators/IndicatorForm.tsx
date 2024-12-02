import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazar useHistory con useNavigate
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faCalendarDay, faDollarSign, faChartLine, faBalanceScale, faChartPie, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css'; // Importa los estilos del formulario

const IndicatorForm: React.FC = () => {
  const [businessId, setBusinessId] = useState('');
  const [fecha, setFecha] = useState('');
  const [beneficioBruto, setBeneficioBruto] = useState('');
  const [beneficioNeto, setBeneficioNeto] = useState('');
  const [margenBeneficioBruto, setMargenBeneficioBruto] = useState('');
  const [margenBeneficioNeto, setMargenBeneficioNeto] = useState('');
  const [puntoEquilibrio, setPuntoEquilibrio] = useState('');
  const [rotacionInventario, setRotacionInventario] = useState('');
  const [ratioLiquidez, setRatioLiquidez] = useState('');
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/indicators', {
        businessId,
        fecha,
        beneficio_bruto: beneficioBruto,
        beneficio_neto: beneficioNeto,
        margen_beneficio_bruto: margenBeneficioBruto,
        margen_beneficio_neto: margenBeneficioNeto,
        punto_equilibrio: puntoEquilibrio,
        rotacion_inventario: rotacionInventario,
        ratio_liquidez: ratioLiquidez
      });
      navigate('/indicators'); // Usar navigate en lugar de history.push
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Indicador</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faBusinessTime} />
          <input
            type="text"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            placeholder="ID del negocio"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faCalendarDay} />
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            placeholder="Fecha"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faDollarSign} />
          <input
            type="number"
            value={beneficioBruto}
            onChange={(e) => setBeneficioBruto(e.target.value)}
            placeholder="Beneficio Bruto"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faDollarSign} />
          <input
            type="number"
            value={beneficioNeto}
            onChange={(e) => setBeneficioNeto(e.target.value)}
            placeholder="Beneficio Neto"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faChartLine} />
          <input
            type="number"
            value={margenBeneficioBruto}
            onChange={(e) => setMargenBeneficioBruto(e.target.value)}
            placeholder="Margen Beneficio Bruto"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faChartLine} />
          <input
            type="number"
            value={margenBeneficioNeto}
            onChange={(e) => setMargenBeneficioNeto(e.target.value)}
            placeholder="Margen Beneficio Neto"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faBalanceScale} />
          <input
            type="number"
            value={puntoEquilibrio}
            onChange={(e) => setPuntoEquilibrio(e.target.value)}
            placeholder="Punto de Equilibrio"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faChartPie} />
          <input
            type="number"
            value={rotacionInventario}
            onChange={(e) => setRotacionInventario(e.target.value)}
            placeholder="Rotación de Inventario"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faCashRegister} />
          <input
            type="number"
            value={ratioLiquidez}
            onChange={(e) => setRatioLiquidez(e.target.value)}
            placeholder="Ratio de Liquidez"
            required
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default IndicatorForm;
