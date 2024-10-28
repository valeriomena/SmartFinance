import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@components/Auth/AuthContext';
import api from '../services/api';

interface ItemData {
  name: string;
  description: string;
  price?: number;
  createdBy?: string; 
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

interface UseItemFormProps {
  endpoint: string;
  fields: Field[];
  onRefresh: () => void; // Función para refrescar la lista de ítems
  itemName: string;
}

// Función para validar el ObjectId
const isValidObjectId = (id: string) => {
  return /^[0-9a-fA-F]{24}$/.test(id); // Verifica si el ID tiene 24 caracteres hexadecimales
};

const useItemForm = ({ endpoint, fields, onRefresh, itemName }: UseItemFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemData>();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();
  
  const [formError, setFormError] = useState<string | null>(null); // Manejo de error de formulario

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
    } else if (state.selectedBusinessId) {
      setValue('businessId', state.selectedBusinessId);
    }
  }, [id, endpoint, fields, setValue, state.selectedBusinessId]);

  // Función de envío del formulario
  const onSubmit = async (data: ItemData) => {
    console.log('Formulario enviado con datos:', data); // Log para verificar los datos antes de enviar
    try {
      // Validación del ID del usuario y asignación de datos
      if (endpoint === '/api/businesses') {
        if (!state.userId || !isValidObjectId(state.userId)) {
          throw new Error('El ID del usuario es necesario y debe ser un ObjectId válido.');
        }
        data.createdBy = state.userId; // Asigna el ID del usuario
        delete data.businessId; // Asegúrate de que businessId no se envíe
      } else if (endpoint === '/api/productServices') {
        // Para otros endpoints, asegúrate de que el ID del negocio esté disponible
        if (!state.selectedBusinessId) {
          throw new Error('El ID del negocio es necesario.');
        }
        data.businessId = state.selectedBusinessId; // Asigna el ID del negocio
        delete data.createdBy; // Asegúrate de que createdBy no se envíe
      }

      // Validación del precio
      if (data.price !== undefined && data.price < 0) {
        setFormError('El precio debe ser un número positivo.');
        return;
      }

      // Envía la solicitud de creación o actualización
      console.log('Data para agregar:', data); // Log para verificar que se está asignando correctamente
      console.log('Endpoint', endpoint);
      console.log('ID de usuario en contexto', state.userId);
      console.log('ID de negocio:', data.businessId); // Asegúrate de que el ID se imprime correctamente
      if (id) {
        await api.put(`${endpoint}/${id}`, data);
      } else {
        await api.post(endpoint, data);
      }

      onRefresh(); // Llama a la función para actualizar la lista
      navigate(`/${itemName.toLowerCase()}`);
      setFormError(null); // Restablece el error si la solicitud fue exitosa
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setFormError(errorMessage);
      console.error('Error al enviar el formulario:', errorMessage);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    formError, // Retorna el estado del error de formulario
  };
};

export default useItemForm;
