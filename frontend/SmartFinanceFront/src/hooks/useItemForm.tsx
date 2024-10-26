import React, { useEffect } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@components/Auth/AuthContext';
import api from 'services/api'; // Asegúrate que la ruta de tu API sea correcta

// Define el tipo de datos que esperas del backend
interface ItemData {
  name: string;
  description: string;
  price?: number;
  businessId?: string;
  [key: string]: any;
}

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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemData>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAuth();
  const { selectedBusinessId } = state; // ID del negocio seleccionado del contexto

  // Cargar datos del ítem si existe un ID
  useEffect(() => {
    if (id) {
      api.get<ItemData>(`${endpoint}/${id}`)
        .then(response => {
          fields.forEach(field => setValue(field.name, response.data[field.name]));
        })
        .catch((error) => {
          console.error('Error al cargar los datos:', error instanceof Error ? error.message : error);
        });
    } else if (selectedBusinessId) {
      // Si no hay ID, asigna el ID del negocio automáticamente
      setValue('businessId', selectedBusinessId);
    }
  }, [id, endpoint, fields, setValue, selectedBusinessId]);

  // Función de envío del formulario
  const onSubmit = async (data: ItemData) => {
    try {
      // Incluye el ID del negocio, si es un ítem que no sea de negocios
      if (endpoint !== '/api/business' && selectedBusinessId) {
        data.businessId = selectedBusinessId;
      }

      // Valida que el precio sea un número positivo
      if (data.price !== undefined && data.price < 0) {
        console.error('El precio debe ser un número positivo.');
        return;
      }

      // Envía la solicitud de creación o actualización
      if (id) {
        await api.put(`${endpoint}/${id}`, data);
      } else {
        await api.post(endpoint, data);
      }

      onRefresh(); // Llama a la función para actualizar la lista
      navigate(`/${itemName.toLowerCase()}`);
    } catch (error) {
      console.error('Error al enviar el formulario:', error instanceof Error ? error.message : error);
    }
  };

  return (
    <div>
      <h2>{id ? `Editar ${itemName}` : `Crear Nuevo ${itemName}`}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}:</label>
            <input
              type={field.type}
              {...register(field.name, { 
                required: field.required ? field.validationMessage : false,
                validate: field.type === 'number' && field.name === 'price'
                  ? (value) => Number(value) >= 0 || 'El precio debe ser un número positivo.'
                  : undefined,
              })}
            />
            {errors[field.name] && (
              <p className="info-error">
                {(errors[field.name] as FieldError)?.message?.toString() || ''}
              </p>
            )}
          </div>
        ))}
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
      {errors.root && <p className="error-message">{errors.root.message}</p>}
    </div>
  );
};

export default ItemForm;
