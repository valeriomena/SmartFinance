import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import api from '../services/api';
import { useAuth } from '@components/Auth/AuthContext';

// Tipo para cada ítem
interface Item {
  _id: string;
  name: string;
}

// Propiedades del contexto
interface ItemsContextProps {
  items: { [key: string]: Item[] }; // Manejamos los ítems por endpoint
  refreshItems: (endpoint: string) => void; // Función para refrescar los ítems de un endpoint específico
  deleteItem: (endpoint: string, id: string) => void; // Eliminar ítem por endpoint
  loading: boolean;
  error: string | null;
}

const ItemsContext = createContext<ItemsContextProps | undefined>(undefined);

// Hook para consumir el contexto
export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems debe usarse dentro de un ItemsProvider');
  }
  return context;
};

// Provider para el contexto
export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<{ [key: string]: Item[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();

  // Función para refrescar los ítems de un endpoint específico
  const refreshItems = useCallback(async (endpoint: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<Item[]>(endpoint, {
        headers: { Authorization: `Bearer ${state.token}` },
      });

      // Actualizamos los ítems para el endpoint específico
      setItems((prevItems) => {
        const updatedItems = {
          ...prevItems,
          [endpoint]: response.data,
        };

        // Aquí agregamos el console.log para ver los datos
        console.log(`Datos recibidos para el endpoint "${endpoint}":`, updatedItems);

        return updatedItems;
      });
    } catch (err) {
      setError('Error al cargar los ítems');
      console.error('Error al refrescar los ítems:', err);
    } finally {
      setLoading(false);
    }
  }, [state.token]);

  // Función para eliminar un ítem de un endpoint
  const deleteItem = async (endpoint: string, id: string) => {
    setLoading(true);
    try {
      await api.delete(`${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setItems((prevItems) => ({
        ...prevItems,
        [endpoint]: prevItems[endpoint]?.filter((item) => item._id !== id) || [],
      }));
    } catch (err) {
      setError('Error al eliminar el ítem');
      console.error('Error al eliminar el ítem:', err);
    } finally {
      setLoading(false);
    }
  };

  // Usamos useMemo para asegurar que solo se recarguen los datos de un endpoint cuando sea necesario
  const contextValue = useMemo(
    () => ({
      items,
      refreshItems,
      deleteItem,
      loading,
      error,
    }),
    [items, loading, error, refreshItems, deleteItem]
  );

  return (
    <ItemsContext.Provider value={contextValue}>
      {children}
    </ItemsContext.Provider>
  );
};
