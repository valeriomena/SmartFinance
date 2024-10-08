import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    api.get(`/businesses/${id}`)
      .then(response => setBusiness(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!business) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Negocio</h2>
      <p><strong>Nombre:</strong> {business.name}</p>
      <p><strong>Descripción:</strong> {business.description}</p>
      {/* Otros detalles */}
    </div>
  );
};

export default BusinessDetail;
