import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

interface Cost {
  tipo_gasto: string;
  monto: number;
}

const CostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cost, setCost] = useState<Cost | null>(null);

  useEffect(() => {
    const fetchCost = async () => {
      try {
        const response = await api.get(`/costs/${id}`);
        setCost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCost();
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
