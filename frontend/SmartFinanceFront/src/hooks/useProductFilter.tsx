import { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';

export const useProductFilter = () => {
  const { state } = useAuth();
  const { selectedBusinessId } = state;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noProducts, setNoProducts] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedBusinessId) return;

      setLoading(true);
      setErrorMessage(null);
      
      try {
        const response = await fetch(`/api/products?businessId=${selectedBusinessId}`);
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        setProducts(data);
        setNoProducts(data.length === 0);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message); // Esto asegura que error es una instancia de Error
        } else {
          setErrorMessage('Error desconocido'); // Manejo genérico
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedBusinessId]);

  return { products, loading, noProducts, errorMessage };
};
