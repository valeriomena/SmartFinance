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
  const { state } = useAuth();

  useEffect(() => {
    // Reiniciar el item seleccionado cuando cambie el ID del negocio
    setSelectedItem(null);
  }, [state.selectedBusinessId]);

  return (
    <div className="item-container">
      <div className="form-container">
        <ItemForm 
          endpoint={endpoint} 
          itemName={itemName} 
          fields={fields} 
          userId={state.userId} 
          onRefresh={() => setSelectedItem(null)} 
        />
      </div>
      <div className="list-container">
        <ItemList 
          endpoint={endpoint} 
          itemName={itemName} 
          userId={state.userId} 
          onSelectItem={(id, name) => setSelectedItem(id)}
        />
      </div>
      <div className="detail-container">
        <label>{state.selectedBusinessId ? `ID de negocio: ${state.selectedBusinessId}` : 'Negocio no seleccionado'}</label>
      </div>
    </div>
  );
};

export default ItemContainer;
