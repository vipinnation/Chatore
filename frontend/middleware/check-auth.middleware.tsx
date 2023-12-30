'use client';
import { CookieProvider } from '@/utils/cookies.util';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextData {
  user: any;
  token: string | undefined | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, settoken] = useState<string | undefined | null>('');
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkUserAuthenticated();
  }, []);

  const checkUserAuthenticated = () => {
    try {
      let token = CookieProvider.getUnencryptedCookies('token');
      if (token) setisAuthenticated((_prev) => true);
      else if (!token) setisAuthenticated((_prev) => false);
    } catch (error) {}
  };
  return (
    <AuthContext.Provider value={{ user: {}, token: null, isAuthenticated: isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
