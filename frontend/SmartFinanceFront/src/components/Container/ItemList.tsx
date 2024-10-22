import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'; 

interface Item {
  _id: string;
  name: string;
}

interface ItemListProps {
  endpoint: string;
  itemName: string;
  userId: string | null;
  onSelectItem: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, userId, onSelectItem }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchItems = async () => {
      if (userId) {
        try {
          const url = `${endpoint}?userId=${userId}`;
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await api.get<Item[]>(url, { headers });
          setItems(response.data);
        } catch (err) {
          // Manejo genérico de errores
          const errorMessage = 'Hubo un error al cargar los elementos.';
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No se proporcionó userId.');
        setLoading(false);
      }
    };

    fetchItems();
  }, [endpoint, userId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="info-error">{error}</p>;

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <Link to={`/${itemName.toLowerCase()}/new`}>Crear Nuevo {itemName}</Link>
      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            onClick={() => onSelectItem(item._id)}
            style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ddd', marginBottom: '5px' }}
          >
            <Link to={`/${itemName.toLowerCase()}/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
