import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
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
  userId: string | null; // Se añade la propiedad userId aquí
}

const ItemForm: React.FC<ItemFormProps> = ({ endpoint, itemName, fields, userId }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('User ID in ItemForm:', userId); // Verificar en la consola
  }, [userId]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const token = localStorage.getItem('token'); // Asegúrate de que el token se esté obteniendo correctamente
      console.log('token in ItemForm:', token);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const requestData = { ...data, createdBy: userId }; // Incluir userId en los datos
      console.log(requestData);
      if (id) {
        await api.put(`${endpoint}/${id}`, requestData, config);
      } else {
        await api.post(endpoint, requestData, config);
      }
      navigate(`/${itemName.toLowerCase()}`);
    } catch (error) {
      setErrorMessage('Hubo un error al guardar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? `Editar ${itemName}` : `Crear Nuevo ${itemName}`}</h2>
      {errorMessage && <p className="info-error">{errorMessage}</p>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <div className="input-group" key={field.name}>
              <label>{field.label}:</label>
              <input
                type={field.type}
                {...register(field.name, {
                  required: field.required ? field.validationMessage : false
                })}
              />
              {errors[field.name] && <p className="info-error">{errors[field.name]?.message?.toString() || ''}</p>}
            </div>
          ))}
          <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
        </form>
      )}
    </div>
  );
};

export default ItemForm;
