import React from 'react';
import { ParkingSpotEditor } from './ParkingSpotEditor';
import { ZoneSelector } from './ZoneSelector';
import { InteractiveMap } from '../ParkingMap';
import { useParkingContext } from '../../../contexts/ParkingContext';
import { useZoneContext } from '../../../contexts/ZoneContext';

export const ParkingEditor = () => {
  const { parkingData } = useParkingContext();
  const { selectedZone } = useZoneContext();

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <ZoneSelector />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Interactive Map</h2>
        <InteractiveMap />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <ParkingSpotEditor spots={parkingData[selectedZone].spots} />
      </div>
    </div>
  );
};