import React from 'react';

export const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181A2D] to-[#68262F]/90 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <img 
            src="/app_icon.svg" 
            alt="Sparked Logo" 
            className="w-24 h-24 mx-auto animate-pulse"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gradient-to-t from-[#D58A31]/20 to-transparent rounded-full blur-lg"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Loading Dashboard</h2>
          <p className="text-[#D58A31]">Retrieving parking data...</p>
        </div>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-[#D58A31]/20 border-t-[#D58A31] rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};