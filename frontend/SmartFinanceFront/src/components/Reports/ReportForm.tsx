import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazar useHistory con useNavigate
import api from '../../services/api';

const ReportForm: React.FC = () => {
  const [businessId, setBusinessId] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [ingresos, setIngresos] = useState('');
  const [costos, setCostos] = useState('');
  const [gastosOperativos, setGastosOperativos] = useState('');
  const [gastosFinancieros, setGastosFinancieros] = useState('');
  const [beneficioBruto, setBeneficioBruto] = useState('');
  const [beneficioNeto, setBeneficioNeto] = useState('');
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

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
      navigate('/reports'); // Usar navigate en lugar de history.push
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Reporte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Negocio:</label>
          <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} required />
        </div>
        <div>
          <label>Periodo:</label>
          <input type="text" value={periodo} onChange={(e) => setPeriodo(e.target.value)} required />
        </div>
        <div>
          <label>Ingresos:</label>
          <input type="number" value={ingresos} onChange={(e) => setIngresos(e.target.value)} required />
        </div>
        <div>
          <label>Costos:</label>
          <input type="number" value={costos} onChange={(e) => setCostos(e.target.value)} required />
        </div>
        <div>
          <label>Gastos Operativos:</label>
          <input type="number" value={gastosOperativos} onChange={(e) => setGastosOperativos(e.target.value)} required />
        </div>
        <div>
          <label>Gastos Financieros:</label>
          <input type="number" value={gastosFinancieros} onChange={(e) => setGastosFinancieros(e.target.value)} required />
        </div>
        <div>
          <label>Beneficio Bruto:</label>
          <input type="number" value={beneficioBruto} onChange={(e) => setBeneficioBruto(e.target.value)} required />
        </div>
        <div>
          <label>Beneficio Neto:</label>
          <input type="number" value={beneficioNeto} onChange={(e) => setBeneficioNeto(e.target.value)} required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ReportForm;
