import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface Stat {
  id: number;
  label: string;
  value: string;
  target: number;
  suffix: string;
  icon: string;
  description: string;
}

interface StoryInNumbersProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

const stats: Stat[] = [
  {
    id: 1,
    label: 'Years Together',
    value: '6',
    target: 6,
    suffix: '',
    icon: '📷',
    description: 'Beautiful Years ❤️',
  },
  {
    id: 2,
    label: 'Days Shared',
    value: '2191',
    target: 2191,
    suffix: '',
    icon: '❤️',
    description: 'Days of Love ❤️',
  },
  {
    id: 3,
    label: 'Memories Created',
    value: '∞',
    target: 1000,
    suffix: '+',
    icon: '📸',
    description: 'Countless Memories ❤️',
  },
  {
    id: 4,
    label: 'Special Moments',
    value: '1000',
    target: 1000,
    suffix: '+',
    icon: '⭐',
    description: 'And Many More... ❤️',
  },
  {
    id: 5,
    label: 'Us Against The World',
    value: '1',
    target: 1,
    suffix: '',
    icon: '👥',
    description: 'Always & Forever ❤️',
  },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2;
    const increment = end / (duration * 60);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

export function StoryInNumbers({ onNavigate, onPrevious }: StoryInNumbersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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
            ❤️ Our Story in Numbers ❤️
          </h1>
          <p className="text-sm text-white/60">Because every number has a memory</p>
        </motion.div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        className="relative z-10 max-w-md mx-auto space-y-4 mb-12"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={`stat-${stat.id}`}
            variants={fadeInUp}
            className="glass-intense rounded-lg p-6 space-y-3"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 20, 147, 0.4)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Icon and label */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white/80 mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-white/50">{stat.description}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>

            {/* Counter */}
            <motion.div
              className="text-4xl font-bold text-[#FF1493] text-glow-pink"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              {stat.value === '∞' ? (
                '∞'
              ) : (
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              )}
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="h-1 bg-gradient-to-r from-[#FF1493] to-[#A020F0] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer text */}
      <motion.p
        className="relative z-10 text-center text-white/60 text-sm italic max-w-md mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        It's not just the years, it's the memories we create together ❤️
      </motion.p>

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

      {/* Floating elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`numbers-float-${i}`}
          className="fixed text-2xl opacity-20 pointer-events-none"
          style={{
            left: `${10 + (i % 3) * 35}%`,
            top: `${25 + Math.floor(i / 3) * 50}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 25, 0],
            opacity: [0.1, 0.3, 0.1],
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
