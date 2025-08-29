import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '@/config/api';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: ( user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const fetchUser = async () => {
  const response = await fetch(API_ENDPOINTS.USER_INFO, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { data } = await response.json();
  return data.user;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      fetchUser().then((user) => {
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user));
        const userData = localStorage.getItem('user');
        setUser(JSON.parse(userData as string));
        setIsLoading(false);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
  },[])

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    fetch(API_ENDPOINTS.LOGOUT, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
    Cookies.remove('user');
    localStorage.removeItem('user');
    }).catch(() => {
      console.log('error in logout ')
    })

    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};