import React from 'react';
import { ParkingSpot } from './ParkingSpot';
import { ParkingRow as ParkingRowType } from './types';

interface ParkingRowProps {
  row: ParkingRowType;
}

export const ParkingRow: React.FC<ParkingRowProps> = ({ row }) => {
  const { spots, orientation } = row;
  const firstSpot = spots[0];

  // Calculate the position for the entire row based on the first spot
  const style = {
    transform: `translate(${firstSpot.coordinates.x}px, ${firstSpot.coordinates.y}px)`,
  };

  return (
    <div 
      className={`absolute flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} gap-0`}
      style={style}
    >
      {spots.map((spot, index) => (
        <ParkingSpot
          key={`${spot.id}-${index}`}
          spot={{
            ...spot,
            coordinates: {
              x: orientation === 'horizontal' ? index * 48 : 0,
              y: orientation === 'vertical' ? index * 48 : 0
            }
          }}
        />
      ))}
    </div>
  );
};