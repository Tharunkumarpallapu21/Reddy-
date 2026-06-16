import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface Letter {
  id: number;
  title: string;
  content: string;
}

interface SecretLettersProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

const letters: Letter[] = [
  {
    id: 1,
    title: 'Letter 1',
    content:
      'Every moment with you feels like a beautiful dream. From the first day we met, I knew you were someone special. Thank you for being my greatest adventure.',
  },
  {
    id: 2,
    title: 'Letter 2',
    content:
      'You are my favorite person to laugh with, cry with, and dream with. In your eyes, I found my home. In your heart, I found my forever.',
  },
  {
    id: 3,
    title: 'Letter 3',
    content:
      'Six years have passed, and every single day, I fall in love with you all over again. You make me believe in soulmates, in forever, in magic.',
  },
  {
    id: 4,
    title: 'Letter 4',
    content:
      'Happy birthday to the love of my life. This is just the beginning of our story. I cannot wait to spend the rest of forever with you. You are my everything.',
  },
];

export function SecretLetters({ onNavigate, onPrevious }: SecretLettersProps) {
  const [openedLetter, setOpenedLetter] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const Envelope = ({ letter, index }: { letter: Letter; index: number }) => (
    <motion.div
      className="relative h-48 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setOpenedLetter(letter.id)}
    >
      {openedLetter === letter.id ? (
        // Opened envelope - letter view
        <motion.div
          layoutId={`letter-${letter.id}`}
          className="relative w-full h-full"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 0 }}
        >
          <div className="absolute inset-0 glass-intense rounded-lg p-6 flex flex-col justify-between overflow-hidden border border-[#FF1493]/40">
            {/* Decorative roses */}
            <motion.div
              className="absolute top-3 right-3 text-lg opacity-40"
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

            {/* Letter content */}
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#FF1493] mb-3 font-semibold italic">My Dearest ❤️</p>
                <p className="text-xs text-white/80 leading-relaxed">
                  {letter.content}
                </p>
              </div>
              <p className="text-xs text-white/60 italic mt-4">Forever yours ❤️</p>
            </div>

            {/* Close button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setOpenedLetter(null);
              }}
              className="absolute top-3 left-3 p-1 rounded-full hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-white/60" />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        // Closed envelope with 3D effect
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Envelope glow */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 20, 147, 0.4), inset 0 0 20px rgba(255, 20, 147, 0.1)',
                '0 0 50px rgba(255, 20, 147, 0.7), inset 0 0 30px rgba(255, 20, 147, 0.2)',
                '0 0 20px rgba(255, 20, 147, 0.4), inset 0 0 20px rgba(255, 20, 147, 0.1)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />

          {/* Main envelope body */}
          <div className="relative w-full h-full bg-gradient-to-br from-[#FF1493] via-[#FF4DA6] to-[#FF1493] rounded-lg shadow-2xl overflow-hidden">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white to-transparent" />

            {/* Envelope flap (top triangle) */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/3"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.8) 0%, rgba(255, 77, 166, 0.6) 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />

            {/* Wax seal - large glowing heart */}
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[#FF1493] to-[#A020F0] flex items-center justify-center text-2xl z-20 shadow-lg"
              animate={{
                scale: [1, 1.15, 1],
                boxShadow: [
                  '0 0 20px rgba(255, 20, 147, 0.6), inset 0 0 10px rgba(255, 20, 147, 0.3)',
                  '0 0 50px rgba(255, 20, 147, 0.9), inset 0 0 20px rgba(255, 20, 147, 0.5)',
                  '0 0 20px rgba(255, 20, 147, 0.6), inset 0 0 10px rgba(255, 20, 147, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            >
              ❤️
            </motion.div>

            {/* Letter number badge */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="text-white font-bold text-lg">{letter.id}</span>
            </div>

            {/* Tap indicator */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <p className="text-white/70 text-xs font-light">Tap to open</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

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
            ❤️ Secret Letters ❤️
          </h1>
          <p className="text-sm text-white/60">Messages from my heart to yours</p>
        </motion.div>
      </motion.div>

      {/* Envelopes stack */}
      <motion.div
        className="relative z-10 w-full max-w-sm space-y-4 mt-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {letters.map((letter, index) => (
          <Envelope key={`letter-${letter.id}`} letter={letter} index={index} />
        ))}
      </motion.div>

      {/* Footer text */}
      <motion.p
        className="relative z-10 text-center text-white/60 text-sm italic mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Some words are better kept in letters... ❤️
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onNavigate}
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
        Next ❤️
      </motion.button>

      {/* Floating roses */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`rose-${i}`}
          className="fixed text-2xl opacity-20 pointer-events-none"
          style={{
            left: `${15 + (i % 3) * 35}%`,
            top: `${25 + Math.floor(i / 3) * 50}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          🌹
        </motion.div>
      ))}
    </motion.div>
  );
}
