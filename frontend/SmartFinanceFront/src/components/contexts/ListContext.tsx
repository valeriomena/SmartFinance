import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '@components/Auth/AuthContext';

interface Item {
  _id: string;
  name: string;
  [key: string]: any; // Para incluir otras propiedades según sea necesario
}

interface ItemsContextProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>; // Cambiado a Dispatch para aceptar una función
  refreshItems: () => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ItemsContext = createContext<ItemsContextProps | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    console.error('Contexto no disponible en:', new Error().stack);
    throw new Error('useItems debe usarse dentro de un ItemsProvider');
  }
  console.log("useItems invocado, contexto:", context);
  return context;
};

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log("ItemsProvider montado");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();
  console.log("Estado en ItemsProvider:", state);

  useEffect(() => {
    console.log("ItemsProvider montado, estado inicial:", { items, loading, error });
  }, [items, loading, error]);

  const fetchItems = useCallback(async (endpoint: string) => {
    console.log("fetchItems invocado con endpoint:", endpoint);
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<Item[]>(endpoint, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setItems(response.data);
      console.log("Items obtenidos:", response.data);
    } catch (err) {
      setError('Error al cargar los ítems');
      console.error('Error al refrescar los ítems:', err);
    } finally {
      setLoading(false);
    }
  }, [state.token]);

  const refreshItems = async () => {
    const endpoint = state.endpoint; // Asegúrate de que este valor esté correctamente establecido en tu contexto de autenticación
    console.log("refreshItems invocado, endpoint:", endpoint);
    await fetchItems(endpoint);
  };

  const deleteItem = async (id: string) => {
    console.log("deleteItem invocado con id:", id);
    setLoading(true);
    try {
      await api.delete(`${state.endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      console.log("Item eliminado con id:", id);
    } catch (err) {
      setError('Error al eliminar el ítem');
      console.error('Error al eliminar el ítem:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemsContext.Provider value={{ items, setItems, refreshItems, deleteItem, loading, error }}>
      {children}
    </ItemsContext.Provider>
  );
};
