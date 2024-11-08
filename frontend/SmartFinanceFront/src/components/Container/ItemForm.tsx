// ItemForm.tsx
import React, { useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import useItemForm from '../../hooks/useItemForm'; 
import '../../styles/Form.css';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date';
  required: boolean;
  validationMessage: string;
}

// Define aquí ItemData con las propiedades que necesitas en el formulario
interface ItemData {
  name: string;
  description?: string;
  // Agrega otras propiedades según tus campos de formulario
}

interface ItemFormProps {
  endpoint: string;
  itemName: string;
  fields: Field[];
  onRefresh: () => void;
  selectedItem?: string | null; // selectedItem como prop opcional
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, onRefresh, selectedItem }) => {
  // Especifica ItemData como el tipo para useForm
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemData>(); 
  const { onSubmit, successMessage, formError } = useItemForm({
    endpoint,
    fields,
    onRefresh,
    itemName,
  });

  useEffect(() => {
    if (selectedItem) {
      // Establecer valores iniciales en el formulario si se selecciona un ítem
      setValue('name', selectedItem);// Ejemplo: setear el campo 'name' con el valor de selectedItem
      console.log('Item seleccionado : ', selectedItem);
    }
  }, [selectedItem, setValue]);

  return (
    <div className="form-container"> 
      <h2 className="form-header">{itemName}</h2>
      <form onSubmit={handleSubmit(onSubmit as (data: ItemData) => void)} className="item-form"> 
        {fields.map((field) => (
          <div key={field.name} className="input-group"> 
            <label htmlFor={field.name}>{field.label}:</label>
            <input
              id={field.name}
              type={field.type}
              {...register(field.name as keyof ItemData, { 
                required: field.required ? field.validationMessage : false,
              })}
              className="form-control"
            />
            {errors[field.name as keyof ItemData] && (
              <p className="info-error">{(errors[field.name as keyof ItemData] as FieldError)?.message || ''}</p>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          {selectedItem ? 'Actualizar' : 'Crear'}
        </button> 
      </form>
      {formError && <p className="error-message">{formError}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ItemForm;
