import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import './ItemContainer.css';
import { useAuth } from '../Auth/AuthContext';
import { useProductFilter } from '../../hooks/useProductFilter';
import { useItems } from '../../contexts/ListContext';

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
  console.log("ItemContainer montado");
  const { items, loading, error, refreshItems } = useItems();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const { state } = useAuth();
  const { selectedBusinessId } = state;
  const { products: fetchedProducts, error: productError } = useProductFilter({ endpoint });

  useEffect(() => {
    console.log(`ItemContainer montado para ${itemName} con endpoint: ${endpoint}`);
    if (selectedBusinessId) {
      refreshItems(); // Solo se llama si hay un businessId seleccionado
    }
  }, [endpoint, refreshItems, selectedBusinessId, fetchedProducts, productError]);

  const handleItemSelect = (itemId: string, businessName: string) => {
    setSelectedItem(itemId);
    setBusinessName(businessName);
  };

  return (
    <div className="item-container">
      <div className="form-container">
        <ItemForm 
          endpoint={endpoint} 
          itemName={itemName} 
          fields={fields} 
          onRefresh={() => setSelectedItem(null)} 
          disabled={!selectedBusinessId} // Deshabilitar si no hay businessId
          {...(endpoint === 'sales' && fetchedProducts ? { products: fetchedProducts, productError } : {})}
        />
        {!selectedBusinessId && <p className="info-error">Por favor, selecciona un negocio antes de continuar.</p>}
      </div>
      <div className="list-container">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ItemList 
            endpoint={endpoint} 
            itemName={itemName} 
            onSelectItem={handleItemSelect} 
            disabled={!selectedBusinessId} // Deshabilitar funcionalidad de selección
          />
        )}
      </div>
      <div className="detail-container">
        <label>{businessName || 'No seleccionado'}</label>
        <label> ID: {selectedItem || 'No seleccionado'}</label>
      </div>
    </div>
  );
};

export default ItemContainer;
