"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface User {
  usuarioId: number;
}

interface AuthContextType {
  user: User | null | undefined;
  login: (usuarioId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        setUser(JSON.parse(storedUser));
    } else {
        setUser(null);
    }

    }, []);

  const login = (usuarioId: number) => {
    const userData = {
      usuarioId,
    };

    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao salvar user no localStorage', error);
    }

    setUser(userData);
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Erro ao remover user do localStorage', error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }

  return context;
}
