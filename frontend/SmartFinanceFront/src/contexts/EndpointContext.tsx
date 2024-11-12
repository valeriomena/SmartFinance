import React, { createContext, useContext, useState, useEffect } from 'react';

interface EndpointContextType {
  endpoint: string;
  selectedBusinessId: string | null;
  setEndpoint: (endpoint: string) => void;
  setSelectedBusinessId: (businessId: string | null) => void;
}

const EndpointContext = createContext<EndpointContextType | undefined>(undefined);

export const EndpointProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [endpoint, setEndpoint] = useState<string>(localStorage.getItem('endpoint') || '/api/businesses');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(localStorage.getItem('selectedBusinessId'));

  useEffect(() => {
    localStorage.setItem('endpoint', endpoint);
  }, [endpoint]);

  useEffect(() => {
    if (selectedBusinessId) {
      localStorage.setItem('selectedBusinessId', selectedBusinessId);
    } else {
      localStorage.removeItem('selectedBusinessId');
    }
  }, [selectedBusinessId]);

  const handleSetEndpoint = (newEndpoint: string) => {
    setEndpoint(newEndpoint);
  };

  const handleSetSelectedBusinessId = (businessId: string | null) => {
    setSelectedBusinessId(businessId);
    if (businessId) {
      setEndpoint(`/api/productServices/${businessId}`);
    } else {
      setEndpoint('/api/businesses');
    }
  };

  return (
    <EndpointContext.Provider value={{ endpoint, selectedBusinessId, setEndpoint: handleSetEndpoint, setSelectedBusinessId: handleSetSelectedBusinessId }}>
      {children}
    </EndpointContext.Provider>
  );
};

export const useEndpoint = () => {
  const context = useContext(EndpointContext);
  if (!context) {
    throw new Error('useEndpoint must be used within an EndpointProvider');
  }
  return context;
};
