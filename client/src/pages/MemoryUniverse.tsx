import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface Memory {
  id: number;
  title: string;
  description: string;
  x: number;
  y: number;
}

interface MemoryUniverseProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

const memories: Memory[] = [
  {
    id: 1,
    title: 'Our First Hello',
    description: 'The moment our eyes met and everything changed forever.',
    x: 20,
    y: 15,
  },
  {
    id: 2,
    title: 'First Trip Together',
    description: 'Adventures, laughter, and memories that will last a lifetime.',
    x: 75,
    y: 18,
  },
  {
    id: 3,
    title: 'That Special Day',
    description: 'The day you became mine, and I became yours forever.',
    x: 50,
    y: 12,
  },
  {
    id: 4,
    title: 'Support & Love',
    description: 'Through thick and thin, you were always there for me.',
    x: 15,
    y: 50,
  },
  {
    id: 5,
    title: 'Endless Laughs',
    description: 'Every moment with you is filled with joy and laughter.',
    x: 80,
    y: 55,
  },
  {
    id: 6,
    title: 'Dreams Shared',
    description: 'Building a future together, one dream at a time.',
    x: 50,
    y: 60,
  },
];

export function MemoryUniverse({ onNavigate, onPrevious }: MemoryUniverseProps) {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="absolute top-12 left-0 right-0 text-center z-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="space-y-1">
          <h1 className="text-3xl font-bold text-[#FF1493] animate-glow-pulse">
            ❤️ Memory Universe ❤️
          </h1>
          <p className="text-sm text-white/60">Tap a star to relive a memory</p>
        </motion.div>
      </motion.div>

      {/* Massive night sky with stars */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep starfield */}
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Nebula glow */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 20, 147, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Constellation network and memory stars */}
      <div className="relative z-10 w-full h-96 max-w-2xl">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 600"
          style={{ pointerEvents: 'none' }}
        >
          {/* Constellation lines */}
          {memories.map((memory, idx) => {
            const nextMemory = memories[(idx + 1) % memories.length];
            return (
              <motion.line
                key={`line-${memory.id}`}
                x1={`${memory.x}%`}
                y1={`${memory.y}%`}
                x2={`${nextMemory.x}%`}
                y2={`${nextMemory.y}%`}
                stroke="#FF1493"
                strokeWidth="1"
                opacity="0.3"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: idx * 0.2,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </svg>

        {/* Memory stars */}
        {memories.map((memory) => (
          <motion.div
            key={`memory-${memory.id}`}
            className="absolute cursor-pointer"
            style={{
              left: `${memory.x}%`,
              top: `${memory.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setSelectedMemory(memory.id)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Star glow */}
            <motion.div
              className="absolute inset-0 -m-4 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 20, 147, 0.4)',
                  '0 0 50px rgba(255, 20, 147, 0.8)',
                  '0 0 20px rgba(255, 20, 147, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Star body */}
            <motion.div
              className="relative w-6 h-6 rounded-full bg-gradient-to-br from-[#FF1493] to-[#A020F0] flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
              }}
            >
              <span className="text-xs">✨</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Couple silhouette at bottom */}
      <motion.div
        className="relative z-10 mt-12 flex justify-center items-end gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-32 h-40 fill-[#FF1493] opacity-40"
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

      {/* Memory detail popup */}
      {selectedMemory && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMemory(null)}
        >
          <motion.div
            className="glass-intense rounded-lg p-6 max-w-sm text-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#FF1493]">
              {memories.find((m) => m.id === selectedMemory)?.title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {memories.find((m) => m.id === selectedMemory)?.description}
            </p>
            <motion.button
              onClick={() => setSelectedMemory(null)}
              className="px-6 py-2 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white text-sm rounded-full neon-border hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close ❤️
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.p
        className="relative z-10 mt-8 text-center text-white/60 text-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Tap on any glowing star to explore that memory ✨
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onNavigate}
        className="relative z-10 mt-8 px-8 py-3 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full neon-border-thick hover:shadow-lg transition-all"
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
    </motion.div>
  );
}
