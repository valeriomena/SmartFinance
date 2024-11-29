import { useState, useEffect } from 'react';
import { useItems } from '../contexts/ListContext'; // Importamos el contexto de Items
import { useAuth } from '@components/Auth/AuthContext';
import { useEndpoint } from '../contexts/EndpointContext';
import api from '../services/api';  // Asegúrate de que esta ruta es correcta.


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
  
  // Usamos el hook useItems para acceder a los ítems del contexto
  const { items, refreshItems, loading, error, deleteItem } = useItems();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Método para obtener ítems. Ahora verificamos si ya tenemos los ítems del contexto.
  const fetchItems = async () => {
    setErrorMessage(null); // Limpiamos errores previos
    if (!items[endpoint]) {
      // Si no hay ítems en el contexto, hacemos la llamada a la API
      try {
        await refreshItems(endpoint);
      } catch (error) {
        setErrorMessage('Hubo un error al cargar los ítems.');
      }
    }
  };

  // Método para obtener un ítem por ID (únicamente si no está en el estado de selectedItem)
  const fetchItemById = async (id: string) => {
    setErrorMessage(null);
    const currentItem = items[endpoint]?.find(item => item._id === id);
    if (currentItem) {
      setSelectedItem(currentItem); // Si el ítem ya está en el contexto, lo usamos directamente.
      return;
    }

    // Si no está, hacemos la solicitud para cargarlo.
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await api.get<Item>(`${endpoint}/${id}`, config);
      setSelectedItem(response.data);
    } catch (error) {
      setErrorMessage('Hubo un error al cargar los datos del ítem.');
    }
  };

  // Método para eliminar un ítem
  const deleteItemHandler = async (id: string) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await api.delete(`${endpoint}/${id}`, config);
      deleteItem(endpoint, id); // Usamos deleteItem del contexto para actualizar los ítems
    } catch (error) {
      setErrorMessage('Hubo un error al eliminar el ítem.');
    }
  };

  // useEffect para recargar los datos cuando cambia el endpoint o el selectedBusinessId
  useEffect(() => {
    fetchItems();
  }, [endpoint, selectedBusinessId]); // Solo dependemos de endpoint y selectedBusinessId

  // Actualiza el endpoint si el endpoint es 'business' y no se ha seleccionado un negocio
  useEffect(() => {
    if (endpoint === '/api/businesses' && !selectedBusinessId) {
      setEndpoint('/api/businesses'); // Cambiar a '/api/businesses' si es necesario
    }
  }, [endpoint, selectedBusinessId, setEndpoint]);

  return {
    items: items[endpoint] || [], // Pasamos los ítems del contexto
    selectedItem,
    loading,
    errorMessage,
    fetchItems,
    fetchItemById,
    deleteItemHandler, // Usamos deleteItemHandler aquí para eliminar el ítem
    setSelectedItem, // Exponemos setSelectedItem aquí
  };
};
