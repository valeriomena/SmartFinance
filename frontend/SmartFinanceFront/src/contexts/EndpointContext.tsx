// EndpointContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface EndpointContextType {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
}

const EndpointContext = createContext<EndpointContextType | undefined>(undefined);

export const EndpointProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [endpoint, setEndpoint] = useState<string>('');

  return (
    <EndpointContext.Provider value={{ endpoint, setEndpoint }}>
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
