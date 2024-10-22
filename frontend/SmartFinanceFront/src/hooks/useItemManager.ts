import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface UseItemManagerProps {
  endpoint: string;
  itemName: string;
  userId: string | null;
}

export const useItemManager = ({ endpoint, itemName, userId }: UseItemManagerProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [itemData, setItemData] = useState<Record<string, any> | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);  // Almacenar ID del ítem
  const navigate = useNavigate();

  // Función para cargar un ítem por ID
  const fetchItemById = async (id: string) => {
    setLoading(true);
    setErrorMessage(null);
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await api.get<Record<string, any>>(`${endpoint}/${id}`, config);
      setItemData(response.data);  // Guardar datos del ítem
    } catch (error) {
      setErrorMessage('Hubo un error al cargar los datos del ítem.');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear o actualizar un ítem
  const submitItem = async (data: any, id?: string, shouldNavigate = true): Promise<boolean> => {
    setLoading(true);
    setErrorMessage(null);
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const requestData = { ...data, createdBy: userId };  // Asegurar que se añade el userId en cada petición

    try {
      let response;
      if (id) {
        // Actualización de ítem
        response = await api.put<Record<string, any>>(`${endpoint}/${id}`, requestData, config);
        setItemId(id);  // Guardar el ID del ítem actualizado
      } else {
        // Creación de nuevo ítem
        response = await api.post<Record<string, any>>(`${endpoint}`, requestData, config);
        setItemId(response.data._id);  // Guardar ID del nuevo ítem
      }
      // Redirigir sólo si `shouldNavigate` es verdadero
      if (shouldNavigate) {
        navigate(`/${itemName.toLowerCase()}`);
      }
      return true; // Retornar true si la operación es exitosa
    } catch (error) {
      setErrorMessage('Hubo un error al guardar los datos.');
      return false; // Retornar false si hay un error
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un ítem
  const deleteItem = async (id: string) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await api.delete(`${endpoint}/${id}`, config);
      // Aquí podrías realizar una actualización adicional o manejar el estado después de la eliminación
    } catch (error) {
      setErrorMessage('Hubo un error al eliminar el ítem.');
    } finally {
      setLoading(false);
    }
  };

  return {
    itemData,
    itemId,  // Retornar el ID del ítem creado o actualizado
    loading,
    errorMessage,
    fetchItemById,  // Función para cargar datos por ID
    submitItem,  // Función para crear o actualizar ítems
    deleteItem,  // Función para eliminar ítems
  };
};
