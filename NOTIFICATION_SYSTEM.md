# Dual Local Notification System

## Overview

The notification system provides a sophisticated dual-mode notification delivery mechanism for the romantic birthday application. It automatically manages notifications across two distinct phases:

- **Test Mode**: Sends random romantic messages every 5 minutes (until June 17, 12:00 AM)
- **Production Mode**: Sends scheduled messages at specific times (June 17-25)

## Architecture

### Core Components

#### 1. **NotificationManager** (`server/notifications/NotificationManager.ts`)
- Handles Capacitor Local Notifications integration
- Manages permission requests (Android 13+ compatible)
- Schedules and cancels notifications
- Listens to notification events

#### 2. **NotificationScheduler** (`server/notifications/NotificationScheduler.ts`)
- Orchestrates Test Mode scheduling (random messages every 5 minutes)
- Orchestrates Production Mode scheduling (predefined times)
- Prevents duplicate messages in Test Mode
- Manages notification lifecycle

#### 3. **NotificationStorage** (`server/notifications/NotificationStorage.ts`)
- Persists notification state to database
- Tracks current mode (test/production)
- Stores completion status
- Manages installation date and mode switch timestamps

#### 4. **ModeSwitchService** (`server/notifications/ModeSwitchService.ts`)
- Automatically detects current date
- Switches modes based on date logic
- Prevents Test Mode from running after June 17
- Handles periodic mode checks (every hour)

### Database Schema

#### `notificationState` Table
```sql
- id: Primary key
- mode: Current mode ('test' or 'production')
- testModeCompleted: Flag (0/1) - prevents test mode from running again
- lastModeSwitchAt: Timestamp of last mode switch
- firstInstalledAt: App installation timestamp
- createdAt, updatedAt: Timestamps
```

#### `scheduledNotifications` Table
```sql
- id: Primary key
- notificationId: Capacitor notification ID
- mode: Notification mode
- scheduledAt: Scheduled time
- message: Notification content
- sent: Flag (0/1) - whether notification was sent
- createdAt, updatedAt: Timestamps
```

## Test Mode

### Behavior
- **Activation**: Automatically on first app install
- **Duration**: Until June 17, 12:00 AM
- **Frequency**: Every 5 minutes
- **Messages**: Randomly selected from predefined array
- **Auto-Stop**: Automatically stops and switches to Production Mode on June 17

### Test Mode Messages
```
❤️ Hey Reddy Sai! Thinking of you ❤️
✨ You make every day special ✨
💕 Can't wait to celebrate with you 💕
🌹 You are my everything 🌹
💖 Forever grateful for you 💖
🎂 Your birthday is coming soon! 🎂
✨ 6 years of beautiful memories ✨
❤️ My heart belongs to you ❤️
💫 You light up my world 💫
🌟 You're my favorite person 🌟
💝 Every moment with you is precious 💝
🎉 Counting down to your special day 🎉
```

## Production Mode

### Schedule

#### June 17-24 (Daily)
- **07:00 AM**: 🌅 Good Morning Reddy Sai ❤️
- **12:00 PM**: 💌 Thinking About You ❤️
- **06:00 PM**: 🌹 Another day closer to your birthday ❤️
- **10:00 PM**: 🌙 Good Night My Love ❤️

#### June 25 (Birthday)
- **12:00 AM**: 🎂 Happy Birthday Reddy Sai ❤️
- **07:00 AM**: 🌞 Good Morning Birthday Girl ❤️
- **10:00 AM**: 🎁 Today is your special day ❤️
- **01:00 PM**: 🌹 You deserve all happiness ❤️
- **06:00 PM**: ✨ Thank you for being part of my life ❤️
- **10:00 PM**: 💖 Happy Birthday Once Again ❤️

## API Endpoints (tRPC)

### `notifications.getStatus`
Returns complete notification system status
```typescript
{
  currentMode: 'test' | 'production',
  testModeCompleted: boolean,
  lastModeSwitch: Date | null,
  installationDate: Date | null
}
```

### `notifications.getCurrentMode`
Returns current notification mode
```typescript
{ mode: 'test' | 'production' }
```

### `notifications.isTestModeCompleted`
Checks if test mode has been completed
```typescript
{ completed: boolean }
```

### `notifications.getInstallationDate`
Returns app installation date
```typescript
{ date: Date | null }
```

### `notifications.getLastModeSwitchTime`
Returns last mode switch timestamp
```typescript
{ time: Date | null }
```

## Initialization

The notification system is automatically initialized when the server starts:

```typescript
// In server/_core/index.ts
await initializeNotificationSystem();
```

### Initialization Flow
1. Initialize storage (create default state if needed)
2. Check if test mode is completed
3. Determine current mode based on date
4. Activate appropriate mode
5. Start periodic mode checks (every hour)

## Lifecycle Management

### Graceful Shutdown
The system handles graceful shutdown on SIGTERM and SIGINT:
```typescript
process.on('SIGTERM', () => {
  shutdownNotificationSystem();
  // ... close server
});
```

### Mode Switching Logic
- **Before June 17, 12:00 AM**: Test Mode active
- **June 17, 12:00 AM onwards**: Production Mode active
- **After Production Mode completes**: Notifications stop

## Key Features

### ✅ Offline Support
- All notifications work completely offline
- Uses Capacitor Local Notifications (native)
- No internet required for delivery

### ✅ Persistence
- Survives app restarts
- State stored in database
- Notification IDs tracked for cancellation

### ✅ No Duplicates
- Test Mode prevents consecutive duplicate messages
- Production Mode uses fixed schedule
- Tracks sent notifications

### ✅ Automatic Mode Switching
- Checks date every hour
- Automatically switches modes
- Test Mode never runs after June 17

### ✅ Android 13+ Compatible
- Requests notification permissions
- Handles permission denial gracefully
- Follows Android best practices

## Usage Example

### Check Notification Status
```typescript
const status = await trpc.notifications.getStatus.useQuery();
console.log(`Current mode: ${status.currentMode}`);
console.log(`Test mode completed: ${status.testModeCompleted}`);
```

### Get Current Mode
```typescript
const { mode } = await trpc.notifications.getCurrentMode.useQuery();
```

## Troubleshooting

### Notifications Not Appearing
1. Check notification permissions on device
2. Verify app has notification permission granted
3. Check system notification settings
4. Verify Capacitor is properly installed

### Mode Not Switching
1. Check server logs for initialization errors
2. Verify database connection
3. Check system date/time
4. Restart app to trigger mode check

### Test Mode Not Stopping
1. Verify current date is >= June 17, 12:00 AM
2. Check if `testModeCompleted` flag is set in database
3. Check server logs for mode switch errors

## Testing

### Reset Notification State (for testing)
```typescript
// In database
UPDATE notificationState SET 
  mode = 'test',
  testModeCompleted = 0,
  lastModeSwitchAt = NOW()
WHERE id = 1;
```

### Manual Mode Switch
```typescript
// Force switch to production mode
UPDATE notificationState SET 
  mode = 'production',
  testModeCompleted = 1
WHERE id = 1;
```

## Performance Considerations

- **Test Mode**: Minimal overhead (5-minute intervals)
- **Production Mode**: Efficient scheduling (predefined times)
- **Database**: Minimal writes (only on mode switch)
- **Memory**: Negligible footprint

## Security

- All notifications are local (no external API calls)
- No user data transmitted
- Database queries use parameterized statements
- Capacitor handles native permission security

## Future Enhancements

- [ ] Custom notification sounds
- [ ] Notification grouping
- [ ] User preference for notification times
- [ ] Notification history/analytics
- [ ] Push notification fallback
- [ ] Multi-language support
