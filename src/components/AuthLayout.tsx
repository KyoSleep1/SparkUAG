import React from 'react';
import { Car } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#181A2D] items-center justify-center p-12">
        <div className="max-w-lg">
          <Car className="w-20 h-20 text-[#D58A31] mb-8" />
          <h2 className="text-4xl font-bold text-white mb-4">Sparked</h2>
          <p className="text-gray-300">
            Manage your parking space efficiently with our intelligent parking system.
            Real-time monitoring, easy booking, and seamless management.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#181A2D]">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};