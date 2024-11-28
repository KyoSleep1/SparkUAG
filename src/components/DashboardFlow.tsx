import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from './Dashboard/DashboardLayout';
import { DashboardLoading } from './Dashboard/DashboardLoading';
import { useAuth } from '../contexts/AuthContext';
import { ParkingProvider } from '../contexts/ParkingContext';
import { ZoneProvider } from '../contexts/ZoneContext';

export const DashboardFlow: React.FC = () => {
  const { isDashboardLoading, logout } = useAuth();

  if (isDashboardLoading) {
    return (
      <motion.div
        key="dashboard-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DashboardLoading />
      </motion.div>
    );
  }

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ParkingProvider>
        <ZoneProvider>
          <DashboardLayout onLogout={logout} />
        </ZoneProvider>
      </ParkingProvider>
    </motion.div>
  );
};