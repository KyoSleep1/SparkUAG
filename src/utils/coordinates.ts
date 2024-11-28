import { ZoneConfig } from '../types/parking';

export const transformCoordinates = (
  x: number,
  y: number,
  config: ZoneConfig
): { x: number; y: number } => {
  // Transform the simple grid coordinates to pixel positions
  const transformedX = x * config.spotWidth + config.centerOffset.x;
  const transformedY = y * config.spotHeight + config.centerOffset.y;

  return { x: transformedX, y: transformedY };
};