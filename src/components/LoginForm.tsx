import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onForgotPassword: () => void;
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For testing purposes, we'll just call onLogin without any validation
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-1 sm:space-y-2">
        <label className="block text-sm font-medium text-white/80">Email</label>
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

      <div className="space-y-1 sm:space-y-2">
        <label className="block text-sm font-medium text-white/80">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D58A31] h-4 w-4 sm:h-5 sm:w-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-[#D58A31] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-[#D58A31] rounded border-white/10 bg-white/5 focus:ring-[#D58A31] transition-colors"
          />
          <span className="ml-2 text-xs sm:text-sm text-white/80">Remember me</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-xs sm:text-sm text-[#D58A31] hover:text-white transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#D58A31] text-white py-2.5 sm:py-3 rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium shadow-lg text-sm sm:text-base"
      >
        Sign In
      </button>
    </form>
  );
};