import React from 'react';
import { Car, Baby, Accessibility } from 'lucide-react';
import { useZoneContext } from '../../../contexts/ZoneContext';
import { useParkingContext } from '../../../contexts/ParkingContext';
import { transformCoordinates } from '../../../utils/coordinates';
import type { ParkingSpot } from '../../../types/parking';

export const ParkingSpots: React.FC = () => {
  const { selectedZone } = useZoneContext();
  const { parkingData } = useParkingContext();
  const zoneData = parkingData[selectedZone];

  const getSpotColor = (spot: ParkingSpot) => {
    if (spot.status === 'occupied') {
      return 'bg-red-500/20 border-red-500';
    }
    
    switch (spot.type) {
      case 'disabled':
        return 'bg-blue-500/20 border-blue-500';
      case 'maternity':
        return 'bg-pink-500/20 border-pink-500';
      default:
        return 'bg-green-500/20 border-green-500';
    }
  };

  const getSpotIcon = (spot: ParkingSpot) => {
    const iconProps = {
      className: `w-5 h-5 ${
        spot.status === 'occupied'
          ? 'text-red-500'
          : spot.type === 'disabled'
          ? 'text-blue-500'
          : spot.type === 'maternity'
          ? 'text-pink-500'
          : 'text-green-500'
      }`
    };

    switch (spot.type) {
      case 'disabled':
        return <Accessibility {...iconProps} />;
      case 'maternity':
        return <Baby {...iconProps} />;
      default:
        return <Car {...iconProps} />;
    }
  };

  return (
    <>
      {zoneData.spots.map((spot) => {
        const { x, y } = transformCoordinates(
          spot.coordinates.x,
          spot.coordinates.y,
          zoneData.config
        );

        return (
          <div
            key={spot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              left: x,
              top: y,
              width: zoneData.config.spotWidth,
              height: zoneData.config.spotHeight,
            }}
          >
            {/* Spot rectangle */}
            <div
              className={`relative w-full h-full border-2 rounded-md ${getSpotColor(spot)} transition-all duration-300 group hover:scale-105`}
              style={{
                transform: `rotate(${
                  spot.direction === 'up' ? '0deg' :
                  spot.direction === 'right' ? '90deg' :
                  spot.direction === 'down' ? '180deg' :
                  '270deg'
                })`
              }}
            >
              {/* Direction indicator line */}
              <div 
                className="absolute h-1 bg-white/30"
                style={{
                  left: '0',
                  right: '0',
                  top: '0'
                }}
              />
            </div>

            {/* Icon container - doesn't rotate */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {getSpotIcon(spot)}
            </div>
          </div>
        );
      })}
    </>
  );
};