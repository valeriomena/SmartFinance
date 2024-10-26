import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthAction = 
  | { type: 'LOGIN'; token: string; userId: string; selectedBusinessId?: string | null }
  | { type: 'LOGOUT' }
  | { type: 'SET_BUSINESS'; selectedBusinessId: string | null };

interface AuthState {
  token: string | null;
  userId: string | null;
  selectedBusinessId: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  selectedBusinessId: localStorage.getItem('selectedBusinessId'),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      localStorage.setItem('userId', action.userId);
      localStorage.setItem('selectedBusinessId', action.selectedBusinessId || '');
      return { ...state, token: action.token, userId: action.userId, selectedBusinessId: action.selectedBusinessId || null };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('selectedBusinessId');
      return { token: null, userId: null, selectedBusinessId: null };
    case 'SET_BUSINESS':
      localStorage.setItem('selectedBusinessId', action.selectedBusinessId || '');
      return { ...state, selectedBusinessId: action.selectedBusinessId };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  login: (token: string, userId: string, selectedBusinessId?: string | null) => void;
  logout: () => void;
  setSelectedBusinessId: (businessId: string | null) => void;
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
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedBusinessId = localStorage.getItem('selectedBusinessId');

    if (storedToken && storedUserId) {
      dispatch({ type: 'LOGIN', token: storedToken, userId: storedUserId, selectedBusinessId: storedBusinessId });
    }
  }, []);

  const login = (token: string, userId: string, selectedBusinessId?: string | null) => {
    dispatch({ type: 'LOGIN', token, userId, selectedBusinessId });
    navigate('/');
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const setSelectedBusinessId = (businessId: string | null) => {
    dispatch({ type: 'SET_BUSINESS', selectedBusinessId: businessId });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, setSelectedBusinessId }}>
      {children}
    </AuthContext.Provider>
  );
};
