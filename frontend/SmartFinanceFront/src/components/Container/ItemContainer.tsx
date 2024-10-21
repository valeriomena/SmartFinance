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

  // Al montar el componente, obtener el userId del localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    
    console.log(storedUserId); // Verificación del userId
    console.log(storedToken); // Verificación del token

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
  };

  return (
    <div className="item-container">
      <div className="form-container">
        {userId && (
          <ItemForm 
            endpoint={endpoint} 
            itemName={itemName} 
            fields={fields} 
            userId={userId} // Asegúrate de pasar el userId aquí
          />
        )}
      </div>
      <div className="list-container">
        {userId && ( // Verificamos que userId esté disponible
          <ItemList 
            endpoint={endpoint} 
            itemName={itemName} 
            userId={userId} // Pasar userId al componente ItemList
            onSelectItem={handleItemSelect} 
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
