import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '@components/Auth/AuthContext';

export const useItemManager = (itemName: string, endpoint: string) => {
  const { state } = useAuth();
  const { userId, selectedBusinessId, token } = state;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [itemData, setItemData] = useState<Record<string, any> | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchItemById = async (id: string) => {
    setLoading(true);
    setErrorMessage(null);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log(`Fetching item by ID: ${id}`);
    
    try {
      const response = await api.get<Record<string, any>>(
        `${selectedBusinessId ? `/api/business/${selectedBusinessId}` : ''}/${endpoint}/${id}`, 
        config
      );
      setItemData(response.data);
      console.log('Item data retrieved:', response.data);
    } catch (error) {
      setErrorMessage('Hubo un error al cargar los datos del ítem.');
      console.error('Error al cargar datos del ítem:', error);
    } finally {
      setLoading(false);
      console.log('Loading después de fetch:', loading);
    }
  };

  const submitItem = async (data: any, id?: string, shouldNavigate = true): Promise<boolean> => {
    setLoading(true);
    setErrorMessage(null);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const requestData = { ...data, createdBy: userId };

    console.log('Submit item data:', requestData);

    try {
      let response;
      if (id) {
        response = await api.put<Record<string, any>>(
          `${selectedBusinessId ? `/api/business/${selectedBusinessId}` : ''}/${endpoint}/${id}`, 
          requestData, 
          config
        );
        setItemId(id);
        console.log(`Updated item ID: ${id}`);
      } else {
        response = await api.post<Record<string, any>>(
          `${selectedBusinessId ? `/api/business/${selectedBusinessId}` : ''}/${endpoint}`, 
          requestData, 
          config
        );
        setItemId(response.data._id);
        console.log('Created new item ID:', response.data._id);
      }
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
      console.log('Loading después de submit:', loading);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    console.log(`Deleting item with ID: ${id}`);

    try {
      await api.delete(`${endpoint}/${id}`, config);
/*      await api.delete(
        `${selectedBusinessId ? `/api/business/${selectedBusinessId}` : ''}/${endpoint}/${id}`, 
        config
      );*/
      console.log('Item deleted successfully');
    } catch (error) {
      setErrorMessage('Hubo un error al eliminar el ítem.');
      console.error('Error al eliminar ítem:', error);
    } finally {
      setLoading(false);
      console.log('Loading después de delete:', loading);
    }
  };

  return {
    itemData,
    itemId,
    loading,
    errorMessage,
    fetchItemById,
    submitItem,
    deleteItem,
  };
};
