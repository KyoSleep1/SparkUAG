import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParkingSpot } from './types';

interface ParkingGridProps {
  spots: ParkingSpot[];
}

export const ParkingGrid: React.FC<ParkingGridProps> = ({ spots }) => {
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

  const getSpotStyles = (spot: ParkingSpot) => {
    const baseStyles = 'relative w-16 h-8 border-2 rounded-md transition-all duration-300 hover:scale-105';
    
    // If spot is occupied, always show red regardless of type
    if (spot.status === 'occupied') {
      return `${baseStyles} border-red-500 bg-red-500/10`;
    }

    // If spot is available or reserved, color based on type
    switch (spot.type) {
      case 'maternity':
        return `${baseStyles} border-pink-500 bg-pink-500/10`;
      case 'accessible':
        return `${baseStyles} border-blue-500 bg-blue-500/10`;
      default:
        return `${baseStyles} border-green-500 bg-green-500/10`;
    }
  };

  return (
    <>
      <div className="relative w-full h-full bg-[#181A2D] rounded-xl">
        {/* Grid background */}
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Parking spots */}
        {spots.map((spot) => (
          <div
            key={spot.id}
            className="absolute"
            style={{
              left: spot.position.x,
              top: spot.position.y,
              transform: `translate(-50%, -50%)`,
            }}
          >
            {/* Spot rectangle */}
            <div
              className={getSpotStyles(spot)}
              onMouseEnter={() => setHoveredSpot(spot.id)}
              onMouseLeave={() => setHoveredSpot(null)}
              style={{
                transform: `rotate(${spot.rotation}deg)`
              }}
            >
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Tooltips container - positioned fixed relative to viewport */}
      <AnimatePresence>
        {hoveredSpot && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-[9999]"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-lg shadow-xl w-[300px] overflow-hidden">
              {spots.find(s => s.id === hoveredSpot)?.image && (
                <img 
                  src={spots.find(s => s.id === hoveredSpot)?.image} 
                  alt={`Spot ${hoveredSpot}`}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Spot {hoveredSpot}</h3>
                  {spots.find(s => s.id === hoveredSpot) && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      spots.find(s => s.id === hoveredSpot)?.status === 'occupied'
                        ? 'bg-red-500/20 text-red-500'
                        : spots.find(s => s.id === hoveredSpot)?.type === 'maternity'
                        ? 'bg-pink-500/20 text-pink-500'
                        : spots.find(s => s.id === hoveredSpot)?.type === 'accessible'
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-green-500/20 text-green-500'
                    }`}>
                      {(spots.find(s => s.id === hoveredSpot)?.status.charAt(0).toUpperCase() + 
                        spots.find(s => s.id === hoveredSpot)?.status.slice(1)) || ''}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-white/70">
                    <span className="font-medium text-white">Type:</span>{' '}
                    <span className="capitalize">
                      {spots.find(s => s.id === hoveredSpot)?.type}
                    </span>
                  </p>
                  {spots.find(s => s.id === hoveredSpot)?.lastOccupied && (
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white">Last occupied:</span>{' '}
                      {spots.find(s => s.id === hoveredSpot)?.lastOccupied}
                    </p>
                  )}
                  {spots.find(s => s.id === hoveredSpot)?.averageTime && (
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white">Average time:</span>{' '}
                      {spots.find(s => s.id === hoveredSpot)?.averageTime}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};