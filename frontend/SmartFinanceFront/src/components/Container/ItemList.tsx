import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

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

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Actualiza la lista después de eliminar
      setItems((prevItems) => prevItems.filter(item => item._id !== id));
    } catch (err) {
      setError('Error al eliminar el elemento.');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="info-error">{error}</p>;

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', border: '1px solid #ddd', marginBottom: '5px' }}>
            <Link to={`/${itemName.toLowerCase()}/${item._id}`} style={{ flex: 1 }}>{item.name}</Link>
            <div style={{ marginLeft: '10px' }}>
              <Link to={`/${itemName.toLowerCase()}/edit/${item._id}`}>
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px', cursor: 'pointer' }} />
              </Link>
              <FontAwesomeIcon 
                icon={faTrash} 
                onClick={() => handleDelete(item._id)} 
                style={{ cursor: 'pointer', color: 'red' }} 
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
