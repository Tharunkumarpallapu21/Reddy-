import { LocalNotifications } from '@capacitor/local-notifications';

export interface NotificationOptions {
  id: number;
  title: string;
  body: string;
  schedule?: {
    at: Date;
  };
  smallIcon?: string;
  largeBody?: string;
  summaryText?: string;
}

/**
 * NotificationManager handles all Capacitor local notification operations
 * Manages scheduling, cancellation, and permission requests
 */
export class NotificationManager {
  private static instance: NotificationManager;

  private constructor() {}

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  /**
   * Request notification permissions from the user
   * Required for Android 13+ and iOS
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('[NotificationManager] Permission request failed:', error);
      return false;
    }
  }

  /**
   * Check if notifications are enabled
   */
  async checkPermissions(): Promise<boolean> {
    try {
      const result = await LocalNotifications.checkPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('[NotificationManager] Permission check failed:', error);
      return false;
    }
  }

  /**
   * Schedule a single notification
   */
  async scheduleNotification(options: NotificationOptions): Promise<number> {
    try {
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        const granted = await this.requestPermissions();
        if (!granted) {
          console.warn('[NotificationManager] Notification permission denied');
          return -1;
        }
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: options.id,
            title: options.title,
            body: options.body,
            schedule: options.schedule ? {
              at: options.schedule.at,
            } : undefined,
            smallIcon: options.smallIcon,
            largeBody: options.largeBody,
            summaryText: options.summaryText,
          },
        ],
      });

      console.log(`[NotificationManager] Scheduled notification ${options.id}`);
      return options.id;
    } catch (error) {
      console.error('[NotificationManager] Schedule failed:', error);
      return -1;
    }
  }

  /**
   * Schedule multiple notifications
   */
  async scheduleMultiple(
    options: NotificationOptions[]
  ): Promise<number[]> {
    try {
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        const granted = await this.requestPermissions();
        if (!granted) {
          console.warn('[NotificationManager] Notification permission denied');
          return [];
        }
      }

      const notifications = options.map(opt => ({
        id: opt.id,
        title: opt.title,
        body: opt.body,
        schedule: opt.schedule ? {
          at: opt.schedule.at,
        } : undefined,
        smallIcon: opt.smallIcon,
        largeBody: opt.largeBody,
        summaryText: opt.summaryText,
      }));

      await LocalNotifications.schedule({ notifications });

      console.log(
        `[NotificationManager] Scheduled ${options.length} notifications`
      );
      return options.map(opt => opt.id);
    } catch (error) {
      console.error('[NotificationManager] Batch schedule failed:', error);
      return [];
    }
  }

  /**
   * Cancel a notification by ID
   */
  async cancelNotification(id: number): Promise<boolean> {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] });
      console.log(`[NotificationManager] Cancelled notification ${id}`);
      return true;
    } catch (error) {
      console.error('[NotificationManager] Cancel failed:', error);
      return false;
    }
  }

  /**
   * Cancel multiple notifications
   */
  async cancelMultiple(ids: number[]): Promise<boolean> {
    try {
      const notifications = ids.map(id => ({ id }));
      await LocalNotifications.cancel({ notifications });
      console.log(`[NotificationManager] Cancelled ${ids.length} notifications`);
      return true;
    } catch (error) {
      console.error('[NotificationManager] Batch cancel failed:', error);
      return false;
    }
  }

  /**
   * Cancel all notifications
   */
  async cancelAll(): Promise<boolean> {
    try {
      const pending = await this.getPendingNotifications();
      if (pending.length > 0) {
        const ids = pending.map((n: any) => ({ id: n.id }));
        await LocalNotifications.cancel({ notifications: ids });
      }
      console.log('[NotificationManager] Cancelled all notifications');
      return true;
    } catch (error) {
      console.error('[NotificationManager] Cancel all failed:', error);
      return false;
    }
  }

  /**
   * Get all pending notifications
   */
  async getPendingNotifications(): Promise<any[]> {
    try {
      const result = await LocalNotifications.getPending();
      return result.notifications || [];
    } catch (error) {
      console.error('[NotificationManager] Get pending failed:', error);
      return [];
    }
  }

  /**
   * Listen to notification click events
   */
  onNotificationClicked(callback: (notification: any) => void): () => void {
    let unsubscribe: (() => void) | null = null;

    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      callback
    ).then((listener: any) => {
      unsubscribe = () => listener.remove();
    });

    // Return unsubscribe function
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }

  /**
   * Listen to notification received events
   */
  onNotificationReceived(callback: (notification: any) => void): () => void {
    let unsubscribe: (() => void) | null = null;

    LocalNotifications.addListener(
      'localNotificationReceived',
      callback
    ).then((listener: any) => {
      unsubscribe = () => listener.remove();
    });

    // Return unsubscribe function
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }
}

export default NotificationManager.getInstance();
