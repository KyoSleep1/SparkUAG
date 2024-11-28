import { ParkingZones } from './types';

const mockImages = [
  'https://images.unsplash.com/photo-1590674899484-13da0d1b3c76?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?w=400&auto=format&fit=crop&q=60',
];

const getRandomImage = () => mockImages[Math.floor(Math.random() * mockImages.length)];

export const mockParkingSpots: ParkingZones = {
  'A': {
    config: {
      spotWidth: 40,
      spotHeight: 20,
      centerOffset: {
        x: 0,
        y: -30
      }
    },
    spots: [
      // Primera fila
      {
        id: 'A1',
        coordinates: { x: -80, y: -30 },
        orientation: 'horizontal',
        direction: 'up',
        status: 'available',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'A1',
          lastOccupied: '2 hours ago',
          averageTimeOccupied: '1.5 hours'
        }
      },
      {
        id: 'A2',
        coordinates: { x: -30, y: -30 },
        orientation: 'horizontal',
        direction: 'up',
        status: 'occupied',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'A2',
          lastOccupied: 'Currently occupied',
          averageTimeOccupied: '2 hours'
        }
      },
      {
        id: 'A3',
        coordinates: { x: 30, y: -30 },
        orientation: 'horizontal',
        direction: 'up',
        status: 'available',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'A3',
          lastOccupied: '1 hour ago',
          averageTimeOccupied: '1.8 hours'
        }
      },
      {
        id: 'A4',
        coordinates: { x: 80, y: -30 },
        orientation: 'horizontal',
        direction: 'up',
        status: 'occupied',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'A4',
          lastOccupied: 'Currently occupied',
          averageTimeOccupied: '1.2 hours'
        }
      },
      // Segunda fila
      {
        id: 'A5',
        coordinates: { x: -80, y: 30 },
        orientation: 'horizontal',
        direction: 'down',
        status: 'available',
        type: 'maternity',
        image: getRandomImage(),
        details: {
          spotNumber: 'A5',
          lastOccupied: '30 minutes ago',
          averageTimeOccupied: '45 minutes'
        }
      },
      {
        id: 'A6',
        coordinates: { x: -30, y: 30 },
        orientation: 'horizontal',
        direction: 'down',
        status: 'occupied',
        type: 'maternity',
        image: getRandomImage(),
        details: {
          spotNumber: 'A6',
          lastOccupied: 'Currently occupied',
          averageTimeOccupied: '1 hour'
        }
      },
      {
        id: 'A7',
        coordinates: { x: 30, y: 30 },
        orientation: 'horizontal',
        direction: 'down',
        status: 'available',
        type: 'disabled',
        image: getRandomImage(),
        details: {
          spotNumber: 'A7',
          lastOccupied: '15 minutes ago',
          averageTimeOccupied: '2 hours'
        }
      },
      {
        id: 'A8',
        coordinates: { x: 80, y: 30 },
        orientation: 'horizontal',
        direction: 'down',
        status: 'available',
        type: 'disabled',
        image: getRandomImage(),
        details: {
          spotNumber: 'A8',
          lastOccupied: '45 minutes ago',
          averageTimeOccupied: '1.5 hours'
        }
      }
    ]
  },
  'B': {
    config: {
      spotWidth: 40,
      spotHeight: 20,
      centerOffset: {
        x: -30,
        y: 0
      }
    },
    spots: [
      // Primera columna
      {
        id: 'B1',
        coordinates: { x: -30, y: -80 },
        orientation: 'vertical',
        direction: 'right',
        status: 'available',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'B1',
          lastOccupied: '1 hour ago',
          averageTimeOccupied: '1.3 hours'
        }
      },
      {
        id: 'B2',
        coordinates: { x: -30, y: -30 },
        orientation: 'vertical',
        direction: 'right',
        status: 'occupied',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'B2',
          lastOccupied: 'Currently occupied',
          averageTimeOccupied: '1.7 hours'
        }
      },
      {
        id: 'B3',
        coordinates: { x: -30, y: 30 },
        orientation: 'vertical',
        direction: 'right',
        status: 'available',
        type: 'disabled',
        image: getRandomImage(),
        details: {
          spotNumber: 'B3',
          lastOccupied: '2 hours ago',
          averageTimeOccupied: '1 hour'
        }
      },
      // Segunda columna
      {
        id: 'B4',
        coordinates: { x: 30, y: -80 },
        orientation: 'vertical',
        direction: 'left',
        status: 'available',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'B4',
          lastOccupied: '30 minutes ago',
          averageTimeOccupied: '1.5 hours'
        }
      },
      {
        id: 'B5',
        coordinates: { x: 30, y: -30 },
        orientation: 'vertical',
        direction: 'left',
        status: 'occupied',
        type: 'maternity',
        image: getRandomImage(),
        details: {
          spotNumber: 'B5',
          lastOccupied: 'Currently occupied',
          averageTimeOccupied: '45 minutes'
        }
      },
      {
        id: 'B6',
        coordinates: { x: 30, y: 30 },
        orientation: 'vertical',
        direction: 'left',
        status: 'available',
        type: 'maternity',
        image: getRandomImage(),
        details: {
          spotNumber: 'B6',
          lastOccupied: '15 minutes ago',
          averageTimeOccupied: '1 hour'
        }
      }
    ]
  },
  'C': {
    config: {
      spotWidth: 40,
      spotHeight: 20,
      centerOffset: {
        x: 0,
        y: 0
      }
    },
    spots: [
      // Forma de L - Parte horizontal
      {
        id: 'C1',
        coordinates: { x: -80, y: -30 },
        orientation: 'horizontal',
        direction: 'up',
        status: 'available',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'C1',
          lastOccupied: '1 hour ago',
          averageTimeOccupied: '1.2 hours'
        }
      },
      {
        id: 'C2',
        coordinates: { x: -30, y: -30 },
        orientation: 'horizontal',
        direction: 'up',
        status: 'occupied',
        type: 'disabled',
        image: getRandomImage(),
        details: {
          spotNumber: 'C2',
          lastOccupied: 'Currently occupied',
          averageTimeOccupied: '2 hours'
        }
      },
      {
        id: 'C3',
        coordinates: { x: 30, y: -30 },
        orientation: 'horizontal',
        direction: 'up',
        status: 'available',
        type: 'disabled',
        image: getRandomImage(),
        details: {
          spotNumber: 'C3',
          lastOccupied: '30 minutes ago',
          averageTimeOccupied: '1.5 hours'
        }
      },
      // Forma de L - Parte vertical
      {
        id: 'C4',
        coordinates: { x: 80, y: -30 },
        orientation: 'vertical',
        direction: 'right',
        status: 'available',
        type: 'maternity',
        image: getRandomImage(),
        details: {
          spotNumber: 'C4',
          lastOccupied: '45 minutes ago',
          averageTimeOccupied: '1 hour'
        }
      },
      {
        id: 'C5',
        coordinates: { x: 80, y: 30 },
        orientation: 'vertical',
        direction: 'right',
        status: 'occupied',
        type: 'maternity',
        image: getRandomImage(),
        details: {
          spotNumber: 'C5',
          lastOccupied: 'Currently occupied',
          averageTimeOccupied: '1.3 hours'
        }
      },
      {
        id: 'C6',
        coordinates: { x: 80, y: 80 },
        orientation: 'vertical',
        direction: 'right',
        status: 'available',
        type: 'regular',
        image: getRandomImage(),
        details: {
          spotNumber: 'C6',
          lastOccupied: '15 minutes ago',
          averageTimeOccupied: '1.8 hours'
        }
      }
    ]
  }
};