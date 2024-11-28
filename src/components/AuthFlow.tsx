import React from 'react';
import { motion } from 'framer-motion';
import { AuthContainer } from './AuthContainer';
import { ForgotPasswordFlow } from './ForgotPasswordFlow';
import { useAuth } from '../contexts/AuthContext';

export const AuthFlow: React.FC = () => {
  const {
    isLogin,
    showForgotPassword,
    toggleAuthMode,
    showForgotPasswordFlow,
    hideForgotPasswordFlow,
    login,
  } = useAuth();

  return (
    <motion.div
      key="auth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showForgotPassword ? (
        <ForgotPasswordFlow onBackToLogin={hideForgotPasswordFlow} />
      ) : (
        <AuthContainer
          isLogin={isLogin}
          onToggle={toggleAuthMode}
          onForgotPassword={showForgotPasswordFlow}
          onLogin={login}
        />
      )}
    </motion.div>
  );
};