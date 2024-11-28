import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  BarChart3, 
  Timer,
  History,
  Car,
  Baby,
  Accessibility,
  ChevronDown,
  Activity
} from 'lucide-react';
import { InteractiveMap } from './ParkingMap';
import { useZoneContext, PARKING_ZONES } from '../../contexts/ZoneContext';
import { useParkingContext } from '../../contexts/ParkingContext';
import type { TrafficStatus } from '../../types/parking';

export const DashboardContent = () => {
  const { selectedZone, setSelectedZone } = useZoneContext();
  const { parkingData } = useParkingContext();
  const [isZoneMenuOpen, setIsZoneMenuOpen] = useState(false);
  const [zoneButtonRect, setZoneButtonRect] = useState<DOMRect | null>(null);
  const zoneData = parkingData[selectedZone];

  const getTrafficStatusColor = (status: TrafficStatus) => {
    switch (status) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
    }
  };

  const handleZoneButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setZoneButtonRect(rect);
    setIsZoneMenuOpen(!isZoneMenuOpen);
  };

  const getOccupiedSpots = (type: 'regular' | 'disabled' | 'maternity') => {
    return zoneData.spots.filter(spot => spot.type === type && spot.status === 'occupied').length;
  };

  return (
    <div className="space-y-4">
      {/* Unified Stats Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Parking Overview - Zone {selectedZone}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Spots Stats */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/70">Currently Occupied Spots</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Regular Spots */}
              <div className="space-y-2">
                <div className="flex items-center text-white/70">
                  <Car className="w-5 h-5 text-[#D58A31] mr-2" />
                  <span>Regular</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white">{getOccupiedSpots('regular')}</span>
                  <span className="ml-2 text-sm text-white/50">/ {zoneData.stats.regular.total}</span>
                </div>
              </div>

              {/* Accessible Spots */}
              <div className="space-y-2">
                <div className="flex items-center text-white/70">
                  <Accessibility className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Accessible</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white">{getOccupiedSpots('disabled')}</span>
                  <span className="ml-2 text-sm text-white/50">/ {zoneData.stats.disabled.total}</span>
                </div>
              </div>

              {/* Maternity Spots */}
              <div className="space-y-2">
                <div className="flex items-center text-white/70">
                  <Baby className="w-5 h-5 text-pink-500 mr-2" />
                  <span>Maternity</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white">{getOccupiedSpots('maternity')}</span>
                  <span className="ml-2 text-sm text-white/50">/ {zoneData.stats.maternity.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:border-l lg:border-white/10 lg:pl-4">
            {/* Zone Traffic Status */}
            <div className="space-y-2">
              <div className="flex items-center text-white/70">
                <BarChart3 className="w-5 h-5 text-[#D58A31] mr-2" />
                <span>Zone Traffic Status</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white capitalize">{zoneData.trafficStatus}</span>
                <span className={`ml-2 w-2.5 h-2.5 rounded-full ${getTrafficStatusColor(zoneData.trafficStatus)}`}></span>
              </div>
            </div>

            {/* General Traffic */}
            <div className="space-y-2">
              <div className="flex items-center text-white/70">
                <Activity className="w-5 h-5 text-[#D58A31] mr-2" />
                <span>General Traffic</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white capitalize">{zoneData.generalTraffic}</span>
                <span className={`ml-2 w-2.5 h-2.5 rounded-full ${getTrafficStatusColor(zoneData.generalTraffic)}`}></span>
              </div>
            </div>

            {/* Average Stay Time */}
            <div className="space-y-2">
              <div className="flex items-center text-white/70">
                <Timer className="w-5 h-5 text-[#D58A31] mr-2" />
                <span>Average Stay</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">{zoneData.averageStayTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Interactive Map</h2>
          <div>
            <button
              onClick={handleZoneButtonClick}
              className="flex items-center space-x-2 px-4 py-2 bg-[#D58A31] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>Zone {selectedZone}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isZoneMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        
        <InteractiveMap />
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <History className="w-6 h-6 text-[#D58A31]" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-white">Spot {selectedZone}12 became available</span>
            </div>
            <span className="text-white/50 text-sm">2m ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-white">Spot {selectedZone}03 was occupied</span>
            </div>
            <span className="text-white/50 text-sm">5m ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-white">Traffic increased in Zone {selectedZone}</span>
            </div>
            <span className="text-white/50 text-sm">12m ago</span>
          </div>
        </div>
      </div>

      {/* Zone Selector Portal */}
      {isZoneMenuOpen && zoneButtonRect && createPortal(
        <div className="fixed inset-0 z-[9999]">
          <div 
            className="absolute inset-0" 
            onClick={() => setIsZoneMenuOpen(false)}
          />
          <div 
            className="absolute bg-white/10 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden"
            style={{
              top: zoneButtonRect.bottom + 8,
              left: zoneButtonRect.left,
              width: zoneButtonRect.width,
              minWidth: '120px'
            }}
          >
            {PARKING_ZONES.map((zone) => (
              <button
                key={zone}
                onClick={() => {
                  setSelectedZone(zone);
                  setIsZoneMenuOpen(false);
                }}
                className={`w-full px-4 py-2 text-left transition-colors ${
                  selectedZone === zone
                    ? 'bg-[#D58A31] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                Zone {zone}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};