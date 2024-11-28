export type TrafficStatus = 'low' | 'medium' | 'high';
export type SpotType = 'regular' | 'disabled' | 'maternity';
export type SpotStatus = 'available' | 'occupied';
export type SpotDirection = 'up' | 'down' | 'left' | 'right';

export interface SpotDetails {
  lastOccupied: string;
  averageTimeOccupied: string;
}

export interface ParkingSpot {
  id: string;
  coordinates: { x: number; y: number };
  direction: SpotDirection;
  status: SpotStatus;
  type: SpotType;
  image?: string;
  details: SpotDetails;
}

export interface ZoneConfig {
  spotWidth: number;
  spotHeight: number;
  centerOffset: {
    x: number;
    y: number;
  };
}

export interface ZoneStats {
  regular: { available: number; total: number };
  disabled: { available: number; total: number };
  maternity: { available: number; total: number };
}

export interface ParkingZone {
  config: ZoneConfig;
  spots: ParkingSpot[];
  stats: ZoneStats;
  trafficStatus: TrafficStatus;
  generalTraffic: TrafficStatus;
  averageStayTime: string;
}

export interface ParkingData {
  [key: string]: ParkingZone;
}