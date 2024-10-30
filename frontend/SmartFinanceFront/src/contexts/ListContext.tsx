import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '@components/Auth/AuthContext';

interface Item {
  _id: string;
  name: string;
}

interface ItemsContextProps {
  items: Item[];
  refreshItems: () => void;
  deleteItem: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const ItemsContext = createContext<ItemsContextProps | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems debe usarse dentro de un ItemsProvider');
  }
  return context;
};

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();

  const refreshItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = state.endpoint;
      const response = await api.get<Item[]>(endpoint, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setItems(response.data);
    } catch (err) {
      setError('Error al cargar los ítems');
      console.error('Error al refrescar los ítems:', err);
    } finally {
      setLoading(false);
    }
  }, [state.endpoint, state.token]);

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`${state.endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      setError('Error al eliminar el ítem');
      console.error('Error al eliminar el ítem:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemsContext.Provider value={{ items, refreshItems, deleteItem, loading, error }}>
      {children}
    </ItemsContext.Provider>
  );
};
