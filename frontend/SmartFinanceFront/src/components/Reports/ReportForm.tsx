import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faCalendarDay, faDollarSign, faChartLine, faCashRegister, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css'; // Importa los estilos del formulario

const ReportForm: React.FC = () => {
  const [businessId, setBusinessId] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [ingresos, setIngresos] = useState('');
  const [costos, setCostos] = useState('');
  const [gastosOperativos, setGastosOperativos] = useState('');
  const [gastosFinancieros, setGastosFinancieros] = useState('');
  const [beneficioBruto, setBeneficioBruto] = useState('');
  const [beneficioNeto, setBeneficioNeto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/reports', {
        businessId,
        periodo,
        ingresos,
        costos,
        gastos_operativos: gastosOperativos,
        gastos_financieros: gastosFinancieros,
        beneficio_bruto: beneficioBruto,
        beneficio_neto: beneficioNeto
      });
      navigate('/reports');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Reporte</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="input-group">
          <FontAwesomeIcon icon={faCalendarDay} />
          <input
            type="text"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            placeholder="Periodo"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faDollarSign} />
          <input
            type="number"
            value={ingresos}
            onChange={(e) => setIngresos(e.target.value)}
            placeholder="Ingresos"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faCashRegister} />
          <input
            type="number"
            value={costos}
            onChange={(e) => setCostos(e.target.value)}
            placeholder="Costos"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faChartLine} />
          <input
            type="number"
            value={gastosOperativos}
            onChange={(e) => setGastosOperativos(e.target.value)}
            placeholder="Gastos Operativos"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faPiggyBank} />
          <input
            type="number"
            value={gastosFinancieros}
            onChange={(e) => setGastosFinancieros(e.target.value)}
            placeholder="Gastos Financieros"
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
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ReportForm;
