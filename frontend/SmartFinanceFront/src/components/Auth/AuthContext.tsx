import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

type AuthAction =
  | { type: 'LOGIN'; token: string; userId: string; selectedBusinessId?: string | null }
  | { type: 'LOGOUT' }
  | { type: 'SET_BUSINESS'; selectedBusinessId: string | null }
  | { type: 'SET_ENDPOINT'; endpoint: string };

interface AuthState {
  token: string | null;
  userId: string | null;
  selectedBusinessId: string | null;
  endpoint: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  selectedBusinessId: localStorage.getItem('selectedBusinessId'),
  endpoint: '/api/productServices',
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      localStorage.setItem('userId', action.userId);
      if (action.selectedBusinessId) localStorage.setItem('selectedBusinessId', action.selectedBusinessId);
      console.log('LOGIN action:', { token: action.token, userId: action.userId, selectedBusinessId: action.selectedBusinessId });
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        selectedBusinessId: action.selectedBusinessId || null,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('selectedBusinessId');
      console.log('LOGOUT action');
      return { token: null, userId: null, selectedBusinessId: null, endpoint: state.endpoint };
    case 'SET_BUSINESS':
      if (action.selectedBusinessId) localStorage.setItem('selectedBusinessId', action.selectedBusinessId);
      else localStorage.removeItem('selectedBusinessId');
      console.log('SET_BUSINESS action:', { selectedBusinessId: action.selectedBusinessId });
      return { ...state, selectedBusinessId: action.selectedBusinessId };
    case 'SET_ENDPOINT':
      console.log('SET_ENDPOINT action:', { endpoint: action.endpoint });
      return { ...state, endpoint: action.endpoint };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  login: (token: string, userId: string, selectedBusinessId?: string | null) => void;
  logout: () => void;
  setSelectedBusinessId: (businessId: string | null) => void;
  setEndpoint: (endpoint: string) => void;
} | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider montado, estado inicial:", state);
  }, [state]);

  const login = (token: string, userId: string, selectedBusinessId?: string | null) => {
    console.log("Login invocado con:", { token, userId, selectedBusinessId });
    dispatch({ type: 'LOGIN', token, userId, selectedBusinessId });
    navigate('/');
  };

  const logout = () => {
    console.log("Logout invocado");
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const setSelectedBusinessId = (businessId: string | null) => {
    console.log("setSelectedBusinessId invocado con:", businessId);
    dispatch({ type: 'SET_BUSINESS', selectedBusinessId: businessId });
  };

  const setEndpoint = (endpoint: string) => {
    console.log("setEndpoint invocado con:", endpoint);
    dispatch({ type: 'SET_ENDPOINT', endpoint });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, setSelectedBusinessId, setEndpoint }}>
      {children}
    </AuthContext.Provider>
  );
};
