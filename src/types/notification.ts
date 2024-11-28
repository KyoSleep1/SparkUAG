export type NotificationType = 'info' | 'warning';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isHighPriority: boolean;
  timestamp: Date;
  read: boolean;
  zoneId?: string;
  spotId?: string;
  expiresAt?: Date;
  actions?: {
    label: string;
    action: () => void;
  }[];
}