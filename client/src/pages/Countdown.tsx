import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface CountdownProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ onNavigate, onPrevious }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 9,
    hours: 8,
    minutes: 44,
    seconds: 21,
  });
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const calculateCountdown = () => {
      const targetDate = new Date(2026, 5, 25, 12, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });

        const totalSeconds = 365 * 24 * 60 * 60;
        const remainingSeconds = difference / 1000;
        const progressPercent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
        setProgress(Math.min(progressPercent, 100));
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="absolute top-12 left-0 right-0 text-center z-10"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="space-y-1">
          <h1 className="text-3xl font-bold text-[#FF1493] animate-glow-pulse">
            ❤️ Our Special Day ❤️
          </h1>
          <p className="text-sm text-white/60">June 25, 12:00 AM</p>
          <p className="text-xs text-white/50">The day you were born ✨</p>
        </motion.div>
      </motion.div>

      {/* Main heart-shaped countdown frame */}
      <motion.div
        className="relative w-72 h-80 flex items-center justify-center mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Heart glow effect */}
        <motion.div
          className="absolute inset-0 -m-16"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              filter: 'drop-shadow(0 0 50px rgba(255, 20, 147, 0.7)) drop-shadow(0 0 100px rgba(160, 32, 240, 0.4))',
            }}
          >
            <path
              d="M50 90 C20 75, 5 60, 5 45 C5 30, 15 20, 25 20 C35 20, 45 30, 50 40 C55 30, 65 20, 75 20 C85 20, 95 30, 95 45 C95 60, 80 75, 50 90 Z"
              fill="none"
              stroke="#FF1493"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </motion.div>

        {/* Main heart outline with strong glow */}
        <svg
          viewBox="0 0 100 100"
          className="absolute w-72 h-80"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(255, 20, 147, 0.9)) drop-shadow(0 0 80px rgba(255, 20, 147, 0.5))',
          }}
        >
          <path
            d="M50 90 C20 75, 5 60, 5 45 C5 30, 15 20, 25 20 C35 20, 45 30, 50 40 C55 30, 65 20, 75 20 C85 20, 95 30, 95 45 C95 60, 80 75, 50 90 Z"
            fill="none"
            stroke="#FF1493"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Heart fill with gradient */}
        <svg
          viewBox="0 0 100 100"
          className="absolute w-72 h-80"
          style={{
            opacity: 0.12,
          }}
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#A020F0" />
            </linearGradient>
          </defs>
          <path
            d="M50 90 C20 75, 5 60, 5 45 C5 30, 15 20, 25 20 C35 20, 45 30, 50 40 C55 30, 65 20, 75 20 C85 20, 95 30, 95 45 C95 60, 80 75, 50 90 Z"
            fill="url(#heartGradient)"
          />
        </svg>

        {/* Countdown content inside heart */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
          {/* Only label */}
          <motion.p
            className="text-sm text-white/70 font-light tracking-wide"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Only
          </motion.p>

          {/* Main countdown number with heartbeat */}
          <motion.div
            className="text-6xl font-bold text-[#FF1493] text-glow-pink"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {String(timeLeft.days).padStart(2, '0')}
          </motion.div>

          {/* Days Left label */}
          <p className="text-xs text-white/60 font-light tracking-wide">Days Left</p>
        </div>
      </motion.div>

      {/* Countdown cards below */}
      <motion.div
        className="mt-12 grid grid-cols-4 gap-3 max-w-sm"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {[
          { value: timeLeft.days, label: 'DAYS' },
          { value: timeLeft.hours, label: 'HOURS' },
          { value: timeLeft.minutes, label: 'MINUTES' },
          { value: timeLeft.seconds, label: 'SECONDS' },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="glass-intense rounded-lg p-3 text-center"
          >
            <motion.div
              className="text-2xl font-bold text-[#FF1493] text-glow-pink"
              key={item.value}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {String(item.value).padStart(2, '0')}
            </motion.div>
            <div className="text-xs text-white/60 mt-1 font-light">{item.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Romantic Journey Tracker */}
      <motion.div
        className="mt-12 w-full max-w-2xl space-y-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {/* Section title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-[#FF1493] animate-glow-pulse">
            ❤️ Our Journey ❤️
          </h2>
          <p className="text-sm text-white/60">From 10th Class to Forever ♾</p>
        </div>

        {/* Premium Vertical Timeline Container */}
        <motion.div
          className="glass-intense rounded-2xl p-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF1493] via-[#A020F0] to-[#FF1493] rounded-full" style={{ boxShadow: '0 0 30px rgba(255, 20, 147, 0.6)' }} />

          {/* Timeline milestones */}
          <div className="relative space-y-12">
            {[
              { emoji: '✨', label: '10th Class', description: 'Where it all began' },
              { emoji: '💌', label: 'First Conversation', description: 'The spark ignited' },
              { emoji: '🌹', label: 'Beautiful Memories', description: 'Countless moments together' },
              { emoji: '❤️', label: 'Today', description: 'Our special day', isActive: true },
              { emoji: '♾', label: 'Forever', description: 'Endless love awaits', isFinal: true },
            ].map((milestone, idx) => (
              <motion.div
                key={idx}
                className="relative flex items-center gap-6"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.15 }}
              >
                {/* Left content (alternating) */}
                {idx % 2 === 0 ? (
                  <div className="flex-1 text-right pr-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + idx * 0.15 }}
                    >
                      <p className={`text-sm font-semibold ${
                        milestone.isActive ? 'text-[#FF1493]' : milestone.isFinal ? 'text-[#A020F0]' : 'text-white/80'
                      }`}>
                        {milestone.label}
                      </p>
                      <p className="text-xs text-white/50 mt-1 italic">{milestone.description}</p>
                    </motion.div>
                  </div>
                ) : null}

                {/* Center milestone dot */}
                <motion.div
                  className="relative z-20 flex-shrink-0"
                  animate={{
                    scale: milestone.isActive ? [1, 1.2, 1] : milestone.isFinal ? [1, 1.15, 1] : 1,
                  }}
                  transition={{
                    duration: milestone.isActive || milestone.isFinal ? 2 : 0,
                    repeat: milestone.isActive || milestone.isFinal ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      milestone.isActive
                        ? 'w-16 h-16 -m-2'
                        : milestone.isFinal
                        ? 'w-14 h-14 -m-1'
                        : 'w-12 h-12'
                    }`}
                    animate={{
                      boxShadow: milestone.isActive
                        ? [
                            '0 0 30px rgba(255, 20, 147, 0.4)',
                            '0 0 60px rgba(255, 20, 147, 0.8)',
                            '0 0 30px rgba(255, 20, 147, 0.4)',
                          ]
                        : milestone.isFinal
                        ? [
                            '0 0 20px rgba(160, 32, 240, 0.4)',
                            '0 0 40px rgba(160, 32, 240, 0.7)',
                            '0 0 20px rgba(160, 32, 240, 0.4)',
                          ]
                        : 'none',
                    }}
                    transition={{
                      duration: milestone.isActive || milestone.isFinal ? 2 : 0,
                      repeat: milestone.isActive || milestone.isFinal ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Main milestone circle */}
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    milestone.isActive
                      ? 'bg-gradient-to-br from-[#FF1493] to-[#A020F0]'
                      : milestone.isFinal
                      ? 'bg-gradient-to-br from-[#A020F0] to-[#FF1493]'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                  style={{
                    boxShadow: milestone.isActive
                      ? '0 0 20px rgba(255, 20, 147, 0.8), inset 0 0 10px rgba(255, 20, 147, 0.3)'
                      : milestone.isFinal
                      ? '0 0 15px rgba(160, 32, 240, 0.8), inset 0 0 8px rgba(160, 32, 240, 0.3)'
                      : 'none',
                  }}>
                    {milestone.emoji}
                  </div>
                </motion.div>

                {/* Right content (alternating) */}
                {idx % 2 === 1 ? (
                  <div className="flex-1 pl-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + idx * 0.15 }}
                    >
                      <p className={`text-sm font-semibold ${
                        milestone.isActive ? 'text-[#FF1493]' : milestone.isFinal ? 'text-[#A020F0]' : 'text-white/80'
                      }`}>
                        {milestone.label}
                      </p>
                      <p className="text-xs text-white/50 mt-1 italic">{milestone.description}</p>
                    </motion.div>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom romantic quote */}
        <motion.p
          className="text-center text-white/70 text-sm italic mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Every day adds another beautiful chapter to our story ❤️
        </motion.p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        onClick={onNavigate}
        className="mt-10 px-8 py-3 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full neon-border-thick hover:shadow-lg transition-all"
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Next ❤️
      </motion.button>

      {/* Floating hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`countdown-heart-${i}`}
          className="fixed text-3xl opacity-20 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </motion.div>
  );
}
