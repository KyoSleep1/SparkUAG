import React from 'react';
import { NotificationList } from './NotificationList';
import { NotificationForm } from './NotificationForm';

export const NotificationManager = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-6">Create a notification</h2>
        <NotificationForm />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <NotificationList />
      </div>
    </div>
  );
};