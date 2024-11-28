import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useZoneContext } from '../../../contexts/ZoneContext';
import { getNextZone, getPreviousZone } from '../../../data/zones';

export const ZoneSelector = () => {
  const { selectedZone, setSelectedZone } = useZoneContext();

  return (
    <div className="flex items-center justify-center space-x-6 relative z-30">
      <button
        onClick={() => setSelectedZone(getPreviousZone(selectedZone))}
        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex items-center space-x-3">
        <span className="text-2xl font-bold text-white">Zone {selectedZone}</span>
      </div>

      <button
        onClick={() => setSelectedZone(getNextZone(selectedZone))}
        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};