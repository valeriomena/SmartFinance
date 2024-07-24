import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const CostDetail = () => {
  const { id } = useParams();
  const [cost, setCost] = useState(null);

  useEffect(() => {
    api.get(`/costs/${id}`)
      .then(response => setCost(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!cost) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Costo</h2>
      <p><strong>Tipo de Gasto:</strong> {cost.tipo_gasto}</p>
      <p><strong>Monto:</strong> {cost.monto}</p>
      {/* Otros detalles */}
    </div>
  );
};

export default CostDetail;
