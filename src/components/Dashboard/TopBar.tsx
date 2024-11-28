import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, AlertTriangle, Info } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface TopBarProps {
  currentRoute: 'dashboard' | 'edit' | 'notifications';
}

// Mock user data
const userData = {
  name: 'Luis Rochin',
  email: 'luis@example.com',
  avatar: null // We'll use initials if no avatar is provided
};

export const TopBar: React.FC<TopBarProps> = ({ currentRoute }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Only count unread high priority notifications for the badge
  const unreadHighPriorityCount = notifications.filter(n => !n.read && n.isHighPriority).length;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const getNotificationIcon = (type: 'info' | 'warning') => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current && 
        buttonRef.current && 
        !notificationsRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-16 bg-white/10 backdrop-blur-md border-b border-white/10 fixed top-0 right-0 left-0 lg:left-[280px] z-20">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white ml-12 lg:ml-0">
          {currentRoute === 'dashboard' ? 'Dashboard' : 
           currentRoute === 'edit' ? 'Edit Parking Spaces' :
           'Notification Manager'}
        </h2>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <button 
              ref={buttonRef}
              className={`p-2 transition-colors rounded-lg ${
                showNotifications 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              {unreadHighPriorityCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadHighPriorityCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="fixed inset-0 z-[9999] lg:relative lg:inset-auto">
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
                  onClick={() => setShowNotifications(false)}
                />
                <div 
                  ref={notificationsRef}
                  className="fixed right-4 left-4 top-20 lg:absolute lg:right-0 lg:left-auto lg:top-full lg:w-96 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                    <button
                      onClick={markAllAsRead}
                      className="flex items-center space-x-1 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Mark all as read</span>
                    </button>
                  </div>
                  <div className="max-h-[60vh] lg:max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-white/50">
                        No notifications
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <button
                          key={notification.id}
                          onClick={() => !notification.read && markAsRead(notification.id)}
                          className={`w-full p-4 border-b border-white/10 hover:bg-white/5 transition-colors text-left ${
                            notification.type === 'warning' ? 'bg-yellow-500/5' : 'bg-blue-500/5'
                          } ${notification.read ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-medium text-white">
                                  {notification.title}
                                </h4>
                                {notification.isHighPriority && (
                                  <span className="text-xs font-medium text-yellow-500">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-white/70">
                                {notification.message}
                              </p>
                              <span className="text-xs text-white/50 mt-1 block">
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 py-2 px-2 sm:px-3">
            {userData.avatar ? (
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#D58A31] flex items-center justify-center text-white font-medium">
                {getInitials(userData.name)}
              </div>
            )}
            <span className="hidden sm:inline text-white font-medium">Hello, {userData.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};