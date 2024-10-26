import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useItemManager } from '../../hooks/useItemManager';
import { useAuth } from '@components/Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Form.css';

interface Field {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface ItemFormProps {
  endpoint: string;
  itemName: string;
  fields: Field[];
  userId: string | null;
  onRefresh: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, userId, onRefresh }) => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAuth();
  const { selectedBusinessId } = state;
  const { itemData, loading, errorMessage, submitItem, fetchItemById } = useItemManager({ endpoint, itemName, userId });

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (id) {
      fetchItemById(id);
    }
  }, [id, fetchItemById]);

  useEffect(() => {
    if (itemData) {
      setFormData(itemData);
    } else if (selectedBusinessId) {
      setFormData((prevData) => ({ ...prevData, businessId: selectedBusinessId }));
    }
  }, [itemData, selectedBusinessId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'price' && Number(value) < 0) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'El precio debe ser un número positivo.',
      }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(validationErrors).some((error) => error)) {
      return;
    }

    try {
      await submitItem(formData, id, false);
      onRefresh();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (errorMessage) return <p className="info-error">{errorMessage}</p>;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-header">
        <h2>{id ? `Editar ${itemName}` : `Crear Nuevo ${itemName}`}</h2>
      </div>
      {fields.map((field) => (
        <div key={field.name} className="input-group">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            disabled={field.name === 'businessId' && !!selectedBusinessId}
          />
          {validationErrors[field.name] && <p className="info-error">{validationErrors[field.name]}</p>}
        </div>
      ))}
      <button type="submit">
        <FontAwesomeIcon icon={faSave} /> {id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default ItemForm;
