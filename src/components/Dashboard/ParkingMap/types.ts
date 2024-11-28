export interface SpotDetails {
  spotNumber: string;
  lastOccupied: string;
  averageTimeOccupied: string;
}

export interface ParkingSpot {
  id: string;
  coordinates: { x: number; y: number };
  orientation: 'horizontal' | 'vertical';
  direction: 'up' | 'down' | 'left' | 'right';
  status: 'available' | 'occupied';
  type: 'regular' | 'disabled' | 'maternity';
  image?: string;
  details?: SpotDetails;
}

export interface ZoneConfig {
  spotWidth: number;
  spotHeight: number;
  centerOffset: {
    x: number;
    y: number;
  };
}

export interface ParkingZone {
  config: ZoneConfig;
  spots: ParkingSpot[];
}

export interface ParkingZones {
  [key: string]: ParkingZone;
}