import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '@components/Auth/AuthContext';

interface Item {
  _id: string;
  name: string;
  [key: string]: any;
}

interface ItemsContextProps {
  items: Item[];
  refreshItems: () => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();

  const fetchItems = useCallback(async () => {
    if (!state.token || !state.endpoint) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get<Item[]>(state.endpoint, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setItems(response.data);
    } catch (err) {
      setError('Error al cargar los ítems');
    } finally {
      setLoading(false);
    }
  }, [state.token, state.endpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const deleteItem = async (id: string) => {
    if (!state.token) return;

    setLoading(true);
    try {
      await api.delete(`${state.endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch {
      setError('Error al eliminar el ítem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemsContext.Provider value={{ items, refreshItems: fetchItems, deleteItem, loading, error }}>
      {children}
    </ItemsContext.Provider>
  );
};
