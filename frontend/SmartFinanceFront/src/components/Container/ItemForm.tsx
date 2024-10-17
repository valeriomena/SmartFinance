import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date'; // Puedes expandir esto según sea necesario
  required: boolean;
  validationMessage: string;
}

interface ItemFormProps {
  endpoint: string;
  itemName: string;
  fields: Field[]; // Recibimos los campos dinámicamente
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // Si existe un ID, cargamos los datos del elemento
  useEffect(() => {
    if (id) {
      api.get(`${endpoint}/${id}`)
        .then(response => {
          fields.forEach(field => {
            setValue(field.name, response.data[field.name]);
          });
        })
        .catch(error => console.error(error));
    }
  }, [id, endpoint, fields, setValue]);

  // Función de envío del formulario
  const onSubmit = async (data: any) => {
    try {
      if (id) {
        await api.put(`${endpoint}/${id}`, data);
      } else {
        await api.post(endpoint, data);
      }
      navigate(`/${itemName.toLowerCase()}`);
    } catch (error) {
      console.error(error);
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
                required: field.required ? field.validationMessage : false
              })}
            />
            {errors[field.name] && <p>{errors[field.name]?.message}</p>}
          </div>
        ))}
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default ItemForm;
