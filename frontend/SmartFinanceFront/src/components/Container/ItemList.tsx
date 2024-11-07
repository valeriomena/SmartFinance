// ItemList.tsx
import React, { useEffect } from 'react';
import { useItemManager } from '../../hooks/useItemManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ItemDetail from './ItemDetail';

interface ItemListProps {
  endpoint: string;
  itemName: string;
  onSelectItem: (itemId: string, businessName: string) => void; // Agregamos onSelectItem
}

const ItemList: React.FC<ItemListProps> = ({ endpoint, itemName, onSelectItem }) => {
  const { items, selectedItem, loading, errorMessage, fetchItems, fetchItemById, deleteItem } = useItemManager(itemName, endpoint);

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleSelectItem = (itemId: string, businessName: string) => {
    fetchItemById(itemId); // Llama para obtener detalles del ítem
    onSelectItem(itemId, businessName); // Llamamos onSelectItem aquí
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
      {selectedItem && <ItemDetail item={selectedItem} />} {/* Mostrar detalles */}
    </div>
  );
};

export default ItemList;
