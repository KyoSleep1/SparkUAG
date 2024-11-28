import React from 'react';
import { ParkingSpot, MapDimensions } from './types';
import { convertToPixelCoordinates } from './utils';

interface ParkingSpotGroupProps {
  spots: ParkingSpot[];
  mapDimensions: MapDimensions;
}

export const ParkingSpotGroup: React.FC<ParkingSpotGroupProps> = ({ spots, mapDimensions }) => {
  if (spots.length === 0) return null;

  const mainSpot = spots[0];
  const { x, y } = convertToPixelCoordinates(mainSpot.coordinates, mapDimensions);

  // Increased spot sizes for better visibility
  const spotWidth = mainSpot.orientation === 'horizontal' ? 50 : 25;
  const spotHeight = mainSpot.orientation === 'horizontal' ? 25 : 50;
  const groupWidth = mainSpot.orientation === 'horizontal' ? spotWidth * spots.length : spotWidth;
  const groupHeight = mainSpot.orientation === 'vertical' ? spotHeight * spots.length : spotHeight;

  const getSpotColor = (spot: ParkingSpot) => {
    if (spot.status === 'occupied') return 'bg-red-500';
    switch (spot.type) {
      case 'disabled': return 'bg-blue-500';
      case 'maternity': return 'bg-pink-500';
      default: return 'bg-green-500';
    }
  };

  const getSpotShadow = (spot: ParkingSpot) => {
    if (spot.status === 'occupied') return 'shadow-[0_0_15px_rgba(239,68,68,0.5)]';
    switch (spot.type) {
      case 'disabled': return 'shadow-[0_0_15px_rgba(59,130,246,0.5)]';
      case 'maternity': return 'shadow-[0_0_15px_rgba(236,72,153,0.5)]';
      default: return 'shadow-[0_0_15px_rgba(34,197,94,0.5)]';
    }
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${groupWidth}px`,
        height: `${groupHeight}px`
      }}
    >
      <div className="relative w-full h-full">
        {spots.map((spot, index) => {
          const offsetX = mainSpot.orientation === 'horizontal' ? index * spotWidth : 0;
          const offsetY = mainSpot.orientation === 'vertical' ? index * spotHeight : 0;

          return (
            <div
              key={spot.id}
              className={`absolute ${getSpotColor(spot)} ${getSpotShadow(spot)} transition-all duration-300 hover:scale-105`}
              style={{
                left: `${offsetX}px`,
                top: `${offsetY}px`,
                width: `${spotWidth}px`,
                height: `${spotHeight}px`,
                borderRadius: '6px'
              }}
            >
              {/* Parking spot markers/lines based on direction */}
              <div className={`absolute ${
                spot.direction === 'up' ? 'top-0' :
                spot.direction === 'down' ? 'bottom-0' :
                spot.direction === 'left' ? 'left-0' :
                'right-0'
              } w-1.5 h-4 bg-white/50`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};