import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date'; // Puedes expandir esto con más tipos
  required: boolean;
  validationMessage: string;
}

interface ItemContainerProps {
  endpoint: string;
  itemName: string;
  fields: Field[]; // Recibimos los campos dinámicamente
}

const ItemContainer: React.FC<ItemContainerProps> = ({ endpoint, itemName, fields }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Listado de elementos */}
      <div style={{ width: '30%', padding: '10px', borderRight: '2px solid #ccc' }}>
        <ItemList endpoint={endpoint} itemName={itemName} onSelectItem={handleItemSelect} />
      </div>

      {/* Detalle de un elemento (si existe un elemento seleccionado) */}
      <div style={{ width: '30%', padding: '10px', borderRight: '2px solid #ccc' }}>
        {selectedItem ? <ItemDetail endpoint={endpoint} itemName={itemName} /> : <p>Seleccione un {itemName.toLowerCase()} para ver los detalles.</p>}
      </div>

      {/* Formulario para agregar o editar un elemento */}
      <div style={{ width: '30%', padding: '10px' }}>
        <ItemForm endpoint={endpoint} itemName={itemName} fields={fields} />
      </div>
    </div>
  );
};

export default ItemContainer;
