import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
import './ItemContainer.css';
import { useAuth } from '../Auth/AuthContext';

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
  const userId = localStorage.getItem('userId'); // Obtener el userId de localStorage
  const { state } = useAuth(); // Obtener el estado del contexto

  // Manejar la selección de un ítem
  const handleItemSelect = (itemId: string, itemName: string) => {
    setSelectedItem(itemId);
    localStorage.setItem('selectedItem', itemId);
  };

  useEffect(() => {
    // Validar si hay un negocio seleccionado
    if (!state.selectedBusinessId) {
      console.warn('No se ha seleccionado ningún negocio.'); // Mensaje de advertencia
    }
  }, [state.selectedBusinessId]);

  return (
    <div className="item-container">
      <div className="form-container">
        <ItemForm 
          endpoint={endpoint} 
          itemName={itemName} 
          fields={fields} 
          userId={userId} // Pasar userId
          onRefresh={() => setSelectedItem(null)} // Función para refrescar el estado de selección
        />
      </div>
      <div className="list-container">
        <ItemList 
          endpoint={endpoint} 
          itemName={itemName} 
          userId={userId} // Pasar userId
          onSelectItem={handleItemSelect} 
        />
      </div>
      {selectedItem && (
        <div className="detail-container">
          <ItemDetail itemId={selectedItem} endpoint={endpoint} itemName={itemName} />
        </div>
      )}
    </div>
  );
};

export default ItemContainer;
