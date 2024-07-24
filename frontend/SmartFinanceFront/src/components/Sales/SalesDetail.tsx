import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const SalesDetail = () => {
  const { id } = useParams();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    api.get(`/sales/${id}`)
      .then(response => setSale(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!sale) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles de la Venta</h2>
      <p><strong>Fecha:</strong> {sale.fecha}</p>
      <p><strong>Precio Venta:</strong> {sale.precio_venta}</p>
      <p><strong>Cantidad Vendida:</strong> {sale.cantidad_vendida}</p>
      <p><strong>Ingreso Total:</strong> {sale.ingreso_total}</p>
      {/* Otros detalles */}
    </div>
  );
};

export default SalesDetail;
