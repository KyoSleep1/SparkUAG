import React from 'react';
import { 
  LayoutDashboard, 
  Edit,
  Bell,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: 'dashboard' | 'edit' | 'notifications') => void;
  currentRoute: 'dashboard' | 'edit' | 'notifications';
  onLogout: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', route: 'dashboard' as const },
  { icon: Edit, label: 'Edit Spaces', route: 'edit' as const },
  { icon: Bell, label: 'Notifications', route: 'notifications' as const }
];

export const Sidebar = ({ isOpen, onClose, onNavigate, currentRoute, onLogout }: SidebarProps) => {
  return (
    <aside 
      className={`fixed top-0 left-0 h-full w-[280px] bg-white/10 backdrop-blur-md border-r border-white/10 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 text-white/70 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src="/app_icon.svg"
            alt="Sparked Logo"
            className="w-10 h-10"
          />
          <div>
            <h1 className="text-xl font-bold text-white">Sparked</h1>
            <p className="text-xs text-[#D58A31]">Intelligent Parking</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.route)}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-colors ${
                currentRoute === item.route
                  ? 'bg-[#D58A31] text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};