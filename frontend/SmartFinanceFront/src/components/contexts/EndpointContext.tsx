import React, { createContext, useContext, useState, useEffect } from 'react';

interface EndpointContextType {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
}

const EndpointContext = createContext<EndpointContextType | undefined>(undefined);

export const EndpointProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [endpoint, setEndpoint] = useState<string>('');

  useEffect(() => {
    console.log("EndpointProvider montado, estado inicial:", endpoint);
  }, [endpoint]);

  const handleSetEndpoint = (newEndpoint: string) => {
    console.log("setEndpoint invocado con:", newEndpoint);
    setEndpoint(newEndpoint);
  };

  return (
    <EndpointContext.Provider value={{ endpoint, setEndpoint: handleSetEndpoint }}>
      {children}
    </EndpointContext.Provider>
  );
};

export const useEndpoint = () => {
  const context = useContext(EndpointContext);
  if (!context) {
    throw new Error('useEndpoint must be used within an EndpointProvider');
  }
  console.log("useEndpoint invocado, contexto:", context);
  return context;
};
