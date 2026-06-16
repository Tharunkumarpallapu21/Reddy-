/**
 * Notification System Exports
 * Dual mode notification system for Test and Production modes
 */

export { NotificationManager, type NotificationOptions } from './NotificationManager';
export { NotificationScheduler, type ScheduleOptions } from './NotificationScheduler';
export { NotificationStorage } from './NotificationStorage';
export { ModeSwitchService } from './ModeSwitchService';

import ModeSwitchService from './ModeSwitchService';

/**
 * Initialize the notification system
 * Should be called once when the app starts
 */
export async function initializeNotificationSystem(): Promise<void> {
  try {
    console.log('[NotificationSystem] Initializing notification system');
    await ModeSwitchService.initialize();
    console.log('[NotificationSystem] Notification system initialized successfully');
  } catch (error) {
    console.error('[NotificationSystem] Failed to initialize notification system:', error);
    throw error;
  }
}

/**
 * Shutdown the notification system
 * Should be called when the app is closing
 */
export function shutdownNotificationSystem(): void {
  try {
    console.log('[NotificationSystem] Shutting down notification system');
    ModeSwitchService.stopModeCheck();
    console.log('[NotificationSystem] Notification system shut down successfully');
  } catch (error) {
    console.error('[NotificationSystem] Failed to shutdown notification system:', error);
  }
}

/**
 * Get notification system status
 */
export async function getNotificationSystemStatus() {
  return ModeSwitchService.getStatus();
}
