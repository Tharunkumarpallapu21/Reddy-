package com.sixyears.onestory

import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.View
import kotlin.math.min

class HeartProgressView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private var progress: Float = 0f

    private val borderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.STROKE
        strokeWidth = 6f
    }

    private val glassPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.FILL
        color = Color.parseColor("#FFF8F2")
    }

    private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.FILL
    }

    private val glowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.FILL
    }

    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.WHITE
        textAlign = Paint.Align.CENTER
        typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        setShadowLayer(4f, 0f, 2f, Color.parseColor("#80000000"))
    }

    private val subTextPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.parseColor("#FFD700")
        textAlign = Paint.Align.CENTER
        typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        setShadowLayer(3f, 0f, 1f, Color.parseColor("#40000000"))
    }

    private val heartPath = Path()
    private val fillPath = Path()

    private val goldColors = intArrayOf(
        Color.parseColor("#F5D060"),
        Color.parseColor("#D4AF37"),
        Color.parseColor("#C9A227"),
        Color.parseColor("#D4AF37"),
        Color.parseColor("#F5D060")
    )

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        val w = width.toFloat()
        val h = height.toFloat()
        val size = min(w, h)
        val cx = w / 2f
        val cy = h / 2f

        val scale = size * 0.82f
        val heartW = scale
        val heartH = scale * 0.95f
        val left = cx - heartW / 2f
        val top = cy - heartH / 2f

        buildHeartPath(heartPath, left, top, heartW, heartH)

        // Glow
        glowPaint.color = Color.parseColor("#30FF1744")
        glowPaint.maskFilter = BlurMaskFilter(size * 0.07f, BlurMaskFilter.Blur.NORMAL)
        canvas.drawPath(heartPath, glowPaint)
        glowPaint.maskFilter = null

        // Glass background
        canvas.drawPath(heartPath, glassPaint)

        // Liquid fill
        canvas.save()
        canvas.clipPath(heartPath)

        val fillLevel = (progress / 100f).coerceIn(0f, 1f)
        val fillTop = top + heartH - (heartH * fillLevel)

        buildFillRect(fillPath, left, fillTop, heartW, heartH, top, fillLevel)

        fillPaint.shader = LinearGradient(
            cx, top + heartH,
            cx, top,
            intArrayOf(
                Color.parseColor("#FF6B8A"),
                Color.parseColor("#FF1744"),
                Color.parseColor("#C8102E")
            ),
            floatArrayOf(0f, 0.5f, 1f),
            Shader.TileMode.CLAMP
        )
        canvas.drawPath(fillPath, fillPaint)

        // Shine
        val shinePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            style = Paint.Style.FILL
            shader = LinearGradient(
                left, top, left + heartW * 0.5f, top + heartH * 0.6f,
                intArrayOf(Color.parseColor("#35FFFFFF"), Color.TRANSPARENT),
                floatArrayOf(0f, 1f),
                Shader.TileMode.CLAMP
            )
        }
        canvas.drawPath(heartPath, shinePaint)
        canvas.restore()

        // Gold border
        borderPaint.strokeWidth = size * 0.013f
        borderPaint.shader = LinearGradient(
            left, top, left + heartW, top + heartH,
            goldColors,
            floatArrayOf(0f, 0.25f, 0.5f, 0.75f, 1f),
            Shader.TileMode.CLAMP
        )
        canvas.drawPath(heartPath, borderPaint)

        // Percentage
        val pct = progress.toInt()
        textPaint.textSize = size * 0.17f
        canvas.drawText("$pct%", cx, cy + textPaint.textSize * 0.35f, textPaint)

        subTextPaint.textSize = size * 0.055f
        val label = if (pct >= 100) "Complete ❤️" else "of the journey"
        canvas.drawText(label, cx, cy + textPaint.textSize * 0.92f, subTextPaint)
    }

    private fun buildHeartPath(path: Path, left: Float, top: Float, w: Float, h: Float) {
        path.reset()
        val cx = left + w / 2f
        val topDip = top + h * 0.27f
        val bottomTip = top + h * 0.95f

        path.moveTo(cx, topDip)

        path.cubicTo(
            cx - w * 0.02f, top + h * 0.04f,
            left - w * 0.05f, top + h * 0.05f,
            left + w * 0.02f, topDip
        )
        path.cubicTo(
            left - w * 0.02f, top + h * 0.46f,
            cx - w * 0.3f, top + h * 0.68f,
            cx, bottomTip
        )
        path.cubicTo(
            cx + w * 0.3f, top + h * 0.68f,
            left + w + w * 0.02f, top + h * 0.46f,
            left + w - w * 0.02f, topDip
        )
        path.cubicTo(
            left + w + w * 0.05f, top + h * 0.05f,
            cx + w * 0.02f, top + h * 0.04f,
            cx, topDip
        )
        path.close()
    }

    private fun buildFillRect(
        path: Path, left: Float, fillTop: Float,
        w: Float, h: Float, heartTop: Float, fillLevel: Float
    ) {
        path.reset()
        val waveAmp = if (fillLevel < 0.98f) h * 0.018f else 0f
        val segs = 8
        val segW = w / segs

        path.moveTo(left, fillTop)
        for (i in 0 until segs) {
            val x1 = left + segW * i + segW * 0.25f
            val x2 = left + segW * i + segW * 0.75f
            val x3 = left + segW * (i + 1)
            val yOff = if (i % 2 == 0) -waveAmp else waveAmp
            path.cubicTo(x1, fillTop + yOff, x2, fillTop - yOff, x3, fillTop)
        }
        path.lineTo(left + w, heartTop + h + 20f)
        path.lineTo(left, heartTop + h + 20f)
        path.close()
    }

    fun setProgress(value: Float) {
        progress = value.coerceIn(0f, 100f)
        invalidate()
    }

    fun getProgress(): Float = progress

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val size = min(
            MeasureSpec.getSize(widthMeasureSpec),
            MeasureSpec.getSize(heightMeasureSpec)
        )
        setMeasuredDimension(size, size)
    }
}
