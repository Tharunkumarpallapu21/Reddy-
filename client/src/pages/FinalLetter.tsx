import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface FinalLetterProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

const letterContent = `My Dearest ❤️

Happy Birthday to the most amazing person in my life! 🎂 ❤️

These 6 years have been the most beautiful journey I could have ever imagined.

You have been my best friend, my partner in crime, my strength, my happiness, and my everything.

Thank you for coming into my life and making it so much more colorful, joyful and meaningful.

You make me believe in soulmates, in forever, in magic.

Today is your day, and I hope all your dreams come true. You deserve all the love and happiness in the world 🌍 💕

Thank you for being you. I am so lucky to have you.

I love you endlessly, today, tomorrow and forever ❤️

Forever yours,
Your Love 💕`;

export function FinalLetter({ onNavigate, onPrevious }: FinalLetterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < letterContent.length) {
        setDisplayedText(letterContent.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen w-full px-6 py-12 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="relative z-10 max-w-md mx-auto text-center mb-8 pt-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <h1 className="text-4xl font-bold text-[#FF1493] animate-glow-pulse">
            ❤️ Final Letter ❤️
          </h1>
          <p className="text-sm text-white/60">From my heart to yours</p>
        </motion.div>
      </motion.div>

      {/* Letter card */}
      <motion.div
        className="relative z-10 max-w-md mx-auto mb-12"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="glass-intense rounded-lg p-8 space-y-4 min-h-96 relative overflow-hidden">
          {/* Decorative roses */}
          <motion.div
            className="absolute top-4 right-4 text-2xl opacity-40"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🌹
          </motion.div>

          <motion.div
            className="absolute bottom-4 left-4 text-2xl opacity-40"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
              ease: 'easeInOut',
            }}
          >
            🌹
          </motion.div>

          {/* Letter text with typewriter effect */}
          <div className="relative z-10 text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-light">
            {displayedText}
            {!isComplete && (
              <motion.span
                className="inline-block w-2 h-4 ml-1 bg-[#FF1493]"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </div>

          {/* Candle glow effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 20, 147, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      {/* Next button - appears after text is complete */}
      {isComplete && (
        <motion.div
          className="relative z-10 max-w-md mx-auto text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={onNavigate}
            className="px-8 py-3 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full neon-border-thick hover:shadow-lg transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Next ❤️
          </motion.button>
        </motion.div>
      )}

      {/* Navigation buttons */}
      <motion.div
        className="fixed top-8 left-8 right-8 flex justify-between z-20"
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
        {isComplete && (
          <button
            onClick={onNavigate}
            className="p-3 rounded-full glass hover:bg-white/10 transition-all"
            aria-label="Next page"
          >
            <ChevronDown className="w-6 h-6 text-[#FF1493]" />
          </button>
        )}
      </motion.div>

      {/* Floating hearts and sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`letter-element-${i}`}
          className="fixed text-2xl opacity-20 pointer-events-none"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${20 + Math.floor(i / 4) * 60}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          {i % 2 === 0 ? '❤️' : '✨'}
        </motion.div>
      ))}
    </motion.div>
  );
}
