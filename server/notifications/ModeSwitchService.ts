import NotificationStorage from './NotificationStorage';
import NotificationScheduler from './NotificationScheduler';

/**
 * ModeSwitchService handles automatic mode switching based on current date
 * Switches from Test Mode to Production Mode on June 17
 * Manages notification lifecycle based on dates
 */
export class ModeSwitchService {
  private static instance: ModeSwitchService;
  private modeCheckInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): ModeSwitchService {
    if (!ModeSwitchService.instance) {
      ModeSwitchService.instance = new ModeSwitchService();
    }
    return ModeSwitchService.instance;
  }

  /**
   * Initialize mode switching service
   * Checks current date and activates appropriate mode
   */
  async initialize(): Promise<void> {
    try {
      console.log('[ModeSwitchService] Initializing mode switch service');

      // Initialize storage
      await NotificationStorage.initializeState();

      // Check if test mode is already completed
      const testModeCompleted = await NotificationStorage.isTestModeCompleted();
      if (testModeCompleted) {
        console.log('[ModeSwitchService] Test mode already completed, starting production mode');
        await this.switchToProductionMode();
        return;
      }

      // Check current date and activate appropriate mode
      const currentMode = await this.determineCurrentMode();
      const storedMode = await NotificationStorage.getMode();

      if (currentMode !== storedMode) {
        console.log(`[ModeSwitchService] Mode mismatch detected. Switching from ${storedMode} to ${currentMode}`);
        if (currentMode === 'production') {
          await this.switchToProductionMode();
        } else {
          await this.switchToTestMode();
        }
      } else {
        console.log(`[ModeSwitchService] Current mode is correct: ${currentMode}`);
        // Resume the appropriate mode
        if (currentMode === 'test') {
          await NotificationScheduler.startTestMode();
        } else {
          await NotificationScheduler.startProductionMode();
        }
      }

      // Start periodic mode check (every hour)
      this.startPeriodicModeCheck();
    } catch (error) {
      console.error('[ModeSwitchService] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Determine which mode should be active based on current date
   */
  private determineCurrentMode(): 'test' | 'production' {
    const now = new Date();
    const testModeEndDate = new Date(2026, 5, 17, 0, 0, 0); // June 17, 12:00 AM

    if (now >= testModeEndDate) {
      return 'production';
    }
    return 'test';
  }

  /**
   * Switch to Test Mode
   */
  private async switchToTestMode(): Promise<void> {
    try {
      console.log('[ModeSwitchService] Switching to Test Mode');

      // Cancel any existing production notifications
      await NotificationScheduler.cancelProductionMode();

      // Set mode in storage
      await NotificationStorage.setMode('test');

      // Start test mode
      await NotificationScheduler.startTestMode();

      console.log('[ModeSwitchService] Successfully switched to Test Mode');
    } catch (error) {
      console.error('[ModeSwitchService] Failed to switch to test mode:', error);
      throw error;
    }
  }

  /**
   * Switch to Production Mode
   */
  private async switchToProductionMode(): Promise<void> {
    try {
      console.log('[ModeSwitchService] Switching to Production Mode');

      // Cancel test mode notifications
      await NotificationScheduler.cancelTestMode();

      // Mark test mode as completed
      await NotificationStorage.markTestModeCompleted();

      // Set mode in storage
      await NotificationStorage.setMode('production');

      // Start production mode
      await NotificationScheduler.startProductionMode();

      console.log('[ModeSwitchService] Successfully switched to Production Mode');
    } catch (error) {
      console.error('[ModeSwitchService] Failed to switch to production mode:', error);
      throw error;
    }
  }

  /**
   * Start periodic mode check
   * Checks every hour if mode needs to be switched
   */
  private startPeriodicModeCheck(): void {
    this.modeCheckInterval = setInterval(async () => {
      try {
        const currentMode = this.determineCurrentMode();
        const storedMode = await NotificationStorage.getMode();

        if (currentMode !== storedMode) {
          console.log(`[ModeSwitchService] Mode change detected. Switching from ${storedMode} to ${currentMode}`);

          if (currentMode === 'production') {
            await this.switchToProductionMode();
          } else {
            await this.switchToTestMode();
          }
        }
      } catch (error) {
        console.error('[ModeSwitchService] Periodic mode check failed:', error);
      }
    }, 60 * 60 * 1000); // Check every hour
  }

  /**
   * Stop mode checking
   */
  stopModeCheck(): void {
    if (this.modeCheckInterval) {
      clearInterval(this.modeCheckInterval);
      this.modeCheckInterval = null;
      console.log('[ModeSwitchService] Mode check stopped');
    }
  }

  /**
   * Get current active mode
   */
  async getCurrentMode(): Promise<'test' | 'production'> {
    return NotificationStorage.getMode();
  }

  /**
   * Check if test mode is completed
   */
  async isTestModeCompleted(): Promise<boolean> {
    return NotificationStorage.isTestModeCompleted();
  }

  /**
   * Get mode switch status
   */
  async getStatus(): Promise<{
    currentMode: 'test' | 'production';
    testModeCompleted: boolean;
    lastModeSwitch: Date | null;
    installationDate: Date | null;
  }> {
    return {
      currentMode: await NotificationStorage.getMode(),
      testModeCompleted: await NotificationStorage.isTestModeCompleted(),
      lastModeSwitch: await NotificationStorage.getLastModeSwitchTime(),
      installationDate: await NotificationStorage.getInstallationDate(),
    };
  }
}

export default ModeSwitchService.getInstance();
