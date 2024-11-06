import { useEffect, useState } from 'react';
import { useAuth } from '@components/Auth/AuthContext';

interface ProductFilterProps {
  endpoint: string;
}

export const useProductFilter = ({ endpoint }: ProductFilterProps) => {
  const { state } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
/*
  useEffect(() => {
    const { token, selectedBusinessId: businessId } = state;

    // Verificar condiciones iniciales antes de hacer la solicitud
    console.log('Verificando condiciones para consultar productos:', {
      endpoint,
      token,
      businessId,
    });

    if (endpoint !== 'sales' || !token || !businessId) {
      console.log('Condiciones no cumplidas para consultar productos.',businessId,endpoint,token);
      setProducts([]);  // Resetear productos si no se cumplen condiciones
      return;
    }

    const fetchProducts = async () => {
      try {
        console.log('Haciendo la solicitud de productos para el businessId:', businessId);
        const response = await fetch(`/api/products?businessId=${businessId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud de productos');
        }

        const data = await response.json();
        console.log('Datos recibidos de productos:', data);
        setProducts(data.length > 0 ? data : []);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setError('Error en la conexión con el servidor o autenticación fallida');
      }
    };

    fetchProducts();
  }, [endpoint, state.token, state.selectedBusinessId]);
*/
  return { products, error };
};
