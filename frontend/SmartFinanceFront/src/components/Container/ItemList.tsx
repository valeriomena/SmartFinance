import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useItemManager } from '../../hooks/useItemManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import { useAuth } from '@components/Auth/AuthContext';

interface Item {
  _id: string;
  name: string;
}

interface ItemListProps {
  endpoint: string;
  itemName: string;
  userId: string | null;
  onSelectItem: (itemId: string, itemName: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, userId, onSelectItem }) => {
  const [items, setItems] = useState<Item[]>([]);
  const { loading, errorMessage, deleteItem } = useItemManager({ endpoint, itemName, userId });
  const { state, login } = useAuth();
  const { selectedBusinessId } = state;

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get<Item[]>(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        console.error('Hubo un error al cargar los elementos.', err);
      }
    };

    fetchItems();
  }, [endpoint, userId, selectedBusinessId]);

  const handleDelete = (id: string) => {
    deleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleSelectItem = (itemId: string, itemName: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      onSelectItem(itemId, itemName); // Llamada al padre
      login(state.token!, state.userId!, itemId); // Actualiza selectedBusinessId
    } else {
      console.error('Token no encontrado');
    }
  };

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <ul>
        {loading && <p>Cargando...</p>}
        {errorMessage && <p className="info-error">{errorMessage}</p>}
        {items.length === 0 && !loading && <p>No hay {itemName.toLowerCase()} disponibles.</p>}
        {items.map((item) => (
          <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', border: '1px solid #ddd', marginBottom: '5px' }}>
            <Link to={`/${itemName.toLowerCase()}/${item._id}`} onClick={() => handleSelectItem(item._id, item.name)} style={{ flex: 1 }}>
              {item.name}
            </Link>
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
