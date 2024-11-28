import { ParkingSpot } from './types';

type ParkingZones = {
  [key: string]: ParkingSpot[];
};

const mockImages = [
  'https://images.unsplash.com/photo-1590674899484-13da0d1b3c76?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?w=400&auto=format&fit=crop&q=60',
];

const getRandomImage = () => mockImages[Math.floor(Math.random() * mockImages.length)];

const createSpot = (
  id: string,
  x: number,
  y: number,
  rotation: number,
  status: 'available' | 'occupied' | 'reserved',
  type: 'regular' | 'accessible' | 'maternity'
): ParkingSpot => ({
  id,
  position: { x, y },
  rotation,
  status,
  type,
  info: `Spot ${id}\nType: ${type}\nStatus: ${status}`,
  image: getRandomImage(),
  lastOccupied: status === 'occupied' ? 'Currently occupied' : `${Math.floor(Math.random() * 3)} hours ago`,
  averageTime: `${(Math.random() * 2 + 0.5).toFixed(1)} hours`
});

export const parkingZones: ParkingZones = {
  'A': [
    // First row
    createSpot('A1', 100, 80, 0, 'available', 'regular'),
    createSpot('A2', 180, 80, 0, 'occupied', 'regular'),
    createSpot('A3', 260, 80, 0, 'available', 'regular'),
    createSpot('A4', 340, 80, 0, 'reserved', 'regular'),
    createSpot('A5', 420, 80, 0, 'available', 'regular'),
    // Second row
    createSpot('A6', 100, 160, 0, 'occupied', 'regular'),
    createSpot('A7', 180, 160, 0, 'available', 'accessible'),
    createSpot('A8', 260, 160, 0, 'available', 'maternity'),
    createSpot('A9', 340, 160, 0, 'occupied', 'regular'),
    createSpot('A10', 420, 160, 0, 'available', 'regular'),
  ],
  'B': [
    // First column
    createSpot('B1', 100, 80, 90, 'available', 'regular'),
    createSpot('B2', 100, 160, 90, 'occupied', 'regular'),
    createSpot('B3', 100, 240, 90, 'available', 'regular'),
    createSpot('B4', 100, 320, 90, 'reserved', 'regular'),
    // Second column
    createSpot('B5', 180, 80, 90, 'available', 'accessible'),
    createSpot('B6', 180, 160, 90, 'occupied', 'regular'),
    createSpot('B7', 180, 240, 90, 'available', 'maternity'),
    createSpot('B8', 180, 320, 90, 'available', 'regular'),
  ],
  'C': [
    // L-shaped arrangement
    // Horizontal section
    createSpot('C1', 100, 80, 0, 'available', 'regular'),
    createSpot('C2', 180, 80, 0, 'occupied', 'regular'),
    createSpot('C3', 260, 80, 0, 'available', 'accessible'),
    createSpot('C4', 340, 80, 0, 'reserved', 'regular'),
    // Vertical section
    createSpot('C5', 340, 160, 90, 'available', 'regular'),
    createSpot('C6', 340, 240, 90, 'occupied', 'maternity'),
    createSpot('C7', 340, 320, 90, 'available', 'regular'),
  ]
};