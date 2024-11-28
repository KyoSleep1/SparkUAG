import React, { createContext, useContext, useState } from 'react';
import { 
  parkingData as initialParkingData, 
  updateParkingSpot as updateSpot, 
  addParkingSpot as addSpot,
  deleteParkingSpot as deleteSpot 
} from '../data/parkingData';
import type { ParkingData, ParkingSpot } from '../types/parking';

interface ParkingContextType {
  parkingData: ParkingData;
  updateSpot: (zoneId: string, spotId: string, updates: Partial<ParkingSpot>) => void;
  addSpot: (zoneId: string, spot: ParkingSpot) => void;
  deleteSpot: (zoneId: string, spotId: string) => void;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parkingData, setParkingData] = useState<ParkingData>(initialParkingData);

  const handleUpdateSpot = (zoneId: string, spotId: string, updates: Partial<ParkingSpot>) => {
    updateSpot(zoneId, spotId, updates);
    setParkingData({ ...initialParkingData });
  };

  const handleAddSpot = (zoneId: string, spot: ParkingSpot) => {
    addSpot(zoneId, spot);
    setParkingData({ ...initialParkingData });
  };

  const handleDeleteSpot = (zoneId: string, spotId: string) => {
    deleteSpot(zoneId, spotId);
    setParkingData({ ...initialParkingData });
  };

  return (
    <ParkingContext.Provider value={{ 
      parkingData, 
      updateSpot: handleUpdateSpot,
      addSpot: handleAddSpot,
      deleteSpot: handleDeleteSpot
    }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParkingContext = () => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error('useParkingContext must be used within a ParkingProvider');
  }
  return context;
};