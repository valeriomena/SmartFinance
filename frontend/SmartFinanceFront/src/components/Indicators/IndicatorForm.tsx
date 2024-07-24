import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazar useHistory con useNavigate
import api from '../../services/api';

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
    <div>
      <h2>Crear Nuevo Indicador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Negocio:</label>
          <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} required />
        </div>
        <div>
          <label>Fecha:</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </div>
        <div>
          <label>Beneficio Bruto:</label>
          <input type="number" value={beneficioBruto} onChange={(e) => setBeneficioBruto(e.target.value)} required />
        </div>
        <div>
          <label>Beneficio Neto:</label>
          <input type="number" value={beneficioNeto} onChange={(e) => setBeneficioNeto(e.target.value)} required />
        </div>
        <div>
          <label>Margen Beneficio Bruto:</label>
          <input type="number" value={margenBeneficioBruto} onChange={(e) => setMargenBeneficioBruto(e.target.value)} required />
        </div>
        <div>
          <label>Margen Beneficio Neto:</label>
          <input type="number" value={margenBeneficioNeto} onChange={(e) => setMargenBeneficioNeto(e.target.value)} required />
        </div>
        <div>
          <label>Punto de Equilibrio:</label>
          <input type="number" value={puntoEquilibrio} onChange={(e) => setPuntoEquilibrio(e.target.value)} required />
        </div>
        <div>
          <label>Rotación de Inventario:</label>
          <input type="number" value={rotacionInventario} onChange={(e) => setRotacionInventario(e.target.value)} required />
        </div>
        <div>
          <label>Ratio de Liquidez:</label>
          <input type="number" value={ratioLiquidez} onChange={(e) => setRatioLiquidez(e.target.value)} required />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default IndicatorForm;
