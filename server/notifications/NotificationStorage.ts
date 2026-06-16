import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { notificationState, InsertNotificationState, NotificationState } from '../../drizzle/schema';

/**
 * NotificationStorage manages persistent notification state
 * Stores current mode, completion status, and installation date
 */
export class NotificationStorage {
  private static instance: NotificationStorage;

  private constructor() {}

  static getInstance(): NotificationStorage {
    if (!NotificationStorage.instance) {
      NotificationStorage.instance = new NotificationStorage();
    }
    return NotificationStorage.instance;
  }

  /**
   * Initialize notification state on first app install
   * Creates default state if it doesn't exist
   */
  async initializeState(): Promise<NotificationState> {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }

      // Check if state already exists
      const existing = await db.select().from(notificationState).limit(1);
      if (existing.length > 0) {
        console.log('[NotificationStorage] State already initialized');
        return existing[0];
      }

      // Create initial state
      const initialState: InsertNotificationState = {
        mode: 'test',
        testModeCompleted: 0,
        lastModeSwitchAt: new Date(),
        firstInstalledAt: new Date(),
      };

      await db.insert(notificationState).values(initialState);
      console.log('[NotificationStorage] Initialized notification state');

      const result = await db.select().from(notificationState).limit(1);
      return result[0];
    } catch (error) {
      console.error('[NotificationStorage] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get current notification state
   */
  async getState(): Promise<NotificationState | null> {
    try {
      const db = await getDb();
      if (!db) {
        console.warn('[NotificationStorage] Database not available');
        return null;
      }

      const result = await db.select().from(notificationState).limit(1);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('[NotificationStorage] Failed to get state:', error);
      return null;
    }
  }

  /**
   * Get current notification mode
   */
  async getMode(): Promise<'test' | 'production'> {
    try {
      const state = await this.getState();
      return state?.mode || 'test';
    } catch (error) {
      console.error('[NotificationStorage] Failed to get mode:', error);
      return 'test';
    }
  }

  /**
   * Set notification mode
   */
  async setMode(mode: 'test' | 'production'): Promise<void> {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }

      await db
        .update(notificationState)
        .set({
          mode,
          lastModeSwitchAt: new Date(),
        })
        .where(eq(notificationState.id, 1));

      console.log(`[NotificationStorage] Mode changed to: ${mode}`);
    } catch (error) {
      console.error('[NotificationStorage] Failed to set mode:', error);
      throw error;
    }
  }

  /**
   * Check if test mode is completed
   */
  async isTestModeCompleted(): Promise<boolean> {
    try {
      const state = await this.getState();
      return state?.testModeCompleted === 1;
    } catch (error) {
      console.error('[NotificationStorage] Failed to check test mode completion:', error);
      return false;
    }
  }

  /**
   * Mark test mode as completed
   * Prevents test mode from running again
   */
  async markTestModeCompleted(): Promise<void> {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }

      await db
        .update(notificationState)
        .set({
          testModeCompleted: 1,
          mode: 'production',
          lastModeSwitchAt: new Date(),
        })
        .where(eq(notificationState.id, 1));

      console.log('[NotificationStorage] Test mode marked as completed');
    } catch (error) {
      console.error('[NotificationStorage] Failed to mark test mode completed:', error);
      throw error;
    }
  }

  /**
   * Get installation date
   */
  async getInstallationDate(): Promise<Date | null> {
    try {
      const state = await this.getState();
      return state?.firstInstalledAt || null;
    } catch (error) {
      console.error('[NotificationStorage] Failed to get installation date:', error);
      return null;
    }
  }

  /**
   * Get last mode switch timestamp
   */
  async getLastModeSwitchTime(): Promise<Date | null> {
    try {
      const state = await this.getState();
      return state?.lastModeSwitchAt || null;
    } catch (error) {
      console.error('[NotificationStorage] Failed to get last mode switch time:', error);
      return null;
    }
  }

  /**
   * Reset notification state (for testing)
   */
  async resetState(): Promise<void> {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }

      await db
        .update(notificationState)
        .set({
          mode: 'test',
          testModeCompleted: 0,
          lastModeSwitchAt: new Date(),
        })
        .where(eq(notificationState.id, 1));

      console.log('[NotificationStorage] State reset');
    } catch (error) {
      console.error('[NotificationStorage] Failed to reset state:', error);
      throw error;
    }
  }
}

export default NotificationStorage.getInstance();
