import React, { createContext, useContext, useState, useEffect } from 'react';

// Definición de tipos para el contexto
interface EndpointContextType {
  endpoint: string;
  selectedBusinessId: string | null;
  setEndpoint: (endpoint: string) => void;
  setSelectedBusinessId: (businessId: string | null) => void;
}

// Creación del contexto
const EndpointContext = createContext<EndpointContextType | undefined>(undefined);

// Proveedor del contexto
export const EndpointProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para el endpoint y el ID del negocio seleccionado
  const [endpoint, setEndpoint] = useState<string>(localStorage.getItem('endpoint') || '/api/businesses');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(localStorage.getItem('selectedBusinessId'));

  // Sincroniza el endpoint en el localStorage
  useEffect(() => {
    localStorage.setItem('endpoint', endpoint);
  }, [endpoint]);

  // Sincroniza el selectedBusinessId en el localStorage
  useEffect(() => {
    if (selectedBusinessId) {
      localStorage.setItem('selectedBusinessId', selectedBusinessId);
    } else {
      localStorage.removeItem('selectedBusinessId');
    }
  }, [selectedBusinessId]);

  // Lógica para actualizar el endpoint
  useEffect(() => {
    if (selectedBusinessId) {
      setEndpoint(`/api/productServices/${selectedBusinessId}`);
    } else {
      setEndpoint('/api/businesses');
    }
  }, [selectedBusinessId]);  // Se ejecuta cada vez que selectedBusinessId cambia

  // Función para actualizar el endpoint
  const handleSetEndpoint = (newEndpoint: string) => {
    setEndpoint(newEndpoint);
  };

  // Función para actualizar el selectedBusinessId
  const handleSetSelectedBusinessId = (businessId: string | null) => {
    setSelectedBusinessId(businessId);
  };

  return (
    <EndpointContext.Provider value={{ endpoint, selectedBusinessId, setEndpoint: handleSetEndpoint, setSelectedBusinessId: handleSetSelectedBusinessId }}>
      {children}
    </EndpointContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useEndpoint = () => {
  const context = useContext(EndpointContext);
  if (!context) {
    throw new Error('useEndpoint must be used within an EndpointProvider');
  }
  return context;
};
