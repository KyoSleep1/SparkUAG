import { v4 as uuidv4 } from 'uuid';
import { ParkingData, ParkingSpot, SpotType, SpotStatus, TrafficStatus } from '../types/parking';

const mockImages = [
  'https://images.unsplash.com/photo-1590674899484-13da0d1b3c76?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?w=400&auto=format&fit=crop&q=60',
];

const getRandomImage = () => mockImages[Math.floor(Math.random() * mockImages.length)];

const calculateZoneStats = (spots: ParkingSpot[]) => {
  const stats = {
    regular: { available: 0, total: 0 },
    disabled: { available: 0, total: 0 },
    maternity: { available: 0, total: 0 }
  };

  spots.forEach(spot => {
    switch (spot.type) {
      case 'regular':
        stats.regular.total++;
        if (spot.status === 'available') stats.regular.available++;
        break;
      case 'disabled':
        stats.disabled.total++;
        if (spot.status === 'available') stats.disabled.available++;
        break;
      case 'maternity':
        stats.maternity.total++;
        if (spot.status === 'available') stats.maternity.available++;
        break;
    }
  });

  return stats;
};

const createSpot = (
  x: number,
  y: number,
  type: SpotType,
  status: SpotStatus,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
): ParkingSpot => ({
  id: uuidv4(),
  coordinates: { x, y },
  direction,
  status,
  type,
  image: getRandomImage(),
  details: {
    lastOccupied: status === 'occupied' ? 'Currently occupied' : `${Math.floor(Math.random() * 3)} hours ago`,
    averageTimeOccupied: `${(Math.random() * 2 + 0.5).toFixed(1)} hours`
  }
});

export const parkingData: ParkingData = {
  'A': {
    config: {
      spotWidth: 40,
      spotHeight: 20,
      centerOffset: { x: 0, y: 0 }
    },
    spots: [
      // First row
      createSpot(-2, -1, 'regular', 'available'),
      createSpot(-1, -1, 'regular', 'occupied'),
      createSpot(0, -1, 'regular', 'available'),
      createSpot(1, -1, 'regular', 'occupied'),
      // Second row
      createSpot(-2, 1, 'disabled', 'available', 'down'),
      createSpot(-1, 1, 'disabled', 'available', 'down'),
      createSpot(0, 1, 'maternity', 'occupied', 'down'),
      createSpot(1, 1, 'maternity', 'available', 'down'),
    ],
    trafficStatus: 'low' as TrafficStatus,
    generalTraffic: 'medium' as TrafficStatus,
    averageStayTime: '2.5 hours',
    stats: {} as ReturnType<typeof calculateZoneStats>
  },
  'B': {
    config: {
      spotWidth: 40,
      spotHeight: 20,
      centerOffset: { x: 0, y: 0 }
    },
    spots: [
      // First column
      createSpot(-1, -2, 'regular', 'available', 'right'),
      createSpot(-1, -1, 'disabled', 'occupied', 'right'),
      createSpot(-1, 0, 'maternity', 'available', 'right'),
      // Second column
      createSpot(1, -2, 'regular', 'available', 'left'),
      createSpot(1, -1, 'disabled', 'occupied', 'left'),
      createSpot(1, 0, 'maternity', 'available', 'left'),
    ],
    trafficStatus: 'medium' as TrafficStatus,
    generalTraffic: 'high' as TrafficStatus,
    averageStayTime: '1.8 hours',
    stats: {} as ReturnType<typeof calculateZoneStats>
  },
  'C': {
    config: {
      spotWidth: 40,
      spotHeight: 20,
      centerOffset: { x: 0, y: 0 }
    },
    spots: [
      // L-shaped arrangement
      // Horizontal section
      createSpot(-2, -1, 'regular', 'available'),
      createSpot(-1, -1, 'disabled', 'occupied'),
      createSpot(0, -1, 'maternity', 'available'),
      // Vertical section
      createSpot(1, -1, 'regular', 'occupied', 'right'),
      createSpot(1, 0, 'disabled', 'available', 'right'),
      createSpot(1, 1, 'maternity', 'occupied', 'right'),
    ],
    trafficStatus: 'high' as TrafficStatus,
    generalTraffic: 'low' as TrafficStatus,
    averageStayTime: '3.2 hours',
    stats: {} as ReturnType<typeof calculateZoneStats>
  }
};

// Calculate stats for each zone
Object.keys(parkingData).forEach(zone => {
  parkingData[zone].stats = calculateZoneStats(parkingData[zone].spots);
});

export const updateParkingSpot = (
  zoneId: string,
  spotId: string,
  updates: Partial<ParkingSpot>
) => {
  if (!parkingData[zoneId]) return;

  const spotIndex = parkingData[zoneId].spots.findIndex(s => s.id === spotId);
  if (spotIndex === -1) return;

  parkingData[zoneId].spots[spotIndex] = {
    ...parkingData[zoneId].spots[spotIndex],
    ...updates
  };

  // Recalculate stats for the zone
  parkingData[zoneId].stats = calculateZoneStats(parkingData[zoneId].spots);
};

export const addParkingSpot = (zoneId: string, spot: Partial<ParkingSpot>) => {
  if (!parkingData[zoneId]) return;

  const newSpot = createSpot(
    spot.coordinates?.x || 0,
    spot.coordinates?.y || 0,
    spot.type || 'regular',
    spot.status || 'available',
    spot.direction || 'up'
  );

  parkingData[zoneId].spots.push(newSpot);
  parkingData[zoneId].stats = calculateZoneStats(parkingData[zoneId].spots);
};

export const deleteParkingSpot = (zoneId: string, spotId: string) => {
  if (!parkingData[zoneId]) return;

  const spotIndex = parkingData[zoneId].spots.findIndex(s => s.id === spotId);
  if (spotIndex === -1) return;

  parkingData[zoneId].spots.splice(spotIndex, 1);
  parkingData[zoneId].stats = calculateZoneStats(parkingData[zoneId].spots);
};

export const getSpotDisplayName = (zoneId: string, spotIndex: number): string => {
  return `${zoneId}${(spotIndex + 1).toString().padStart(2, '0')}`;
};