// ../../components/ItemForm.tsx
import React from 'react';
import { FieldError } from 'react-hook-form';
import useItemForm from '../../hooks/useItemForm'; 
import '../../styles/Form.css'; // Asegúrate de importar los estilos

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
  onRefresh: () => void; // Función para refrescar la lista de ítems
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, onRefresh }) => {
  const { register, handleSubmit, onSubmit, errors } = useItemForm({ endpoint, fields, onRefresh, itemName });

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
              className="form-control"
            />
            {errors[field.name] && (
              <p className="info-error">{(errors[field.name] as FieldError)?.message || ''}</p>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">{itemName === 'Actualizar' ? 'Actualizar' : 'Crear'}</button> 
      </form>
      {errors.root && <p className="error-message">{errors.root.message}</p>}
    </div>
  );
};

export default ItemForm;
