import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessResetProps {
  onBackToLogin: () => void;
}

export const SuccessReset: React.FC<SuccessResetProps> = ({ onBackToLogin }) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <img 
          src="/app_icon.svg" 
          alt="SmartPark Logo" 
          className="w-32 h-32 mx-auto mb-4"
        />
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Password Reset Successfully</h1>
        <p className="text-gray-300">
          Your password has been reset successfully. You can now log in with your new password.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
        <button
          onClick={onBackToLogin}
          className="w-full bg-[#D58A31] text-white py-3 rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium shadow-lg"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};