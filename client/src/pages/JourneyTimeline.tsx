import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer, expandCollapse } from '@/lib/animations';

interface TimelineCard {
  year: number;
  title: string;
  description: string;
  details: string;
  image: string;
}

interface JourneyTimelineProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

const timelineData: TimelineCard[] = [
  {
    year: 1,
    title: 'The Beginning',
    description: 'Where our story beautifully started',
    details:
      'The moment we met, everything changed. Two souls finding each other in this vast universe. The beginning of forever.',
    image: 'year1.jpg',
  },
  {
    year: 2,
    title: 'Growing Together',
    description: 'We learned, we laughed, we loved',
    details:
      'Every day brought new adventures. We discovered each other, shared dreams, and built something beautiful together.',
    image: 'year2.jpg',
  },
  {
    year: 3,
    title: 'Stronger Days',
    description: 'Every moment made our bond stronger',
    details:
      'Through challenges and triumphs, we grew stronger. Our love became unshakeable, our connection deeper.',
    image: 'year3.jpg',
  },
  {
    year: 4,
    title: 'Unforgettable Times',
    description: 'Adventures, memories and endless smiles',
    details:
      'We created memories that will last forever. Every moment with you is a treasure I hold close to my heart.',
    image: 'year4.jpg',
  },
  {
    year: 5,
    title: 'Love Deepens',
    description: 'More love, more trust, more dreams together',
    details:
      'Our love evolved into something even more profound. We became not just partners, but soulmates.',
    image: 'year5.jpg',
  },
  {
    year: 6,
    title: 'Forever & Always',
    description: 'And this is just the beginning of forever',
    details:
      'Six years of beautiful memories, and a lifetime of dreams ahead. You are my forever, my always, my everything.',
    image: 'year6.jpg',
  },
];

export function JourneyTimeline({ onNavigate, onPrevious }: JourneyTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(0);
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
        className="relative z-10 max-w-md mx-auto text-center mb-12 pt-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <h1 className="text-4xl font-bold text-[#FF1493] animate-glow-pulse">
            ❤️ Our Journey ❤️
          </h1>
          <p className="text-sm text-white/60">6 Years, Countless Memories ✨</p>
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="relative z-10 max-w-md mx-auto space-y-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF1493] via-[#A020F0] to-[#FF1493]" />

        {/* Timeline cards */}
        {timelineData.map((card, index) => (
          <motion.div
            key={`timeline-${card.year}`}
            variants={fadeInUp}
            className="relative pl-24"
          >
            {/* Heart marker */}
            <motion.div
              className="absolute left-0 top-6 w-16 h-16 flex items-center justify-center"
              animate={{
                scale: expandedId === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(255, 20, 147, 0.3)',
                      '0 0 20px rgba(255, 20, 147, 0.6)',
                      '0 0 10px rgba(255, 20, 147, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <button
                  onClick={() =>
                    setExpandedId(expandedId === index ? null : index)
                  }
                  className="relative w-16 h-16 rounded-full glass-intense flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label={`Toggle Year ${card.year} details`}
                >
                  <Heart className="w-8 h-8 text-[#FF1493] fill-[#FF1493]" />
                </button>
              </div>
            </motion.div>

            {/* Card */}
            <motion.button
              onClick={() =>
                setExpandedId(expandedId === index ? null : index)
              }
              className="w-full text-left glass-intense rounded-lg p-4 hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FF1493] mb-1">
                    Year {card.year} ❤️
                  </h3>
                  <p className="text-white font-semibold mb-2">{card.title}</p>
                  <p className="text-sm text-white/70">{card.description}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-[#FF1493]" />
                </motion.div>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    variants={expandCollapse}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-[#FF1493]/20 space-y-3">
                      {/* Placeholder image */}
                      <div className="w-full h-40 bg-gradient-to-br from-[#A020F0]/30 to-[#FF1493]/20 rounded-lg flex items-center justify-center border border-[#FF1493]/30">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📸</div>
                          <p className="text-xs text-white/50">{card.image}</p>
                        </div>
                      </div>

                      {/* Details text */}
                      <p className="text-sm text-white/80 leading-relaxed">
                        {card.details}
                      </p>

                      {/* Floating hearts */}
                      <div className="flex justify-center gap-2 pt-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.span
                            key={`heart-${i}`}
                            animate={{
                              y: [0, -5, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            className="text-lg"
                          >
                            ❤️
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        ))}
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

      {/* Floating elements */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`timeline-float-${i}`}
          className="fixed text-2xl opacity-20 pointer-events-none"
          style={{
            left: `${10 + i * 25}%`,
            top: `${20 + (i % 2) * 60}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 25, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
}
