import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Menu } from 'lucide-react';
import { DashboardContent } from './DashboardContent';
import { ParkingEditor } from './ParkingEditor';
import { NotificationManager } from './NotificationManager';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<'dashboard' | 'edit' | 'notifications'>('dashboard');

  const handleNavigate = (route: 'dashboard' | 'edit' | 'notifications') => {
    setCurrentRoute(route);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors ${
          isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
        currentRoute={currentRoute}
        onLogout={onLogout}
      />

      {/* Main content area */}
      <div className="flex-1 lg:ml-[280px]">
        {/* TopBar */}
        <TopBar currentRoute={currentRoute} />

        {/* Main content */}
        <main className="mt-16 p-4 sm:p-6 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#181A2D] to-[#68262F]">
          {currentRoute === 'dashboard' ? (
            <DashboardContent />
          ) : currentRoute === 'edit' ? (
            <ParkingEditor />
          ) : (
            <NotificationManager />
          )}
        </main>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};