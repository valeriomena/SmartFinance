import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useItemManager } from '../../hooks/useItemManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css'; // Importa los estilos del formulario

interface ItemFormProps {
  endpoint: string;
  itemName: string;
  fields: any[];
  userId: string | null;
  onRefresh: () => void; // Añadir la prop de refresco
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, userId, onRefresh }) => {
  const { id } = useParams();
  const { itemData, loading, errorMessage, submitItem, fetchItemById } = useItemManager({
    endpoint,
    itemName,
    userId
  });

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (id) {
      fetchItemById(id);
    }
  }, [id, fetchItemById]);

  useEffect(() => {
    if (itemData) {
      setFormData(itemData);
    }
  }, [itemData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitItem(formData, id, false); // No navegar después de la actualización
    onRefresh(); // Llamar a la función de refresco
  };

  if (loading) return <p>Cargando...</p>;
  if (errorMessage) return <p className="info-error">{errorMessage}</p>;

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
          />
          {field.required && !formData[field.name] && <p>{field.validationMessage}</p>}
        </div>
      ))}
      <button type="submit">
        <FontAwesomeIcon icon={faSave} />
      </button>
    </form>
  );
};

export default ItemForm;
