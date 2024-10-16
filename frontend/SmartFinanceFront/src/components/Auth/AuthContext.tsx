import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Definir las acciones de autenticación
type AuthAction = 
  | { type: 'LOGIN'; token: string; userId: string }
  | { type: 'LOGOUT' };

// Estado inicial de autenticación
interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'), // Inicializar desde localStorage
};

// Reducer de autenticación
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      localStorage.setItem('userId', action.userId);
      return { token: action.token };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return { token: null };
    default:
      return state;
  }
};

// Contexto de autenticación
const AuthContext = createContext<{
  state: AuthState;
  login: (token: string, userId: string) => void;
  logout: () => void;
} | undefined>(undefined);

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // useEffect para cargar el token desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch({ type: 'LOGIN', token: storedToken, userId: '' });
    }
  }, []);  // Este efecto solo se ejecuta una vez al inicio

  const login = (token: string, userId: string) => {
    dispatch({ type: 'LOGIN', token, userId });
    navigate('/'); // Redirigir tras login
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirigir tras logout
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
