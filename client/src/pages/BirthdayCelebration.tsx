import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface BirthdayCelebrationProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface Confetti {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

export function BirthdayCelebration({
  onNavigate,
  onPrevious,
}: BirthdayCelebrationProps) {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Generate initial fireworks
    const initialFireworks: Firework[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60 + 20,
      color: i % 2 === 0 ? '#FF1493' : '#A020F0',
    }));
    setFireworks(initialFireworks);

    // Generate confetti
    const initialConfetti: Confetti[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 2,
    }));
    setConfetti(initialConfetti);

    // Add more fireworks periodically
    const fireworkInterval = setInterval(() => {
      const newFirework: Firework = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 60 + 20,
        color: Math.random() > 0.5 ? '#FF1493' : '#A020F0',
      };
      setFireworks((prev) => [...prev.slice(-4), newFirework]);
    }, 1500);

    return () => clearInterval(fireworkInterval);
  }, []);

  const Firework = ({ firework }: { firework: Firework }) => (
    <motion.div
      key={`firework-${firework.id}`}
      className="fixed pointer-events-none"
      style={{
        left: `${firework.x}%`,
        top: `${firework.y}%`,
      }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        opacity: [1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
    >
      {/* Firework burst */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: firework.color,
              boxShadow: `0 0 8px ${firework.color}`,
            }}
            initial={{ x: 0, y: 0 }}
            animate={{ x, y, opacity: [1, 0] }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </motion.div>
  );

  const ConfettiPiece = ({ confetti: conf }: { confetti: Confetti }) => (
    <motion.div
      key={`confetti-${conf.id}`}
      className="fixed pointer-events-none text-2xl"
      style={{
        left: `${conf.x}%`,
        top: '-20px',
      }}
      initial={{ y: 0, opacity: 1, rotate: 0 }}
      animate={{
        y: window.innerHeight + 20,
        opacity: [1, 0],
        rotate: 360,
        x: Math.sin(conf.id) * 50,
      }}
      transition={{
        duration: conf.duration,
        delay: conf.delay,
        ease: 'easeIn',
      }}
    >
      {conf.id % 3 === 0 ? '❤️' : conf.id % 3 === 1 ? '✨' : '🎉'}
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
      {/* Fireworks */}
      {fireworks.map((fw) => (
        <Firework key={`fw-${fw.id}`} firework={fw} />
      ))}

      {/* Confetti */}
      {confetti.map((conf) => (
        <ConfettiPiece key={`conf-${conf.id}`} confetti={conf} />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-md text-center space-y-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="space-y-2">
          <h1 className="text-5xl font-bold text-[#FF1493] animate-glow-pulse">
            ❤️ Birthday Mode ❤️
          </h1>
          <p className="text-sm text-white/60">The day is finally here! ✨</p>
        </motion.div>

        {/* Cake illustration */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-8xl">🎂</div>
        </motion.div>

        {/* Main text */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <h2 className="text-5xl font-bold text-[#FF1493] text-glow-pink italic">
            Happy
          </h2>
          <h2 className="text-5xl font-bold text-[#FF1493] text-glow-pink italic">
            Birthday
          </h2>
          <h2 className="text-5xl font-bold text-[#FF1493] text-glow-pink italic">
            My Love ❤️
          </h2>
        </motion.div>

        {/* Decorative text */}
        <motion.p
          variants={fadeInUp}
          className="text-white/70 text-sm leading-relaxed"
        >
          Today is all about you, my love ❤️
          <br />
          Thank you for being the most beautiful part of my life ✨
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={fadeInUp}
          onClick={onNavigate}
          className="px-8 py-4 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full text-lg neon-border-thick hover:shadow-lg transition-all"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          Let's Celebrate 🎉 ❤️
        </motion.button>
      </motion.div>

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
        <button
          onClick={onNavigate}
          className="p-3 rounded-full glass hover:bg-white/10 transition-all"
          aria-label="Next page"
        >
          <ChevronDown className="w-6 h-6 text-[#FF1493]" />
        </button>
      </motion.div>

      {/* Floating balloons */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="fixed text-3xl pointer-events-none"
          style={{
            left: `${10 + (i % 3) * 35}%`,
            top: `${30 + Math.floor(i / 3) * 40}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          🎈
        </motion.div>
      ))}
    </motion.div>
  );
}
