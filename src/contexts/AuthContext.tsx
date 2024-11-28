import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isDashboardLoading: boolean;
  isLogin: boolean;
  showForgotPassword: boolean;
  login: () => void;
  logout: () => void;
  toggleAuthMode: () => void;
  showForgotPasswordFlow: () => void;
  hideForgotPasswordFlow: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(() => {
    setIsDashboardLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsDashboardLoading(false);
    }, 1500);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsLogin(true);
  }, []);

  const toggleAuthMode = useCallback(() => {
    setIsLogin(prev => !prev);
  }, []);

  const showForgotPasswordFlow = useCallback(() => {
    setShowForgotPassword(true);
  }, []);

  const hideForgotPasswordFlow = useCallback(() => {
    setShowForgotPassword(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isDashboardLoading,
        isLogin,
        showForgotPassword,
        login,
        logout,
        toggleAuthMode,
        showForgotPasswordFlow,
        hideForgotPasswordFlow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};