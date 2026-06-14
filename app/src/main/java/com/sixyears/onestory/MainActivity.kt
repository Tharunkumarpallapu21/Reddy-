package com.sixyears.onestory

import android.animation.ValueAnimator
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.WindowManager
import android.view.animation.DecelerateInterpolator
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat

class MainActivity : AppCompatActivity() {

    private lateinit var heartProgressView: HeartProgressView
    private lateinit var tvLoveGrowing: TextView
    private lateinit var tvCountdownDays: TextView
    private lateinit var tvCountdownSub: TextView
    private lateinit var tvStoryTitle: TextView
    private lateinit var tvStorySubtitle: TextView
    private lateinit var tvAppTitle: TextView

    private val updateHandler = Handler(Looper.getMainLooper())
    private val updateIntervalMs = 60_000L // Update every minute

    private val updateRunnable = object : Runnable {
        override fun run() {
            refreshData()
            updateHandler.postDelayed(this, updateIntervalMs)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        WindowCompat.setDecorFitsSystemWindows(window, false)
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window.statusBarColor = android.graphics.Color.TRANSPARENT

        setContentView(R.layout.activity_main)

        bindViews()
        animateEntrance()
        refreshData()
    }

    override fun onResume() {
        super.onResume()
        updateHandler.postDelayed(updateRunnable, updateIntervalMs)
    }

    override fun onPause() {
        super.onPause()
        updateHandler.removeCallbacks(updateRunnable)
    }

    private fun bindViews() {
        heartProgressView = findViewById(R.id.heartProgressView)
        tvLoveGrowing = findViewById(R.id.tvLoveGrowing)
        tvCountdownDays = findViewById(R.id.tvCountdownDays)
        tvCountdownSub = findViewById(R.id.tvCountdownSub)
        tvStoryTitle = findViewById(R.id.tvStoryTitle)
        tvStorySubtitle = findViewById(R.id.tvStorySubtitle)
        tvAppTitle = findViewById(R.id.tvAppTitle)
    }

    private fun refreshData() {
        val progress = ProgressCalculator.calculateProgress(this)
        val days = ProgressCalculator.getDaysUntilBirthday()
        val isToday = ProgressCalculator.isBirthdayToday()

        // Animate heart fill
        val currentProgress = heartProgressView.getProgress()
        val animator = ValueAnimator.ofFloat(currentProgress, progress)
        animator.duration = 1200
        animator.interpolator = DecelerateInterpolator()
        animator.addUpdateListener { anim ->
            heartProgressView.setProgress(anim.animatedValue as Float)
        }
        animator.start()

        // Love growing label
        tvLoveGrowing.text = when {
            progress >= 100f -> "Love Complete ❤️"
            progress >= 75f -> "Almost There ❤️"
            progress >= 50f -> "Halfway There ❤️"
            progress >= 25f -> "Love Growing ❤️"
            else -> "Love Growing ❤️"
        }

        // Countdown
        if (isToday) {
            tvCountdownDays.text = "🎂 Happy Birthday!"
            tvCountdownSub.text = "Your Special Day is Here ✨"
        } else if (days == 0) {
            tvCountdownDays.text = "🎂 Tomorrow!"
            tvCountdownSub.text = "Until Your Special Day ✨"
        } else if (days == 1) {
            tvCountdownDays.text = "🎂 1 Day Left"
            tvCountdownSub.text = "Until Your Special Day ✨"
        } else {
            tvCountdownDays.text = "🎂 $days Days Left"
            tvCountdownSub.text = "Until Your Special Day ✨"
        }
    }

    private fun animateEntrance() {
        val views = listOf<View>(tvAppTitle, heartProgressView, tvLoveGrowing,
            findViewById(R.id.cardCountdown), findViewById(R.id.cardStory))

        views.forEachIndexed { index, view ->
            view.alpha = 0f
            view.translationY = 60f
            view.animate()
                .alpha(1f)
                .translationY(0f)
                .setStartDelay((index * 150 + 200).toLong())
                .setDuration(700)
                .setInterpolator(DecelerateInterpolator())
                .start()
        }
    }
}
