'use client';

import { motion } from 'motion/react';

export default function BlogHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 'calc(80px + 5rem)',
        paddingBottom: '3rem',
        background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
      }}
    >
      {/* Decorative Floating Blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Yellow circle - top left */}
        <motion.div
          className="absolute left-[5%] top-[15%] h-16 w-16 rounded-full md:h-24 md:w-24"
          style={{ background: '#fcd34d' }}
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Coral blob - left side */}
        <motion.div
          className="blob absolute -left-10 top-[40%] h-32 w-32 opacity-60 md:h-48 md:w-48"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Lavender blob - right side large */}
        <motion.div
          className="blob absolute -right-20 top-[20%] h-64 w-64 opacity-40 md:h-96 md:w-96"
          style={{
            background: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mint circle - bottom right */}
        <motion.div
          className="absolute bottom-[20%] right-[15%] h-10 w-10 rounded-full md:h-14 md:w-14"
          style={{ background: '#6ee7b7' }}
          animate={{
            y: [10, -10, 10],
            x: [-5, 5, -5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Pink small blob - top right */}
        <motion.div
          className="blob absolute right-[25%] top-[10%] h-20 w-20 opacity-50 md:h-28 md:w-28"
          style={{
            background: 'linear-gradient(135deg, #fce7f3 0%, #e056a0 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            y: [-5, 10, -5],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Simple Overline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-[var(--font-dm-sans)] text-sm font-medium uppercase tracking-[0.2em] text-coral"
          >
            Blog
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-[var(--font-headline)] text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.1] text-black-deep"
          >
            Recursos para tu{' '}
            <span className="relative">
              <span className="gradient-text">camino remoto</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-coral/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-lg leading-relaxed text-gray-carbon"
          >
            Consejos prácticos, herramientas y experiencias reales para ayudarte a construir tu
            carrera desde cualquier lugar.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
