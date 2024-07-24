import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const IndicatorDetail = () => {
  const { id } = useParams();
  const [indicator, setIndicator] = useState(null);

  useEffect(() => {
    api.get(`/indicators/${id}`)
      .then(response => setIndicator(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!indicator) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Indicador</h2>
      <p><strong>Fecha:</strong> {indicator.fecha}</p>
      <p><strong>Beneficio Bruto:</strong> {indicator.beneficio_bruto}</p>
      <p><strong>Beneficio Neto:</strong> {indicator.beneficio_neto}</p>
      <p><strong>Margen Beneficio Bruto:</strong> {indicator.margen_beneficio_bruto}</p>
      <p><strong>Margen Beneficio Neto:</strong> {indicator.margen_beneficio_neto}</p>
      <p><strong>Punto de Equilibrio:</strong> {indicator.punto_equilibrio}</p>
      <p><strong>Rotación de Inventario:</strong> {indicator.rotacion_inventario}</p>
      <p><strong>Ratio de Liquidez:</strong> {indicator.ratio_liquidez}</p>
    </div>
  );
};

export default IndicatorDetail;
