import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthContainerProps {
  isLogin: boolean;
  onToggle: () => void;
  onForgotPassword: () => void;
  onLogin: () => void;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ 
  isLogin, 
  onToggle,
  onForgotPassword,
  onLogin
}) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181A2D] to-[#68262F] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 sm:mb-6">
          <img 
            src="/app_icon.svg" 
            alt="Sparked Logo" 
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            {isLogin ? (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={onToggle}
                  className="text-[#D58A31] hover:text-white transition-colors"
                >
                  Sign up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  onClick={onToggle}
                  className="text-[#D58A31] hover:text-white transition-colors"
                >
                  Sign in
                </button>
              </span>
            )}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isLogin ? (
                <LoginForm 
                  onForgotPassword={onForgotPassword}
                  onLogin={onLogin}
                />
              ) : (
                <SignupForm />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};