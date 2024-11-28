import React, { useState } from 'react';
import { X, Car, Baby, Accessibility } from 'lucide-react';
import { ParkingSpot as ParkingSpotType } from './types';

interface ParkingSpotProps {
  spot: ParkingSpotType;
  dimensions: {
    width: number;
    height: number;
  };
}

export const ParkingSpot: React.FC<ParkingSpotProps> = ({ spot, dimensions }) => {
  const [showModal, setShowModal] = useState(false);

  const minDimension = Math.min(dimensions.width, dimensions.height);
  const dotSize = Math.max(minDimension * 0.15, 6);

  const getSpotColor = () => {
    if (spot.status === 'occupied') return 'bg-red-500';
    switch (spot.type) {
      case 'disabled': return 'bg-blue-500';
      case 'maternity': return 'bg-pink-500';
      default: return 'bg-green-500';
    }
  };

  const getSpotBorderColor = () => {
    if (spot.status === 'occupied') return 'border-red-500';
    switch (spot.type) {
      case 'disabled': return 'border-blue-500';
      case 'maternity': return 'border-pink-500';
      default: return 'border-green-500';
    }
  };

  const getSpotGlow = () => {
    if (spot.status === 'occupied') {
      return 'shadow-[0_0_20px_rgba(239,68,68,0.8)]';
    }
    switch (spot.type) {
      case 'disabled':
        return 'shadow-[0_0_20px_rgba(59,130,246,0.8)]';
      case 'maternity':
        return 'shadow-[0_0_20px_rgba(236,72,153,0.8)]';
      default:
        return 'shadow-[0_0_20px_rgba(34,197,94,0.8)]';
    }
  };

  const getSpotIcon = () => {
    switch (spot.type) {
      case 'disabled':
        return <Accessibility className="w-5 h-5 text-blue-500" />;
      case 'maternity':
        return <Baby className="w-5 h-5 text-pink-500" />;
      default:
        return <Car className="w-5 h-5 text-green-500" />;
    }
  };

  const handleSpotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleModalClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(false);
  };

  return (
    <>
      <div 
        role="button"
        tabIndex={0}
        onClick={handleSpotClick}
        className="absolute group cursor-pointer"
        style={{
          left: spot.coordinates.x,
          top: spot.coordinates.y,
          transform: 'translate(-50%, -50%)',
          width: dimensions.width,
          height: dimensions.height,
          zIndex: 1
        }}
      >
        <div 
          className={`relative border-2 ${getSpotBorderColor()} rounded-md transition-all duration-300 group-hover:scale-105`}
          style={{
            width: '100%',
            height: '100%',
            transform: `${spot.orientation === 'vertical' ? 'rotate(90deg)' : ''} ${
              spot.direction === 'down' ? 'rotate(180deg)' : 
              spot.direction === 'left' ? 'rotate(-90deg)' : 
              spot.direction === 'right' ? 'rotate(90deg)' : ''
            }`
          }}
        >
          <div className="absolute inset-x-0 h-1 bg-white/30" 
            style={{ 
              top: spot.direction === 'down' ? 'auto' : 0,
              bottom: spot.direction === 'down' ? 0 : 'auto'
            }} 
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div 
            className={`absolute -inset-2 rounded-full ${getSpotGlow()} blur-md animate-pulse`} 
            style={{ 
              width: dotSize * 2,
              height: dotSize * 2,
              margin: -dotSize
            }}
          />
          <div 
            className={`relative rounded-full ${getSpotColor()} transition-transform duration-300 group-hover:scale-125`}
            style={{ 
              width: dotSize,
              height: dotSize
            }}
          >
            <div 
              className={`absolute inset-0 rounded-full ${getSpotColor()} opacity-75 blur-sm`}
              style={{ 
                width: dotSize,
                height: dotSize
              }}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={handleModalClose}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="relative w-full max-w-lg mx-4 bg-[#181A2D] rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {spot.image && (
              <div className="relative h-64">
                <img 
                  src={spot.image} 
                  alt={`Parking spot ${spot.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181A2D] to-transparent" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getSpotIcon()}
                  <div>
                    <h3 className="text-2xl font-bold text-white">Spot {spot.id}</h3>
                    <p className="text-white/70">
                      {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)} Parking
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  spot.status === 'occupied'
                    ? 'bg-red-500/20 text-red-500'
                    : 'bg-green-500/20 text-green-500'
                }`}>
                  {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                </span>
              </div>

              {spot.details && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-white/70 mb-1">Last Occupied</h4>
                    <p className="text-white">{spot.details.lastOccupied}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/70 mb-1">Average Stay Time</h4>
                    <p className="text-white">{spot.details.averageTimeOccupied}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};