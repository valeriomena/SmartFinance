import React from 'react';
import { FieldError } from 'react-hook-form';
import useItemForm from '../../hooks/useItemForm'; 
import '../../styles/Form.css';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date';
  required: boolean;
  validationMessage: string;
}

interface ItemFormProps {
  endpoint: string;
  itemName: string;
  fields: Field[];
  onRefresh: () => void;
  disabled: boolean; // Nueva prop para habilitar/deshabilitar
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, onRefresh, disabled }) => {
  const { register, handleSubmit, onSubmit, errors, successMessage, formError } = useItemForm({ endpoint, fields, onRefresh, itemName });

  return (
    <div className="form-container"> 
      <h2 className="form-header">{itemName}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="item-form"> 
        {fields.map((field) => (
          <div key={field.name} className="input-group"> 
            <label htmlFor={field.name}>{field.label}:</label>
            <input
              id={field.name}
              type={field.type}
              {...register(field.name, { 
                required: field.required ? field.validationMessage : false,
                validate: field.type === 'number' && field.name === 'price'
                  ? (value) => Number(value) >= 0 || 'El precio debe ser un número positivo.'
                  : undefined,
              })}
              className={errors[field.name] ? 'error' : ''}
              disabled={disabled} // Deshabilitar campos si no hay businessId
            />
            {errors[field.name] && <p className="error-message">{(errors[field.name] as FieldError)?.message || 'Error en el campo'}</p>}
          </div>
        ))}
        <button type="submit" disabled={disabled}>Enviar</button> 
      </form>
      {formError && <p className="info-error">{formError}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default ItemForm;
