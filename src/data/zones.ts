export const PARKING_ZONES = ['A', 'B', 'C'] as const;
export type ParkingZone = typeof PARKING_ZONES[number];

export const getNextZone = (currentZone: ParkingZone): ParkingZone => {
  const currentIndex = PARKING_ZONES.indexOf(currentZone);
  return PARKING_ZONES[(currentIndex + 1) % PARKING_ZONES.length];
};

export const getPreviousZone = (currentZone: ParkingZone): ParkingZone => {
  const currentIndex = PARKING_ZONES.indexOf(currentZone);
  return PARKING_ZONES[(currentIndex - 1 + PARKING_ZONES.length) % PARKING_ZONES.length];
};