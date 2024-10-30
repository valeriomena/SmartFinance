// ../../hooks/useItemForm.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@components/Auth/AuthContext';
import api from '../services/api';

interface Product {
  id: string; 
  name: string;
  businessId: string;
  price: number;
}

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
  onRefresh: () => void;
  itemName: string;
  products?: Product[];
  productError?: string;
}

const isValidObjectId = (id: string) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const useItemForm = ({ endpoint, fields, onRefresh, itemName, products, productError }: UseItemFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ItemData>();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const onSubmit = async (data: ItemData) => {
    console.log('Formulario enviado con datos:', data);
    try {
      if (endpoint === '/api/businesses') {
        if (!state.userId || !isValidObjectId(state.userId)) {
          throw new Error('El ID del usuario es necesario y debe ser un ObjectId válido.');
        }
        data.createdBy = state.userId;
        delete data.businessId;
      } else if (endpoint === '/api/productServices') {
        if (!state.selectedBusinessId) {
          throw new Error('El ID del negocio es necesario.');
        }
        data.businessId = state.selectedBusinessId;
        delete data.createdBy;
      }

      if (data.price !== undefined && data.price < 0) {
        setFormError('El precio debe ser un número positivo.');
        return;
      }

      if (id) {
        await api.put(`${endpoint}/${id}`, data);
      } else {
        await api.post(endpoint, data);
      }

      onRefresh();
      setSuccessMessage(`${itemName} creado exitosamente.`);
      setFormError(null);
      
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
    formError,
    successMessage,
  };
};

export default useItemForm;
