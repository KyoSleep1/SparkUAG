import React, { useState } from 'react';
import { AlertCircle, Bell, Trash2, Search, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';
import type { NotificationType } from '../../../types/notification';

const NOTIFICATIONS_PER_PAGE = 5;

export const NotificationList = () => {
  const { notifications, deleteNotification } = useNotifications();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(search.toLowerCase()) ||
                         notification.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredNotifications.length / NOTIFICATIONS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * NOTIFICATIONS_PER_PAGE,
    currentPage * NOTIFICATIONS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Active Notifications</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notifications..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/30"
          />
        </div>

        <div className="relative">
          <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as NotificationType | 'all')}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white appearance-none"
          >
            <option value="all">All Types</option>
            <option value="info">Information</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">No notifications found</p>
          </div>
        ) : (
          paginatedNotifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-white/5 border border-white/10 rounded-lg p-4 transition-colors ${
                notification.type === 'warning' ? 'bg-yellow-500/5' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <h4 className="text-lg font-medium text-white">{notification.title}</h4>
                    {notification.isHighPriority && (
                      <span className="text-sm text-yellow-500 font-medium">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 mb-2">{notification.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/50">
                    <span>Created: {new Date(notification.timestamp).toLocaleString()}</span>
                    {notification.expiresAt && (
                      <span>Expires: {new Date(notification.expiresAt).toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-white/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-[#D58A31] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};