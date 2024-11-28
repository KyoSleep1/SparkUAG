import React, { useState } from 'react';
import { AlertCircle, Bell } from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';
import { useZoneContext } from '../../../contexts/ZoneContext';
import type { NotificationType } from '../../../types/notification';

export const NotificationForm = () => {
  const { addNotification } = useNotifications();
  const { selectedZone } = useZoneContext();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as NotificationType,
    isHighPriority: false,
    zoneId: selectedZone
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addNotification(formData);

    setFormData({
      title: '',
      message: '',
      type: 'info',
      isHighPriority: false,
      zoneId: selectedZone
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30"
            placeholder="Notification title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Type</label>
          <div className="relative">
            <AlertCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#D58A31] w-5 h-5" />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as NotificationType })}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-2.5 text-white appearance-none"
            >
              <option value="info">Information</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Priority</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="highPriority"
              checked={formData.isHighPriority}
              onChange={(e) => setFormData({ ...formData, isHighPriority: e.target.checked })}
              className="w-4 h-4 text-[#D58A31] rounded border-white/10 bg-white/5 focus:ring-[#D58A31]"
            />
            <label htmlFor="highPriority" className="text-white">High Priority</label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 min-h-[100px]"
          placeholder="Notification message"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#D58A31] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Create Notification
        </button>
      </div>
    </form>
  );
};