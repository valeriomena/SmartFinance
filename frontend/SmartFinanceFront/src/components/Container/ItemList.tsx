import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useItems } from '../contexts/ListContext';
import { useAuth } from '@components/Auth/AuthContext';
import api from '../../services/api';

interface Item {
  _id: string;
  name: string;
}

interface ItemListProps {
  endpoint: string;
  itemName: string;
  onSelectItem: (itemId: string, itemName: string) => void;
  disabled: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, onSelectItem, disabled }) => {
  // Estado local para activar el contexto sólo cuando sea necesario
  const [contextActivated, setContextActivated] = useState(false);
  
  // Llamar a `useItems` solo si el contexto está activado
  const itemsContext = contextActivated ? useItems() : null;
  const { items, setItems, loading, error } = itemsContext || { items: [], setItems: () => {}, loading: false, error: null };
  
  const { state } = useAuth();
  const { selectedBusinessId, token, userId } = state;

  useEffect(() => {
    const fetchItems = async () => {
      if (!token || disabled) {
        console.error('Token no encontrado o funcionalidad deshabilitada');
        return;
      }

      let queryEndpoint = endpoint;
      if (selectedBusinessId) {
        queryEndpoint += `?businessId=${selectedBusinessId}`;
      } else if (userId) {
        queryEndpoint += `?userId=${userId}`;
      }

      try {
        const response = await api.get<Item[]>(queryEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        console.error('Hubo un error al cargar los elementos.', err);
      }
    };

    if (!disabled && contextActivated) {
      fetchItems();
    }
  }, [endpoint, userId, selectedBusinessId, token, setItems, disabled, contextActivated]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error al eliminar el ítem.', err);
    }
  };

  const handleEditClick = () => {
    setContextActivated(true);
  };

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <ul>
        {loading && <p>Cargando...</p>}
        {error && <p className="info-error">{error}</p>}
        {items.length === 0 && !loading && <p>No hay {itemName.toLowerCase()} disponibles.</p>}
        {items.map((item) => (
          <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', border: '1px solid #ddd', marginBottom: '5px' }}>
            <Link to={`/${itemName.toLowerCase()}/${item._id}`} onClick={() => !disabled && onSelectItem(item._id, item.name)} style={{ flex: 1 }}>
              {item.name}
            </Link>
            <div style={{ marginLeft: '10px' }}>
              <Link to={`/${itemName.toLowerCase()}/edit/${item._id}`} onClick={handleEditClick}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button onClick={() => handleDelete(item._id)} style={{ marginLeft: '10px' }} disabled={disabled}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && !loading && !selectedBusinessId && (
        <p>No hay información disponible.</p>
      )}
    </div>
  );
};

export default ItemList;
