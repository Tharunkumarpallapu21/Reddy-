import { publicProcedure, router } from '../_core/trpc';
import ModeSwitchService from '../notifications/ModeSwitchService';
import NotificationStorage from '../notifications/NotificationStorage';

/**
 * Notifications router
 * Provides procedures for managing notification system
 */
export const notificationsRouter = router({
  /**
   * Get notification system status
   */
  getStatus: publicProcedure.query(async () => {
    try {
      return await ModeSwitchService.getStatus();
    } catch (error) {
      console.error('[notificationsRouter] Failed to get status:', error);
      throw error;
    }
  }),

  /**
   * Get current notification mode
   */
  getCurrentMode: publicProcedure.query(async () => {
    try {
      const mode = await NotificationStorage.getMode();
      return { mode };
    } catch (error) {
      console.error('[notificationsRouter] Failed to get current mode:', error);
      throw error;
    }
  }),

  /**
   * Check if test mode is completed
   */
  isTestModeCompleted: publicProcedure.query(async () => {
    try {
      const completed = await NotificationStorage.isTestModeCompleted();
      return { completed };
    } catch (error) {
      console.error('[notificationsRouter] Failed to check test mode completion:', error);
      throw error;
    }
  }),

  /**
   * Get installation date
   */
  getInstallationDate: publicProcedure.query(async () => {
    try {
      const date = await NotificationStorage.getInstallationDate();
      return { date };
    } catch (error) {
      console.error('[notificationsRouter] Failed to get installation date:', error);
      throw error;
    }
  }),

  /**
   * Get last mode switch time
   */
  getLastModeSwitchTime: publicProcedure.query(async () => {
    try {
      const time = await NotificationStorage.getLastModeSwitchTime();
      return { time };
    } catch (error) {
      console.error('[notificationsRouter] Failed to get last mode switch time:', error);
      throw error;
    }
  }),
});
