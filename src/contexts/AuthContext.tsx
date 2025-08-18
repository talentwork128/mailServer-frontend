import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authAPI, removeAuthToken, getAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, company?: string) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (token: string, email: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const initializeAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await authAPI.getProfile();
          if (response.success) {
            setUser(response.data.user);
          } else {
            removeAuthToken();
          }
        } catch (error) {
          console.error('Failed to get user profile:', error);
          removeAuthToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        setUser(response.data.user);
        setIsLoading(false);
        return true;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message?.includes('Email not verified')) {
        // You might want to handle this differently
        throw new Error('Please verify your email address before logging in.');
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string, company?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.register({ name, email, password, company });
      setIsLoading(false);
      return response.success;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const verifyEmail = async (token: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.verifyEmail(token, email);
      
      if (response.success) {
        setUser(response.data.user);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Email verification error:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const resendVerification = async (email: string): Promise<boolean> => {
    try {
      const response = await authAPI.resendVerification(email);
      return response.success;
    } catch (error) {
      console.error('Resend verification error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      removeAuthToken();
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    verifyEmail,
    resendVerification,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};