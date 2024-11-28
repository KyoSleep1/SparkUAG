import React, { useState } from 'react';
import { Mail } from 'lucide-react';

interface RequestResetProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
}

export const RequestReset: React.FC<RequestResetProps> = ({ onSubmit, onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-4 sm:mb-6">
        <img 
          src="/app_icon.svg" 
          alt="SmartPark Logo" 
          className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-sm sm:text-base text-gray-300">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-sm font-medium text-white/80">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D58A31] h-4 w-4 sm:h-5 sm:w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-[#D58A31] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D58A31] text-white py-2.5 sm:py-3 rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium shadow-lg text-sm sm:text-base"
          >
            Send Reset Instructions
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full text-white/80 hover:text-white py-2 text-sm sm:text-base transition-colors duration-200"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};