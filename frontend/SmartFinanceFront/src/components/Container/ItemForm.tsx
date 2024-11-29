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

// Definir el tipo de datos del formulario (ItemData)
interface ItemData {
  name: string;
  description?: string;
  // Agrega otras propiedades según los campos del formulario
}

interface ItemFormProps {
  endpoint: string;
  itemName: string;
  fields: Field[];
  onRefresh: () => void;
  selectedItem?: string | null; // selectedItem como prop opcional
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, onRefresh, selectedItem }) => {
  // Desestructuración de useForm
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemData>(); 
  const { onSubmit, successMessage, formError } = useItemForm({
    endpoint,
    fields,
    onRefresh,
    itemName,
  });

  // Usar useEffect para establecer valores iniciales cuando se selecciona un ítem
  useEffect(() => {
    if (selectedItem) {
      // Aquí deberías configurar los valores iniciales del formulario
      setValue('name', selectedItem); // Establecer el valor para el campo 'name'
      console.log('Item seleccionado:', selectedItem);
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
              {...register(field.name as keyof ItemData, { // Uso de keyof ItemData para asegurar que los nombres de campo sean válidos
                required: field.required ? field.validationMessage : false,
              })}
              className="form-control"
            />
            {errors[field.name as keyof ItemData] && ( // Acceso a los errores usando keyof ItemData
              <p className="info-error">
                {(errors[field.name as keyof ItemData] as FieldError)?.message || ''}
              </p>
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
