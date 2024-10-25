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
  const [businessName, setBusinessName] = useState<string | null>(null);
  const userId = localStorage.getItem('userId');
  const { state } = useAuth();

  // Manejar la selección de un ítem
  const handleItemSelect = (itemId: string, businessName: string) => {
    setSelectedItem(itemId);
    setBusinessName(businessName);  // Guardar el nombre del negocio seleccionado
    localStorage.setItem('selectedBusinessId', itemId);
    localStorage.setItem('selectedBusinessName', businessName);
  };

  useEffect(() => {
    const storedBusinessName = localStorage.getItem('selectedBusinessName');
    const storedBusinessId = localStorage.getItem('selectedBusinessId');
    if (storedBusinessId) setSelectedItem(storedBusinessId);
    if (storedBusinessName) setBusinessName(storedBusinessName);
  }, []);

  return (
    <div className="item-container">
      <div className="form-container">
        <ItemForm 
          endpoint={endpoint} 
          itemName={itemName} 
          fields={fields} 
          userId={userId} 
          onRefresh={() => setSelectedItem(null)} 
        />
      </div>
      <div className="list-container">
        <ItemList 
          endpoint={endpoint} 
          itemName={itemName} 
          userId={userId} 
          onSelectItem={handleItemSelect} 
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
