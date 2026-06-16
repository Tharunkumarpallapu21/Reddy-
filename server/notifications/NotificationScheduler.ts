import { getDb } from '../db';
import { scheduledNotifications } from '../../drizzle/schema';
import NotificationManager from './NotificationManager';

/**
 * Test mode messages for Reddy Sai
 * Randomly selected every 5 minutes until June 17, 12:00 AM
 */
const TEST_MODE_MESSAGES = [
  '❤️ Hey Reddy Sai! Thinking of you ❤️',
  '✨ You make every day special ✨',
  '💕 Can\'t wait to celebrate with you 💕',
  '🌹 You are my everything 🌹',
  '💖 Forever grateful for you 💖',
  '🎂 Your birthday is coming soon! 🎂',
  '✨ 6 years of beautiful memories ✨',
  '❤️ My heart belongs to you ❤️',
  '💫 You light up my world 💫',
  '🌟 You\'re my favorite person 🌟',
  '💝 Every moment with you is precious 💝',
  '🎉 Counting down to your special day 🎉',
];

/**
 * Production mode messages - scheduled at specific times
 */
const PRODUCTION_MESSAGES = {
  morning: '🌅 Good Morning Reddy Sai ❤️',
  noon: '💌 Thinking About You ❤️',
  evening: '🌹 Another day closer to your birthday ❤️',
  night: '🌙 Good Night My Love ❤️',
  birthdayMidnight: '🎂 Happy Birthday Reddy Sai ❤️',
  birthdayMorning: '🌞 Good Morning Birthday Girl ❤️',
  birthdayMid: '🎁 Today is your special day ❤️',
  birthdayAfternoon: '🌹 You deserve all happiness ❤️',
  birthdayEvening: '✨ Thank you for being part of my life ❤️',
  birthdayNight: '💖 Happy Birthday Once Again ❤️',
};

export interface ScheduleOptions {
  mode: 'test' | 'production';
  userId?: number;
}

/**
 * NotificationScheduler manages scheduling notifications for both modes
 * Test Mode: Random messages every 5 minutes until June 17 12:00 AM
 * Production Mode: Scheduled messages at specific times
 */
export class NotificationScheduler {
  private static instance: NotificationScheduler;
  private lastTestMessage: string = '';
  private testModeInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): NotificationScheduler {
    if (!NotificationScheduler.instance) {
      NotificationScheduler.instance = new NotificationScheduler();
    }
    return NotificationScheduler.instance;
  }

  /**
   * Start Test Mode - sends random messages every 5 minutes
   * Automatically stops on June 17, 12:00 AM
   */
  async startTestMode(): Promise<void> {
    console.log('[NotificationScheduler] Starting Test Mode');

    // Send first notification immediately
    await this.sendTestNotification();

    // Schedule notifications every 5 minutes
    this.testModeInterval = setInterval(async () => {
      const now = new Date();
      const testModeEndDate = new Date(2026, 5, 17, 0, 0, 0); // June 17, 12:00 AM

      // Check if we've reached the end of test mode
      if (now >= testModeEndDate) {
        console.log('[NotificationScheduler] Test Mode ended - stopping');
        this.stopTestMode();
        return;
      }

      await this.sendTestNotification();
    }, 5 * 60 * 1000); // 5 minutes
  }

  /**
   * Send a single test mode notification
   */
  private async sendTestNotification(): Promise<void> {
    try {
      // Get a random message that's different from the last one
      let message = this.getRandomTestMessage();
      while (message === this.lastTestMessage && TEST_MODE_MESSAGES.length > 1) {
        message = this.getRandomTestMessage();
      }
      this.lastTestMessage = message;

      const notificationId = Math.floor(Math.random() * 1000000);
      const scheduledAt = new Date();

      // Schedule notification
      await NotificationManager.scheduleNotification({
        id: notificationId,
        title: 'Our Story ❤️',
        body: message,
      });

      // Store in database
      const db = await getDb();
      if (db) {
        await db.insert(scheduledNotifications).values({
          notificationId,
          mode: 'test',
          scheduledAt,
          message,
          sent: 1,
        });
      }

      console.log(`[NotificationScheduler] Sent test notification: ${message}`);
    } catch (error) {
      console.error('[NotificationScheduler] Failed to send test notification:', error);
    }
  }

  /**
   * Get random test message avoiding duplicates
   */
  private getRandomTestMessage(): string {
    return TEST_MODE_MESSAGES[Math.floor(Math.random() * TEST_MODE_MESSAGES.length)];
  }

  /**
   * Stop Test Mode
   */
  stopTestMode(): void {
    if (this.testModeInterval) {
      clearInterval(this.testModeInterval);
      this.testModeInterval = null;
      console.log('[NotificationScheduler] Test Mode stopped');
    }
  }

  /**
   * Start Production Mode - schedule messages at specific times
   * June 17-24: 07:00, 12:00, 18:00, 22:00
   * June 25: 00:00, 07:00, 10:00, 13:00, 18:00, 22:00
   */
  async startProductionMode(): Promise<void> {
    console.log('[NotificationScheduler] Starting Production Mode');

    const now = new Date();
    const schedules: Array<{ time: [number, number]; message: string; date: Date }> = [];

    // June 17-24 schedules
    for (let day = 17; day < 25; day++) {
      const date = new Date(2026, 5, day);

      schedules.push(
        { time: [7, 0], message: PRODUCTION_MESSAGES.morning, date: new Date(date.setHours(7, 0, 0)) },
        { time: [12, 0], message: PRODUCTION_MESSAGES.noon, date: new Date(date.setHours(12, 0, 0)) },
        { time: [18, 0], message: PRODUCTION_MESSAGES.evening, date: new Date(date.setHours(18, 0, 0)) },
        { time: [22, 0], message: PRODUCTION_MESSAGES.night, date: new Date(date.setHours(22, 0, 0)) }
      );
    }

    // June 25 (Birthday) schedules
    const birthdayDate = new Date(2026, 5, 25);
    schedules.push(
      { time: [0, 0], message: PRODUCTION_MESSAGES.birthdayMidnight, date: new Date(birthdayDate.setHours(0, 0, 0)) },
      { time: [7, 0], message: PRODUCTION_MESSAGES.birthdayMorning, date: new Date(birthdayDate.setHours(7, 0, 0)) },
      { time: [10, 0], message: PRODUCTION_MESSAGES.birthdayMid, date: new Date(birthdayDate.setHours(10, 0, 0)) },
      { time: [13, 0], message: PRODUCTION_MESSAGES.birthdayAfternoon, date: new Date(birthdayDate.setHours(13, 0, 0)) },
      { time: [18, 0], message: PRODUCTION_MESSAGES.birthdayEvening, date: new Date(birthdayDate.setHours(18, 0, 0)) },
      { time: [22, 0], message: PRODUCTION_MESSAGES.birthdayNight, date: new Date(birthdayDate.setHours(22, 0, 0)) }
    );

    // Filter schedules that are in the future
    const futureSchedules = schedules.filter(s => s.date > now);

    // Schedule all notifications
    for (const schedule of futureSchedules) {
      try {
        const notificationId = Math.floor(Math.random() * 1000000);

        await NotificationManager.scheduleNotification({
          id: notificationId,
          title: 'Our Story ❤️',
          body: schedule.message,
          schedule: {
            at: schedule.date,
          },
        });

        // Store in database
        const db = await getDb();
        if (db) {
          await db.insert(scheduledNotifications).values({
            notificationId,
            mode: 'production',
            scheduledAt: schedule.date,
            message: schedule.message,
            sent: 0,
          });
        }

        console.log(`[NotificationScheduler] Scheduled production notification for ${schedule.date.toISOString()}`);
      } catch (error) {
        console.error('[NotificationScheduler] Failed to schedule notification:', error);
      }
    }

    console.log(`[NotificationScheduler] Scheduled ${futureSchedules.length} production notifications`);
  }

  /**
   * Cancel all Test Mode notifications
   */
  async cancelTestMode(): Promise<void> {
    try {
      this.stopTestMode();

      const db = await getDb();
      if (db) {
        const { eq } = await import('drizzle-orm');
        const testNotifications = await db
          .select()
          .from(scheduledNotifications)
          .where(eq(scheduledNotifications.mode, 'test'));

        const ids = testNotifications.map(n => n.notificationId);
        if (ids.length > 0) {
          await NotificationManager.cancelMultiple(ids);
          console.log(`[NotificationScheduler] Cancelled ${ids.length} test notifications`);
        }
      }
    } catch (error) {
      console.error('[NotificationScheduler] Failed to cancel test mode:', error);
    }
  }

  /**
   * Cancel all Production Mode notifications
   */
  async cancelProductionMode(): Promise<void> {
    try {
      const db = await getDb();
      if (db) {
        const { eq, and } = await import('drizzle-orm');
        const prodNotifications = await db
          .select()
          .from(scheduledNotifications)
          .where(and(
            eq(scheduledNotifications.mode, 'production'),
            eq(scheduledNotifications.sent, 0)
          ));

        const ids = prodNotifications.map(n => n.notificationId);
        if (ids.length > 0) {
          await NotificationManager.cancelMultiple(ids);
          console.log(`[NotificationScheduler] Cancelled ${ids.length} production notifications`);
        }
      }
    } catch (error) {
      console.error('[NotificationScheduler] Failed to cancel production mode:', error);
    }
  }
}

export default NotificationScheduler.getInstance();
