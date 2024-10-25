import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

interface ItemDetailProps {
  endpoint: string;
  itemId: string; // Asegúrate de que esta propiedad esté definida
  itemName: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ endpoint, itemId, itemName }) => {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    api.get(`${endpoint}/${itemId}`) // Usa itemId en lugar de useParams
      .then(response => setItem(response.data))
      .catch(error => console.error(error));
  }, [itemId, endpoint]);

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
