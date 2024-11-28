import { Coordinates, MapDimensions, ParkingSpot } from './types';

export const convertToPixelCoordinates = (
  coordinates: Coordinates,
  mapDimensions: MapDimensions
): { x: number; y: number } => {
  const { lat, lng } = coordinates;
  const { width, height, bounds } = mapDimensions;

  // Convert latitude and longitude to pixel coordinates
  const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * width;
  const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * height;

  return { x, y };
};

export const findAdjacentSpots = (spots: ParkingSpot[]): ParkingSpot[] => {
  const updatedSpots = [...spots];

  // Group spots that are adjacent and have the same orientation
  updatedSpots.forEach((spot, index) => {
    const adjacentSpots: string[] = [];

    spots.forEach((otherSpot) => {
      if (spot.id !== otherSpot.id && 
          spot.orientation === otherSpot.orientation &&
          areAdjacent(spot, otherSpot)) {
        adjacentSpots.push(otherSpot.id);
      }
    });

    if (adjacentSpots.length > 0) {
      updatedSpots[index] = {
        ...spot,
        adjacentSpots
      };
    }
  });

  return updatedSpots;
};

const areAdjacent = (spot1: ParkingSpot, spot2: ParkingSpot): boolean => {
  const threshold = 0.00001; // Adjust this value based on your coordinate system
  
  const latDiff = Math.abs(spot1.coordinates.lat - spot2.coordinates.lat);
  const lngDiff = Math.abs(spot1.coordinates.lng - spot2.coordinates.lng);

  if (spot1.orientation === 'horizontal') {
    return latDiff < threshold && lngDiff < 0.00003; // Spots are side by side
  } else {
    return lngDiff < threshold && latDiff < 0.00003; // Spots are above/below each other
  }
};