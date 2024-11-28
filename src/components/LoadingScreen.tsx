import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181A2D] to-[#68262F]">
      <div className="text-center px-4 sm:px-6">
        <div className="relative">
          <img 
            src="/app_icon.svg" 
            alt="Sparked Logo" 
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto animate-pulse"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-16 sm:h-20 bg-gradient-to-t from-[#D58A31]/20 to-transparent rounded-full blur-lg"></div>
        </div>
        <div className="mt-6 sm:mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Sparked</h1>
          <p className="text-base sm:text-lg text-[#D58A31]">Intelligent Parking Solutions</p>
        </div>
      </div>
    </div>
  );
};