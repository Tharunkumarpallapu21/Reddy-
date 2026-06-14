package com.sixyears.onestory

import android.content.Context
import java.util.Calendar

object ProgressCalculator {

    private const val PREFS_NAME = "six_years_prefs"
    private const val KEY_INSTALL_TIME = "install_time"

    fun getOrSaveInstallTime(context: Context): Long {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val stored = prefs.getLong(KEY_INSTALL_TIME, -1L)
        if (stored != -1L) return stored

        val now = System.currentTimeMillis()
        prefs.edit().putLong(KEY_INSTALL_TIME, now).apply()
        return now
    }

    fun getTargetTime(): Long {
        val cal = Calendar.getInstance()
        val currentYear = cal.get(Calendar.YEAR)

        cal.set(Calendar.MONTH, Calendar.JUNE)
        cal.set(Calendar.DAY_OF_MONTH, 25)
        cal.set(Calendar.HOUR_OF_DAY, 0)
        cal.set(Calendar.MINUTE, 0)
        cal.set(Calendar.SECOND, 0)
        cal.set(Calendar.MILLISECOND, 0)

        // If June 25 of this year has already passed, target next year
        if (System.currentTimeMillis() > cal.timeInMillis) {
            cal.set(Calendar.YEAR, currentYear + 1)
        } else {
            cal.set(Calendar.YEAR, currentYear)
        }

        return cal.timeInMillis
    }

    fun calculateProgress(context: Context): Float {
        val installTime = getOrSaveInstallTime(context)
        val targetTime = getTargetTime()
        val currentTime = System.currentTimeMillis()

        if (currentTime >= targetTime) return 100f

        val totalDuration = (targetTime - installTime).toFloat()
        if (totalDuration <= 0f) return 100f

        val elapsedDuration = (currentTime - installTime).toFloat()
        if (elapsedDuration <= 0f) return 0f

        val progress = (elapsedDuration / totalDuration) * 100f
        return progress.coerceIn(0f, 100f)
    }

    fun getDaysUntilBirthday(): Int {
        val now = Calendar.getInstance()
        val target = Calendar.getInstance()

        target.set(Calendar.MONTH, Calendar.JUNE)
        target.set(Calendar.DAY_OF_MONTH, 25)
        target.set(Calendar.HOUR_OF_DAY, 0)
        target.set(Calendar.MINUTE, 0)
        target.set(Calendar.SECOND, 0)
        target.set(Calendar.MILLISECOND, 0)

        if (now.timeInMillis >= target.timeInMillis) {
            target.add(Calendar.YEAR, 1)
        }

        val diffMs = target.timeInMillis - now.timeInMillis
        val diffDays = (diffMs / (1000L * 60 * 60 * 24)).toInt()
        return diffDays
    }

    fun isBirthdayToday(): Boolean {
        val now = Calendar.getInstance()
        return now.get(Calendar.MONTH) == Calendar.JUNE &&
                now.get(Calendar.DAY_OF_MONTH) == 25
    }
}
