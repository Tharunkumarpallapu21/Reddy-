import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface WelcomeProps {
  onNavigate: () => void;
}

export function Welcome({ onNavigate }: WelcomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#050010] via-[#0D021F] to-[#050010]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated galaxy background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nebula clouds */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(160, 32, 240, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 20, 147, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Twinkling stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-between px-6 py-12">
        {/* Top section - Large glowing heart */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Glow layers */}
            <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-[#FF1493] to-[#A020F0] opacity-20 blur-3xl" />
            <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-[#FF1493] to-[#A020F0] opacity-30 blur-2xl" />

            {/* Heart SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-40 h-40 drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255, 20, 147, 0.8)) drop-shadow(0 0 80px rgba(160, 32, 240, 0.4))',
              }}
            >
              <path
                d="M50 85 C20 70, 5 55, 5 40 C5 25, 15 15, 25 15 C35 15, 45 25, 50 35 C55 25, 65 15, 75 15 C85 15, 95 25, 95 40 C95 55, 80 70, 50 85 Z"
                fill="none"
                stroke="#FF1493"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M50 85 C20 70, 5 55, 5 40 C5 25, 15 15, 25 15 C35 15, 45 25, 50 35 C55 25, 65 15, 75 15 C85 15, 95 25, 95 40 C95 55, 80 70, 50 85 Z"
                fill="#FF1493"
                opacity="0.3"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Middle section - Text content */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-md"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-bold text-[#FF1493] leading-tight"
          >
            Hey ❤️
          </motion.h1>

          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-lg text-white/90 leading-relaxed">
              This is not just a birthday website...
            </p>
            <p className="text-lg text-[#FF1493] leading-relaxed">
              This is a story...
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              A story that has been growing for{' '}
              <span className="text-[#FF1493] font-bold">6 years</span>...
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom section - Portal and CTA */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-end space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Portal doorway */}
          <motion.div
            className="relative w-32 h-40"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Portal glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FF1493] to-[#A020F0] opacity-20 blur-2xl" />

            {/* Portal frame */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[#FF1493] overflow-hidden">
              {/* Portal interior glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FF1493]/30 to-[#A020F0]/20" />

              {/* Animated light rays */}
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute w-1 h-full bg-gradient-to-b from-[#FF1493] to-transparent"
                  style={{
                    left: `${30 + i * 20}%`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleY: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Portal particles */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-[#FF1493]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 1,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={onNavigate}
            className="px-8 py-4 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full text-lg neon-border-thick hover:shadow-lg transition-all"
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 40px rgba(255, 20, 147, 0.9)',
            }}
            whileTap={{
              scale: 0.95,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Begin Our Story ❤️
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            className="text-[#FF1493] text-2xl"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      {/* Floating hearts background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
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
