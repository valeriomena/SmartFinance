import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
import './ItemContainer.css'; // Importamos los estilos

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date';
  required: boolean;
  validationMessage: string;
}

interface ItemContainerProps {
  endpoint: string;
  itemName: string;
  fields: Field[];
}

const ItemContainer: React.FC<ItemContainerProps> = ({ endpoint, itemName, fields }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false); // Estado para controlar la actualización de la lista

  // Al montar el componente, obtener el userId del localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
  };

  // Función para refrescar la lista
  const handleRefresh = () => {
    setRefresh(prev => !prev); // Cambiar el estado para forzar la re-renderización
  };

  return (
    <div className="item-container">
      <div className="form-container">
        {userId && (
          <ItemForm 
            endpoint={endpoint} 
            itemName={itemName} 
            fields={fields} 
            userId={userId} 
            onRefresh={handleRefresh} // Pasar la función de refresco
          />
        )}
      </div>
      <div className="list-container">
        {userId && (
          <ItemList 
            endpoint={endpoint} 
            itemName={itemName} 
            userId={userId} 
            onSelectItem={handleItemSelect} 
            refresh={refresh} // Pasar el estado de refresco
          />
        )}
        {selectedItem && (
          <div className="detail-container">
            <ItemDetail endpoint={endpoint} itemName={itemName} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemContainer;
