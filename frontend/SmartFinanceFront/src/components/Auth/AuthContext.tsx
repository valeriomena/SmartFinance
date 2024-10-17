import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Definición de las acciones que afectan al estado de autenticación.
 * @typedef {Object} AuthAction
 * @property {string} type - El tipo de acción, puede ser 'LOGIN' o 'LOGOUT'.
 * @property {string} [token] - El token de autenticación. Solo se usa en 'LOGIN'.
 * @property {string} [userId] - El ID del usuario. Solo se usa en 'LOGIN'.
 */
type AuthAction = 
  | { type: 'LOGIN'; token: string; userId: string }
  | { type: 'LOGOUT' };

/**
 * Estado de autenticación que contiene el token.
 * @typedef {Object} AuthState
 * @property {string|null} token - El token de autenticación del usuario.
 */
interface AuthState {
  token: string | null;
}

// Estado inicial de autenticación
const initialState: AuthState = {
  token: localStorage.getItem('token'), // Inicializar desde localStorage
};

/**
 * Reducer para manejar las acciones de autenticación.
 * @param {AuthState} state - El estado actual de la autenticación.
 * @param {AuthAction} action - La acción que se va a realizar (LOGIN o LOGOUT).
 * @returns {AuthState} - El nuevo estado después de aplicar la acción.
 */
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

/**
 * Contexto de autenticación que proporciona el estado y las funciones para login y logout.
 * @typedef {Object} AuthContextType
 * @property {AuthState} state - El estado actual de autenticación.
 * @property {Function} login - Función para iniciar sesión.
 * @property {Function} logout - Función para cerrar sesión.
 */
const AuthContext = createContext<{
  state: AuthState;
  login: (token: string, userId: string) => void;
  logout: () => void;
} | undefined>(undefined);

/**
 * Hook para acceder al contexto de autenticación.
 * @throws {Error} Si el hook se usa fuera del contexto de AuthProvider.
 * @returns {AuthContextType} El contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Proveedor del contexto de autenticación.
 * @param {ReactNode} children - Los componentes hijos que estarán dentro del contexto.
 * @returns {JSX.Element} El componente que proporciona el contexto de autenticación.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch({ type: 'LOGIN', token: storedToken, userId: '' });
    }
  }, []);

  const login = (token: string, userId: string) => {
    dispatch({ type: 'LOGIN', token, userId });
    navigate('/');
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
