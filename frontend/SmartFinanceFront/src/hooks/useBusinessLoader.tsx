import { useState, useEffect } from 'react';

interface Business {
    id: string;
    name: string;
    // Otros campos que necesites
}

const useBusinessLoader = (userId: string | null) => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setError("Usuario no autenticado");
            return;
        }

        const fetchBusinesses = async () => {
            try {
                const response = await fetch(`/api/businesses?userId=${userId}`);
                if (!response.ok) throw new Error('Error al cargar negocios');
                const data: Business[] = await response.json();
                setBusinesses(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Error desconocido");
                }
            }
        };

        fetchBusinesses();
    }, [userId]);

    return { businesses, error };
};

export default useBusinessLoader;
