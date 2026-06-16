import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface SpecialVideoProps {
  onNavigate: () => void;
  onPrevious: () => void;
}

export function SpecialVideo({ onNavigate, onPrevious }: SpecialVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(125);
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setCurrentTime((newProgress / 100) * duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
            ❤️ Our Special Video ❤️
          </h1>
          <p className="text-sm text-white/60">A little something for you</p>
        </motion.div>
      </motion.div>

      {/* Video player */}
      <motion.div
        className="relative z-10 max-w-md mx-auto mb-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {/* Video container */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-[#A020F0]/40 to-[#FF1493]/20 rounded-lg overflow-hidden border-2 border-[#FF1493]/40 group">
          {/* Video placeholder with heart */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0D021F] to-[#050010]">
            <div className="text-center space-y-4">
              <motion.div
                className="text-6xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ❤️
              </motion.div>
              <p className="text-white/60 text-sm">birthday-video.mp4</p>
            </div>
          </div>

          {/* Play button overlay */}
          <motion.button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center z-10 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-[#FF1493] flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 20, 147, 0.4)',
                  '0 0 40px rgba(255, 20, 147, 0.8)',
                  '0 0 20px rgba(255, 20, 147, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white fill-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              )}
            </motion.div>
          </motion.button>

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 space-y-2">
            {/* Progress bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-white/20 rounded-full cursor-pointer appearance-none"
              style={{
                background: `linear-gradient(to right, #FF1493 0%, #FF1493 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
              }}
            />

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handlePlayPause}
                  className="p-2 rounded-full hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white fill-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white fill-white" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleMuteToggle}
                  className="p-2 rounded-full hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </motion.button>

                <span className="text-xs text-white/60 ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <motion.button
                className="p-2 rounded-full hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Maximize className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal message card */}
      <motion.div
        className="relative z-10 max-w-md mx-auto mb-12"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="glass-intense rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#FF1493] text-center">
            For My Everything ❤️
          </h3>

          <p className="text-white/80 text-center text-sm leading-relaxed">
            Every moment with you is my favorite memory ✨
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#FF1493] to-transparent" />

          <p className="text-white/70 text-center text-xs italic">
            This video is a collection of our beautiful memories together. Sit back, relax, and enjoy this journey of love ❤️
          </p>
        </div>
      </motion.div>

      {/* Full screen button */}
      <motion.div
        className="relative z-10 max-w-md mx-auto text-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-[#FF1493] to-[#FF4DA6] text-white font-semibold rounded-full neon-border-thick hover:shadow-lg transition-all"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          Full Screen 📹
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

      {/* Floating elements */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`video-float-${i}`}
          className="fixed text-2xl opacity-20 pointer-events-none"
          style={{
            left: `${15 + (i % 3) * 35}%`,
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
