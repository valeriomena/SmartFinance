import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEndpoint } from '../../contexts/EndpointContext';

type AuthAction = 
  | { type: 'LOGIN'; token: string; userId: string }
  | { type: 'LOGOUT' };

interface AuthState {
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      localStorage.setItem('userId', action.userId);
      return { token: action.token, userId: action.userId };
    case 'LOGOUT':
      localStorage.clear();
      return { token: null, userId: null };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  login: (token: string, userId: string) => void;
  logout: () => void;
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
  const { setSelectedBusinessId, setEndpoint } = useEndpoint();
  const navigate = useNavigate();

  const login = (token: string, userId: string) => {
    dispatch({ type: 'LOGIN', token, userId });
    navigate('/');
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setSelectedBusinessId(null);
    setEndpoint('/api/businesses');
    navigate('/login');
  };

  useEffect(() => {
    if (!state.token) {
      navigate('/login');
    }
  }, [state.token, navigate]);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
