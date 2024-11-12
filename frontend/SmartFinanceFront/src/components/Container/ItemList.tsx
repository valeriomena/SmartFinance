import React, { useEffect } from 'react';
import { useItemManager } from '../../hooks/useItemManager';
import { useEndpoint } from '../../contexts/EndpointContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ItemDetail from './ItemDetail';

interface ItemListProps {
  endpoint: string;
  itemName: string;
  onSelectItem: (itemId: string, businessName: string) => void; // Aquí se define onSelectItem
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, onSelectItem }) => {
  const { items, selectedItem, loading, errorMessage, fetchItems, fetchItemById, deleteItem, setSelectedItem } = useItemManager(itemName);
  const { setSelectedBusinessId } = useEndpoint(); 

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleSelectItem = (itemId: string, businessName: string) => {
    // Verifica si el endpoint es '/api/businesses' antes de actualizar el ID del negocio
    if (endpoint === '/api/businesses') {
      setSelectedBusinessId(itemId);  // Guarda el ID del negocio seleccionado
      fetchItemById(itemId); // Obtiene los detalles del negocio
    }
    // Llamar la función onSelectItem si se pasa a través de props
    onSelectItem(itemId, businessName);
  };

  const handleClearSelection = () => {
    setSelectedItem(null); // Limpia el ítem seleccionado
  };

  return (
    <div>
      <h2>Lista de {itemName}</h2>
      <ul>
        {loading && <p>Cargando...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {items.length === 0 && !loading && <p>No hay {itemName.toLowerCase()} disponibles.</p>}
        {items.map((item) => (
          <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
            <span onClick={() => handleSelectItem(item._id, item.name)} style={{ cursor: 'pointer' }}>
              {item.name}
            </span>
            <button onClick={() => deleteItem(item._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
      {/* Mostrar detalles del ítem seleccionado */}
      {selectedItem && (
        <>
          <ItemDetail selectedItem={selectedItem} />
          <button onClick={handleClearSelection}>Limpiar selección</button>
        </>
      )}
    </div>
  );
};

export default ItemList;
