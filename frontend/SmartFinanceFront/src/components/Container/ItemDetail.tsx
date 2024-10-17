import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

interface ItemDetailProps {
  endpoint: string;
  itemName: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ endpoint, itemName }) => {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    api.get(`${endpoint}/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error(error));
  }, [id, endpoint]);

  if (!item) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles de {itemName}</h2>
      <p><strong>Nombre:</strong> {item.name}</p>
      <p><strong>Descripción:</strong> {item.description}</p>
      {/* Otros detalles */}
    </div>
  );
};

export default ItemDetail;
