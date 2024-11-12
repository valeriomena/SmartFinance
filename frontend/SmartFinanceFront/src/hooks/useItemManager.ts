import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '@components/Auth/AuthContext';
import { useEndpoint } from '../contexts/EndpointContext';

interface Item {
  _id: string;
  name: string;
  description?: string;
  price?: number;
}

export const useItemManager = (itemName: string) => {
  const { state } = useAuth();
  const { userId, token } = state;
  const { endpoint, selectedBusinessId, setEndpoint, setSelectedBusinessId } = useEndpoint();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  console.log("Endpoint:", endpoint, "BusinessId:", selectedBusinessId);

  // Método para obtener ítems
  const fetchItems = async () => {
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    let queryEndpoint = endpoint;
    // Solo agrega el `businessId` si está seleccionado
    if (selectedBusinessId && endpoint === '/api/businesses') {
      queryEndpoint += `?businessId=${selectedBusinessId}`;
    } else if (userId) {
      queryEndpoint += `?userId=${userId}`;
    } else {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get<Item[]>(queryEndpoint, config);
      setItems(response.data);
    } catch (err) {
      setErrorMessage('Hubo un error al cargar los elementos.');
    } finally {
      setLoading(false);
    }
  };

  // Método para obtener un ítem por ID
  const fetchItemById = async (id: string) => {
    setLoading(true);
    setErrorMessage(null);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await api.get<Item>(`${endpoint}/${id}`, config);
      setSelectedItem(response.data);
    } catch (error) {
      setErrorMessage('Hubo un error al cargar los datos del ítem.');
    } finally {
      setLoading(false);
    }
  };

  // Método para eliminar un ítem
  const deleteItem = async (id: string) => {
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await api.delete(`${endpoint}/${id}`, config);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      setErrorMessage('Hubo un error al eliminar el ítem.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect para recargar los datos cuando cambia el endpoint o el selectedBusinessId
  useEffect(() => {
    fetchItems();
  }, [endpoint, selectedBusinessId]); // Dependemos de endpoint y selectedBusinessId

  // Actualiza el endpoint si el endpoint es 'business' y no se ha seleccionado un negocio
  useEffect(() => {
    if (endpoint === '/api/businesses' && !selectedBusinessId) {
      setEndpoint('/api/businesses'); // Cambiar a '/api/businesses' si es necesario
    }
  }, [endpoint, selectedBusinessId, setEndpoint]);

  return {
    items,
    selectedItem,
    loading,
    errorMessage,
    fetchItems,
    fetchItemById,
    deleteItem,
    setSelectedItem, // Exponemos setSelectedItem aquí
  };
};
