import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface FinalEndingProps {
  onReplay: () => void;
  onPrevious: () => void;
}

export function FinalEnding({ onReplay, onPrevious }: FinalEndingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen w-full px-6 py-12 overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Giant moon */}
      <motion.div
        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#FF1493]/40 to-[#A020F0]/20 border-2 border-[#FF1493]/60"
        animate={{
          boxShadow: [
            '0 0 40px rgba(255, 20, 147, 0.3), inset 0 0 40px rgba(255, 20, 147, 0.1)',
            '0 0 80px rgba(255, 20, 147, 0.6), inset 0 0 60px rgba(255, 20, 147, 0.2)',
            '0 0 40px rgba(255, 20, 147, 0.3), inset 0 0 40px rgba(255, 20, 147, 0.1)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Moon craters */}
        <div className="absolute top-8 left-12 w-6 h-6 rounded-full bg-[#FF1493]/20" />
        <div className="absolute bottom-16 right-8 w-4 h-4 rounded-full bg-[#FF1493]/20" />
        <div className="absolute top-1/3 right-6 w-3 h-3 rounded-full bg-[#FF1493]/20" />
      </motion.div>

      {/* Couple silhouette */}
      <motion.div
        className="relative z-10 mb-8 mt-32"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-32 h-32 fill-[#FF1493] opacity-60"
        >
          {/* Male silhouette */}
          <circle cx="60" cy="50" r="15" />
          <path d="M 60 65 Q 50 90 45 120 M 60 75 Q 40 85 30 110 M 60 75 Q 80 85 90 110" />

          {/* Female silhouette */}
          <circle cx="140" cy="50" r="15" />
          <path d="M 140 65 Q 150 90 155 120 M 140 75 Q 160 85 170 110 M 140 75 Q 120 85 110 110" />

          {/* Heart between them */}
          <path
            d="M 100 85 Q 95 75 85 75 Q 75 75 75 85 Q 75 95 100 110 Q 125 95 125 85 Q 125 75 115 75 Q 105 75 100 85"
            fill="#FF1493"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-md text-center space-y-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Main text */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <h2 className="text-4xl font-bold text-[#FF1493] text-glow-pink italic">
            6 Years...
          </h2>
          <h2 className="text-4xl font-bold text-[#FF1493] text-glow-pink italic">
            One Story...
          </h2>
          <h2 className="text-4xl font-bold text-[#FF1493] text-glow-pink italic">
            Countless Memories...
          </h2>
        </motion.div>

        {/* Birthday message */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl font-bold text-[#FF1493] animate-glow-pulse"
        >
          Happy Birthday My Love ❤️
        </motion.h1>

        {/* Divider */}
        <motion.div
          variants={fadeInUp}
          className="h-px bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"
        />

        {/* Final message */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <p className="text-white/80 text-sm leading-relaxed">
            Thank you for being the most beautiful part of my life.
          </p>
          <p className="text-white/80 text-sm leading-relaxed">
            Here's to many more years of love, laughter and unforgettable memories ❤️
          </p>
        </motion.div>

        {/* Closing */}
        <motion.p
          variants={fadeInUp}
          className="text-white/60 text-xs italic pt-4"
        >
          Until Forever & Always ✨
        </motion.p>

        {/* Replay button */}
        <motion.button
          variants={fadeInUp}
          onClick={onReplay}
          className="px-8 py-4 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full text-lg neon-border-thick hover:shadow-lg transition-all mt-6"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          Replay Our Story 💕
        </motion.button>
      </motion.div>

      {/* Navigation button */}
      <motion.div
        className="fixed top-8 left-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={onPrevious}
          className="p-3 rounded-full glass hover:bg-white/10 transition-all"
          aria-label="Previous page"
        >
          <ChevronUp className="w-6 h-6 text-[#FF1493]" />
        </button>
      </motion.div>

      {/* Floating heart balloons */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="fixed text-3xl opacity-30 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 6 + 8,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="fixed text-2xl opacity-20 pointer-events-none"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${15 + Math.floor(i / 4) * 70}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
}
