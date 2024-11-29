import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import './ItemContainer.css';
import { useEndpoint } from '../../contexts/EndpointContext';

// Definimos la interfaz de los campos de formulario (Field)
interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date';
  required: boolean;
  validationMessage: string;
}

// Definimos la interfaz para el componente ItemContainer
interface ItemContainerProps {
  endpoint: string;
  itemName: string;
  fields: Field[];
}

// Componente principal de ItemContainer
const ItemContainer: React.FC<ItemContainerProps> = ({ endpoint, itemName, fields }) => {
  // Estado para manejar el ítem seleccionado y el nombre del negocio
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);

  // Accedemos al contexto del negocio seleccionado
  const { selectedBusinessId, setSelectedBusinessId } = useEndpoint();

  // Actualizamos selectedItem cuando cambia selectedBusinessId
  useEffect(() => {
    if (selectedBusinessId) {
      setSelectedItem(selectedBusinessId);
    }
  }, [selectedBusinessId]);

  // Función para manejar la selección de un ítem desde ItemList
  const handleItemSelect = (itemId: string, businessName: string) => {
    console.log('Seleccionando ítem:', itemId, businessName);
    setSelectedItem(itemId); // Establecemos el ítem seleccionado
    setBusinessName(businessName); // Establecemos el nombre del negocio
    setSelectedBusinessId(itemId); // Actualizamos el selectedBusinessId en el contexto
    console.log('selectedBusinessId actualizado:', itemId);
  };

  return (
    <div className="item-container">
      {/* Formulario donde se pasará selectedItem y las demás props */}
      <div className="form-container">
        <ItemForm 
          endpoint={endpoint} 
          itemName={itemName} 
          fields={fields} 
          onRefresh={() => setSelectedItem(null)} // Función para limpiar selectedItem
          selectedItem={selectedItem} // Pasamos selectedItem al formulario
        />
      </div>

      {/* Lista de ítems donde se seleccionan los ítems */}
      <div className="list-container">
        <ItemList 
          endpoint={endpoint} 
          itemName={itemName} 
          onSelectItem={handleItemSelect} // Pasamos la función para seleccionar ítem
        />
      </div>

      {/* Detalle del negocio e ítem seleccionado */}
      <div className="detail-container">
        <label>{businessName || 'No seleccionado'}</label>
        <label> ID: {selectedItem || 'No seleccionado'}</label>
      </div>
    </div>
  );
};

export default ItemContainer;
