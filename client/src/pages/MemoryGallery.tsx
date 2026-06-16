import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

type FilterType = 'All' | 'Memories' | 'Trips' | 'Special' | 'Us';

interface GalleryItem {
  id: number;
  image: string;
  category: FilterType;
  rotation: number;
}

interface MemoryGalleryProps {
  onNavigate?: () => void;
  onPrevious: () => void;
}

const galleryItems: GalleryItem[] = [
  { id: 1, image: 'gallery1.jpg', category: 'Memories', rotation: -3 },
  { id: 2, image: 'gallery2.jpg', category: 'Trips', rotation: 2 },
  { id: 3, image: 'gallery3.jpg', category: 'Special', rotation: -2 },
  { id: 4, image: 'gallery4.jpg', category: 'Us', rotation: 3 },
  { id: 5, image: 'gallery5.jpg', category: 'Memories', rotation: -1 },
  { id: 6, image: 'gallery6.jpg', category: 'Trips', rotation: 1 },
  { id: 7, image: 'gallery7.jpg', category: 'Special', rotation: -4 },
  { id: 8, image: 'gallery8.jpg', category: 'Us', rotation: 2 },
];

const filters: FilterType[] = ['All', 'Memories', 'Trips', 'Special', 'Us'];

export function MemoryGallery({ onNavigate, onPrevious }: MemoryGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

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
            ❤️ Memory Gallery ❤️
          </h1>
          <p className="text-sm text-white/60">Some of our favorite clicks 📸</p>
        </motion.div>
      </motion.div>

      {/* Filter buttons */}
      <motion.div
        className="relative z-10 max-w-md mx-auto mb-8 flex flex-wrap gap-2 justify-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === filter
                ? 'bg-[#FF1493] text-white neon-border-thick'
                : 'glass text-white/70 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery grid */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto mb-12"
        layout
      >
        <motion.div
          className="grid grid-cols-2 gap-4 auto-rows-max"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.button
                key={`gallery-${item.id}`}
                onClick={() => setSelectedImage(item.id)}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                {/* Polaroid card */}
                <motion.div
                  className="bg-white rounded-sm shadow-lg overflow-hidden"
                  style={{
                    rotate: item.rotation,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    boxShadow: '0 0 30px rgba(255, 20, 147, 0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Image placeholder */}
                  <div className="w-full aspect-square bg-gradient-to-br from-[#A020F0]/40 to-[#FF1493]/30 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📸</div>
                      <p className="text-xs text-white/60">{item.image}</p>
                    </div>

                    {/* Overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-white text-sm font-semibold">
                        View
                      </span>
                    </motion.div>
                  </div>

                  {/* Polaroid bottom */}
                  <div className="bg-white p-3 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#FF1493]" />
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Memory count */}
      <motion.div
        className="relative z-10 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/70">
          ❤️ {filteredItems.length} Memories ❤️
        </p>
      </motion.div>

      {/* View Full Gallery button */}
      <motion.div
        className="relative z-10 max-w-md mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={() => setSelectedImage(1)}
          className="px-8 py-3 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full neon-border-thick hover:shadow-lg transition-all"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          View Full Gallery 📷
        </motion.button>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 rounded-full glass hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image */}
              <div className="bg-gradient-to-br from-[#A020F0]/40 to-[#FF1493]/30 rounded-lg overflow-hidden aspect-square flex items-center justify-center border-2 border-[#FF1493]">
                <div className="text-center">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-white/60">
                    {
                      galleryItems.find((item) => item.id === selectedImage)
                        ?.image
                    }
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <motion.button
                  onClick={() => {
                    const currentIndex = filteredItems.findIndex(
                      (item) => item.id === selectedImage
                    );
                    const prevIndex =
                      currentIndex === 0
                        ? filteredItems.length - 1
                        : currentIndex - 1;
                    setSelectedImage(filteredItems[prevIndex].id);
                  }}
                  className="px-4 py-2 glass rounded-full hover:bg-white/10 transition-all text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Previous
                </motion.button>

                <span className="text-white/60">
                  {filteredItems.findIndex((item) => item.id === selectedImage) +
                    1}{' '}
                  / {filteredItems.length}
                </span>

                <motion.button
                  onClick={() => {
                    const currentIndex = filteredItems.findIndex(
                      (item) => item.id === selectedImage
                    );
                    const nextIndex =
                      currentIndex === filteredItems.length - 1
                        ? 0
                        : currentIndex + 1;
                    setSelectedImage(filteredItems[nextIndex].id);
                  }}
                  className="px-4 py-2 glass rounded-full hover:bg-white/10 transition-all text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation button */}
      <motion.div
        className="fixed top-8 left-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {onNavigate && (
          <button
            onClick={onNavigate}
            className="p-3 rounded-full glass hover:bg-white/10 transition-all"
            aria-label="Next page"
          >
            <ChevronDown className="w-6 h-6 text-[#FF1493]" />
          </button>
        )}
      </motion.div>

      {/* Floating elements */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`gallery-float-${i}`}
          className="fixed text-2xl opacity-20 pointer-events-none"
          style={{
            left: `${15 + i * 20}%`,
            top: `${30 + (i % 2) * 50}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.cos(i) * 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i,
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

function Heart({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
