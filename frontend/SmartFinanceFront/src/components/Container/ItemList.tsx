import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useItemManager } from '../../hooks/useItemManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

interface Item {
  _id: string;
  name: string;
}

interface ItemListProps {
  endpoint: string;
  itemName: string;
  userId: string | null;
  refresh: boolean; // Añadir prop para controlar la actualización
  onSelectItem: (itemId: string) => void; // Añadir la prop para manejar la selección de un ítem
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, userId, refresh, onSelectItem }) => {
  const [items, setItems] = useState<Item[]>([]);
  const { loading, errorMessage, deleteItem } = useItemManager({ endpoint, itemName, userId });

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
          console.error('Hubo un error al cargar los elementos.');
        }
      }
    };
    fetchItems();
  }, [endpoint, userId, refresh]); // Agregar `refresh` como dependencia

  const handleDelete = (id: string) => {
    deleteItem(id);
    setItems(prevItems => prevItems.filter(item => item._id !== id)); // Actualizar la lista localmente
  };

  if (loading) return <p>Cargando...</p>;
  if (errorMessage) return <p className="info-error">{errorMessage}</p>;

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', border: '1px solid #ddd', marginBottom: '5px' }}>
            <Link to={`/${itemName.toLowerCase()}/${item._id}`} onClick={() => onSelectItem(item._id)} style={{ flex: 1 }}>{item.name}</Link>
            <div style={{ marginLeft: '10px' }}>
              <Link to={`/${itemName.toLowerCase()}/edit/${item._id}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button onClick={() => handleDelete(item._id)} style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
