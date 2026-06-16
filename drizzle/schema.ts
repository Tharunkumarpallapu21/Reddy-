import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Notification state tracking for dual mode system
 * Tracks current mode (test/production), completion status, and last mode switch
 */
export const notificationState = mysqlTable("notificationState", {
  id: int("id").autoincrement().primaryKey(),
  /** Current notification mode: 'test' or 'production' */
  mode: mysqlEnum("mode", ["test", "production"]).default("test").notNull(),
  /** Whether test mode has been completed (never runs again after June 17 12:00 AM) */
  testModeCompleted: int("testModeCompleted").default(0).notNull(),
  /** Timestamp of last mode switch */
  lastModeSwitchAt: timestamp("lastModeSwitchAt").defaultNow().notNull(),
  /** Timestamp when app was first installed */
  firstInstalledAt: timestamp("firstInstalledAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NotificationState = typeof notificationState.$inferSelect;
export type InsertNotificationState = typeof notificationState.$inferInsert;

/**
 * Scheduled notifications tracking
 * Stores all scheduled notification IDs for cancellation and management
 */
export const scheduledNotifications = mysqlTable("scheduledNotifications", {
  id: int("id").autoincrement().primaryKey(),
  /** Notification ID from Capacitor */
  notificationId: int("notificationId").notNull(),
  /** Mode this notification belongs to */
  mode: mysqlEnum("mode", ["test", "production"]).notNull(),
  /** Scheduled time for this notification */
  scheduledAt: timestamp("scheduledAt").notNull(),
  /** Message content */
  message: text("message").notNull(),
  /** Whether this notification has been sent */
  sent: int("sent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ScheduledNotification = typeof scheduledNotifications.$inferSelect;
export type InsertScheduledNotification = typeof scheduledNotifications.$inferInsert;