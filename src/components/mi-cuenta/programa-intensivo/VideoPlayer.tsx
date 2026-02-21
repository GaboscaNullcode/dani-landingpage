'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  embedUrl: string;
  title: string;
}

export default function VideoPlayer({ embedUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = useCallback(() => {
    setIsLoading(true);
    setIsPlaying(true);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-dark">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.button
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handlePlay}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-gradient-to-br from-gray-dark via-gray-dark/95 to-black-deep"
            aria-label={`Reproducir ${title}`}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-coral blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full bg-pink blur-3xl" />
            </div>

            {/* Play button */}
            <div className="relative flex flex-col items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-coral shadow-lg shadow-coral/30 transition-shadow group-hover:shadow-xl group-hover:shadow-coral/40 sm:h-20 sm:w-20"
              >
                <Play className="h-7 w-7 translate-x-0.5 text-white sm:h-8 sm:w-8" />
              </motion.div>
              <span className="text-sm font-medium text-white/70 transition-colors group-hover:text-white/90">
                Reproducir video
              </span>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black-deep/80 to-transparent px-4 pb-4 pt-8">
              <p className="text-sm font-medium text-white/90">{title}</p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-dark">
                <Loader2 className="h-8 w-8 animate-spin text-coral" />
              </div>
            )}
            <iframe
              src={embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              title={title}
              loading="lazy"
              onLoad={handleIframeLoad}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
