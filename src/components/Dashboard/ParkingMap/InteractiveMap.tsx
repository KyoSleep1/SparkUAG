import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useZoneContext } from '../../../contexts/ZoneContext';
import { useParkingContext } from '../../../contexts/ParkingContext';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ParkingSpots } from './ParkingSpots';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;
const GRID_SIZE = 40;

interface ViewState {
  zoom: number;
  pan: { x: number; y: number };
}

const INITIAL_VIEW: ViewState = {
  zoom: 1,
  pan: { x: 0, y: 0 }
};

export const InteractiveMap: React.FC = () => {
  const { selectedZone } = useZoneContext();
  const { parkingData } = useParkingContext();
  const zoneData = parkingData[selectedZone];
  
  const [view, setView] = useState<ViewState>(INITIAL_VIEW);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasChanges, setHasChanges] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Track view changes
  useEffect(() => {
    if (view.zoom !== INITIAL_VIEW.zoom || 
        view.pan.x !== INITIAL_VIEW.pan.x || 
        view.pan.y !== INITIAL_VIEW.pan.y) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [view]);

  const handleZoomIn = () => {
    setView(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom + ZOOM_STEP, MAX_ZOOM)
    }));
  };

  const handleZoomOut = () => {
    setView(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom - ZOOM_STEP, MIN_ZOOM)
    }));
  };

  const handleReset = () => {
    setView(INITIAL_VIEW);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - view.pan.x, 
      y: e.clientY - view.pan.y 
    });
  }, [view.pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setView(prev => ({
      ...prev,
      pan: {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }
    }));
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Calculate grid size and position
  const getGridStyle = () => {
    const scaledSize = GRID_SIZE * view.zoom;
    const { x, y } = view.pan;

    // Calculate grid offset to ensure seamless tiling
    const offsetX = x % scaledSize;
    const offsetY = y % scaledSize;

    return {
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
      backgroundSize: `${scaledSize}px ${scaledSize}px`,
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      width: '200%',
      height: '200%',
      left: '-50%',
      top: '-50%',
      position: 'absolute' as const
    };
  };

  return (
    <div className="relative w-full h-[420px] bg-[#181A2D] rounded-lg overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-50 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          disabled={view.zoom >= MAX_ZOOM}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={view.zoom <= MIN_ZOOM}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        {hasChanges && (
          <button
            onClick={handleReset}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Map container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Infinite grid background */}
        <div 
          ref={gridRef}
          className="absolute inset-0 overflow-hidden"
          style={getGridStyle()}
        />
        
        {/* Parking zone container */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${view.pan.x}px, ${view.pan.y}px) scale(${view.zoom})`
          }}
        >
          <div 
            className="relative origin-center"
            style={{
              transform: `translate(${zoneData.config.centerOffset.x}px, ${zoneData.config.centerOffset.y}px)`
            }}
          >
            <ParkingSpots />
          </div>
        </div>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white/70">
        {Math.round(view.zoom * 100)}%
      </div>
    </div>
  );
};