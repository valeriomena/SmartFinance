import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

interface ItemListProps {
  endpoint: string;
  itemName: string;
  onSelectItem: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, onSelectItem }) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api.get(endpoint)
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, [endpoint]);

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <Link to={`/${itemName.toLowerCase()}/new`}>Crear Nuevo {itemName}</Link>
      <ul>
        {items.map((item: any) => (
          <li key={item._id} onClick={() => onSelectItem(item._id)} style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ddd', marginBottom: '5px' }}>
            <Link to={`/${itemName.toLowerCase()}/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
