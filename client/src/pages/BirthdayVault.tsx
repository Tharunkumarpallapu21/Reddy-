import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface BirthdayVaultProps {
  onPrevious: () => void;
}

export function BirthdayVault({ onPrevious }: BirthdayVaultProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 9,
    hours: 8,
    minutes: 44,
    seconds: 21,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const calculateCountdown = () => {
      const targetDate = new Date(2026, 5, 25, 12, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsUnlocked(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen w-full px-6 py-12 overflow-hidden flex flex-col items-center justify-center"
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
            ❤️ Birthday Vault ❤️
          </h1>
          <p className="text-sm text-white/60">A surprise worth waiting for</p>
        </motion.div>
      </motion.div>

      {/* Vault door scene */}
      <motion.div
        className="relative w-64 h-80 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Vault glow */}
        <motion.div
          className="absolute inset-0 -m-12 rounded-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 20, 147, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Vault door body */}
        <div className="relative w-56 h-72 bg-gradient-to-br from-[#A0A0A0] via-[#808080] to-[#606060] rounded-2xl shadow-2xl overflow-hidden border-4 border-[#606060]">
          {/* Metallic texture */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white to-transparent" />

          {/* Vault door inner frame */}
          <div className="absolute inset-4 border-2 border-[#404040] rounded-lg" />

          {/* Vault wheel - rotating */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-[#FF1493] flex items-center justify-center"
            animate={{
              rotate: isUnlocked ? 360 : [0, 10, -10, 0],
            }}
            transition={{
              rotate: isUnlocked
                ? { duration: 1, ease: 'easeOut' }
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              boxShadow: '0 0 40px rgba(255, 20, 147, 0.8), inset 0 0 20px rgba(255, 20, 147, 0.3)',
            }}
          >
            {/* Wheel center */}
            <div className="w-4 h-4 rounded-full bg-[#FF1493]" />

            {/* Wheel spokes */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`spoke-${i}`}
                className="absolute w-12 h-0.5 bg-[#FF1493] opacity-60"
                style={{
                  transform: `rotate(${(i / 8) * 360}deg)`,
                }}
              />
            ))}

            {/* Wheel numbers */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`num-${i}`}
                className="absolute text-xs font-bold text-[#FF1493] opacity-70"
                style={{
                  transform: `rotate(${(i / 12) * 360}deg) translateY(-50px)`,
                }}
              >
                {i === 0 ? '0' : i}
              </div>
            ))}
          </motion.div>

          {/* Lock indicator */}
          {!isUnlocked && (
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="text-lg">🔒</span>
              <span className="text-xs text-[#FF1493] font-semibold">LOCKED</span>
            </motion.div>
          )}

          {/* Unlock indicator */}
          {isUnlocked && (
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-lg">🔓</span>
              <span className="text-xs text-[#FF1493] font-semibold">UNLOCKED</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Roses and candles around vault */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`rose-${i}`}
          className="absolute text-3xl"
          style={{
            left: i % 2 === 0 ? '10%' : '90%',
            top: i < 2 ? '30%' : '70%',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          🌹
        </motion.div>
      ))}

      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`candle-${i}`}
          className="absolute text-2xl"
          style={{
            left: i === 0 ? '20%' : '80%',
            bottom: '20%',
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          🕯️
        </motion.div>
      ))}

      {/* Countdown section */}
      <motion.div
        className="mt-12 w-full max-w-sm space-y-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <p className="text-center text-white/70 text-sm">
          This vault holds a very special surprise for you ❤️
        </p>

        <div className="text-center space-y-2">
          <p className="text-white/60 text-xs">Unlocks on</p>
          <p className="text-2xl font-bold text-[#FF1493] text-glow-pink">
            June 25, 2026
          </p>
          <p className="text-sm text-white/60">❤️ 12:00 AM ❤️</p>
        </div>

        {/* Countdown cards */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HOURS' },
            { value: timeLeft.minutes, label: 'MINUTES' },
            { value: timeLeft.seconds, label: 'SECONDS' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="glass-intense rounded-lg p-2 text-center"
              variants={fadeInUp}
            >
              <motion.div
                className="text-xl font-bold text-[#FF1493] text-glow-pink"
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
        </div>

        <p className="text-center text-white/60 text-xs italic">
          Patience is tough, but the wait will be totally worth it ❤️ ✨
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        onClick={onPrevious}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full neon-border-thick hover:shadow-lg transition-all"
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Continue ❤️
      </motion.button>

      {/* Floating hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`vault-heart-${i}`}
          className="fixed text-3xl opacity-20 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
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
