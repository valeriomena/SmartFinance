import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import './ItemContainer.css';
import { useEndpoint } from '../../contexts/EndpointContext';

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
  const [businessName, setBusinessName] = useState<string | null>(null);
  const { selectedBusinessId, setSelectedBusinessId } = useEndpoint();

  // Al seleccionar un negocio, se actualiza el selectedItem y el endpoint
  useEffect(() => {
    if (selectedBusinessId) {
      setSelectedItem(selectedBusinessId);
    }
  }, [selectedBusinessId]);

  const handleItemSelect = (itemId: string, businessName: string) => {
    setSelectedItem(itemId);
    setBusinessName(businessName);
    setSelectedBusinessId(itemId);  // Aquí usamos el setSelectedBusinessId del EndpointContext
  };

  return (
    <div className="item-container">
      <div className="form-container">
        <ItemForm 
          endpoint={endpoint} 
          itemName={itemName} 
          fields={fields} 
          onRefresh={() => setSelectedItem(null)}
          selectedItem={selectedItem} // Pasamos selectedItem
        />
      </div>
      <div className="list-container">
        <ItemList 
          endpoint={endpoint} 
          itemName={itemName} 
          onSelectItem={handleItemSelect} // Pasamos onSelectItem
        />
      </div>
      <div className="detail-container">
        <label>{businessName || 'No seleccionado'}</label>
        <label> ID: {selectedItem || 'No seleccionado'}</label>
      </div>
    </div>
  );
};

export default ItemContainer;
