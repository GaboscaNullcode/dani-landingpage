'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, ChevronDown, Clock } from 'lucide-react';
import type { ProgramaVideo } from '@/data/programa-intensivo-data';
import VideoPlayer from './VideoPlayer';

interface VideoListProps {
  videos: ProgramaVideo[];
}

export default function VideoList({ videos }: VideoListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {videos.map((video) => {
        const isOpen = expandedId === video.id;
        return (
          <div
            key={video.id}
            className="overflow-hidden rounded-xl border border-gray-light/60 bg-white/60 backdrop-blur-sm"
          >
            <button
              onClick={() => toggle(video.id)}
              className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-cream/30"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coral/10 text-sm font-bold text-coral">
                {video.orden}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-dark">{video.title}</h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-gray-medium">
                  {video.description}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-gray-dark">
                <Clock className="h-3 w-3" />
                {video.duration}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-gray-medium" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="border-t border-gray-light/40 px-4 pb-4 pt-4">
                    <p className="mb-4 text-sm text-gray-medium">
                      {video.description}
                    </p>
                    <VideoPlayer
                      embedUrl={video.embedUrl}
                      title={video.title}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {videos.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-light/60 p-8 text-center">
          <PlayCircle className="mx-auto mb-2 h-8 w-8 text-gray-light" />
          <p className="text-sm text-gray-medium">
            Los videos estaran disponibles pronto.
          </p>
        </div>
      )}
    </div>
  );
}
