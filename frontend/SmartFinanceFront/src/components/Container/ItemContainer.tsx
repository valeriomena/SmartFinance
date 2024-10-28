// ItemContainer.tsx
import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
import './ItemContainer.css';
import { useAuth } from '../Auth/AuthContext';
import { useProductFilter } from '../../hooks/useProductFilter';

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
  const { state, setSelectedBusinessId } = useAuth();
  const { products: fetchedProducts, error: productError } = useProductFilter({ endpoint });

  useEffect(() => {
    console.log("ItemContainer rendered with:", { endpoint, itemName, fields, selectedItem, businessName });

    // Manejo de selección de negocio desde el contexto
    const storedBusinessId = state.selectedBusinessId;
    if (storedBusinessId) {
      setSelectedItem(storedBusinessId);
    }

    // Verifica productos cuando el endpoint es 'sales'
    if (endpoint === 'sales') {
      console.log("Productos obtenidos para ventas:", { fetchedProducts, productError });
    }
  }, [endpoint, state.selectedBusinessId, fetchedProducts, productError]);

  const handleItemSelect = (itemId: string, businessName: string) => {
    setSelectedItem(itemId);
    setBusinessName(businessName);
    setSelectedBusinessId(itemId); // Actualiza `selectedBusinessId` en el contexto
  };

  return (
    <div className="item-container">
      <div className="form-container">
        <ItemForm 
          endpoint={endpoint} 
          itemName={itemName} 
          fields={fields} 
          onRefresh={() => setSelectedItem(null)} 
          {...(endpoint === 'sales' && fetchedProducts ? { products: fetchedProducts, productError } : {})}
        />
      </div>
      <div className="list-container">
        <ItemList 
          endpoint={endpoint} 
          itemName={itemName} 
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
