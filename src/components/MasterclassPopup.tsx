'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'masterclass-popup-dismissed';
const DISMISS_DURATION_DAYS = 7;

// Hook to detect client-side mounting without setState in useEffect
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function MasterclassPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;

    // Check if user has dismissed the popup recently
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissDate = new Date(dismissedAt);
      const now = new Date();
      const daysSinceDismiss = (now.getTime() - dismissDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSinceDismiss < DISMISS_DURATION_DAYS) {
        return; // Don't show popup
      }
    }

    // Show popup after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasMounted]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  };

  // Don't render on server to avoid hydration mismatch
  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="fixed bottom-6 left-6 z-[999] w-[calc(100%-3rem)] max-w-sm sm:w-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
              }}
            />

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="relative flex items-start gap-4">
              {/* Icon */}
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                }}
              >
                <Play className="h-6 w-6 fill-white text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 pr-4">
                <div className="mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-coral" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-coral">
                    Gratis
                  </span>
                </div>
                <h3 className="mb-1.5 font-[var(--font-headline)] text-base font-bold text-gray-dark">
                  Masterclass de 2 horas
                </h3>
                <p className="mb-3 text-sm leading-snug text-gray-medium">
                  Disponible ahora para ti. Aprende a iniciar en el trabajo remoto.
                </p>

                <Link
                  href="/newsletter"
                  onClick={handleDismiss}
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                  }}
                >
                  <span>Ver Masterclass</span>
                  <Play className="h-3 w-3 fill-current" />
                </Link>
              </div>
            </div>

            {/* Decorative blob */}
            <div
              className="blob absolute -bottom-10 -right-10 h-24 w-24 opacity-10"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
