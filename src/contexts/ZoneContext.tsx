import React, { createContext, useContext, useState } from 'react';

export const PARKING_ZONES = ['A', 'B', 'C'] as const;
export type ParkingZone = typeof PARKING_ZONES[number];

interface ZoneContextType {
  selectedZone: ParkingZone;
  setSelectedZone: (zone: ParkingZone) => void;
}

const ZoneContext = createContext<ZoneContextType | undefined>(undefined);

export const ZoneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedZone, setSelectedZone] = useState<ParkingZone>(PARKING_ZONES[0]);

  return (
    <ZoneContext.Provider value={{ selectedZone, setSelectedZone }}>
      {children}
    </ZoneContext.Provider>
  );
};

export const useZoneContext = () => {
  const context = useContext(ZoneContext);
  if (context === undefined) {
    throw new Error('useZoneContext must be used within a ZoneProvider');
  }
  return context;
};

export const getNextZone = (currentZone: ParkingZone): ParkingZone => {
  const currentIndex = PARKING_ZONES.indexOf(currentZone);
  return PARKING_ZONES[(currentIndex + 1) % PARKING_ZONES.length];
};

export const getPreviousZone = (currentZone: ParkingZone): ParkingZone => {
  const currentIndex = PARKING_ZONES.indexOf(currentZone);
  return PARKING_ZONES[(currentIndex - 1 + PARKING_ZONES.length) % PARKING_ZONES.length];
};