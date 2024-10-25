import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface ItemDetailProps {
  endpoint: string;
  itemId: string;
  itemName: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ endpoint, itemId, itemName }) => {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`${endpoint}/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItem(response.data);
      } catch (error) {
        console.error('Error al cargar los detalles del ítem:', error);
      }
    };
    fetchItem();
  }, [endpoint, itemId]);

  if (!item) {
    return <p>Cargando detalles del {itemName.toLowerCase()}...</p>;
  }

  return (
     <h2>{item.name}</h2>
  );
};

export default ItemDetail;
