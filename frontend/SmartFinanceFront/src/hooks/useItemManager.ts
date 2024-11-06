import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '@components/Auth/AuthContext';

interface Item {
  _id: string;
  name: string;
}

export const useItemManager = (itemName: string, endpoint: string, updateItems: (items: Item[]) => void) => {
  const navigate = useNavigate(); 
  const { state } = useAuth();
  const { userId, selectedBusinessId, token } = state;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchItemById = async (id: string) => {
    setLoading(true);
    setErrorMessage(null);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await api.get(`${selectedBusinessId ? `/api/business/${selectedBusinessId}` : ''}/${endpoint}/${id}`, config);
      return response.data;
    } catch (error) {
      setErrorMessage('Hubo un error al cargar los datos del ítem.');
      console.error('Error al cargar datos del ítem:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitItem = async (data: Item, id?: string, shouldNavigate = true): Promise<boolean> => {
    setLoading(true);
    setErrorMessage(null);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const requestData = { ...data, createdBy: userId };

    try {
      let response;
      if (id) {
        response = await api.put(`${selectedBusinessId ? `/api/business/${selectedBusinessId}` : ''}/${endpoint}/${id}`, requestData, config);
      } else {
        response = await api.post(`${selectedBusinessId ? `/api/business/${selectedBusinessId}` : ''}/${endpoint}`, requestData, config);
      }
      updateItems(response.data as Item[]); // Asegúrate de que response.data sea del tipo correcto
      if (shouldNavigate) {
        navigate(`/${itemName.toLowerCase()}`);
      }
      return true;
    } catch (error) {
      setErrorMessage('Hubo un error al guardar los datos.');
      console.error('Error al guardar datos del ítem:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await api.delete(`${endpoint}/${id}`, config);
    } catch (error) {
      setErrorMessage('Hubo un error al eliminar el ítem.');
      console.error('Error al eliminar ítem:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorMessage,
    fetchItemById,
    submitItem,
    deleteItem,
  };
};
