'use client';

import { motion } from 'motion/react';
import { ShoppingBag, Sparkles, Gift } from 'lucide-react';

export default function TiendaHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 'calc(80px + 5rem)',
        paddingBottom: '4rem',
        background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
      }}
    >
      {/* Decorative Floating Blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Yellow circle - top left */}
        <motion.div
          className="absolute left-[8%] top-[20%] h-16 w-16 rounded-full md:h-24 md:w-24"
          style={{ background: '#fcd34d' }}
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Coral blob - left side */}
        <motion.div
          className="blob absolute -left-16 top-[45%] h-40 w-40 opacity-50 md:h-56 md:w-56"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Lavender blob - right side large */}
        <motion.div
          className="blob absolute -right-24 top-[15%] h-72 w-72 opacity-35 md:h-[400px] md:w-[400px]"
          style={{
            background: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mint circle - bottom right */}
        <motion.div
          className="absolute bottom-[15%] right-[18%] h-12 w-12 rounded-full md:h-16 md:w-16"
          style={{ background: '#6ee7b7' }}
          animate={{
            y: [10, -10, 10],
            x: [-5, 5, -5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Pink small blob - top right */}
        <motion.div
          className="blob absolute right-[30%] top-[8%] h-20 w-20 opacity-45 md:h-28 md:w-28"
          style={{
            background: 'linear-gradient(135deg, #fce7f3 0%, #e056a0 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            y: [-5, 10, -5],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Floating shopping bag icon */}
        <motion.div
          className="absolute left-[15%] top-[60%] text-coral/20"
          animate={{
            y: [-8, 8, -8],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ShoppingBag className="h-10 w-10 md:h-14 md:w-14" />
        </motion.div>

        {/* Floating gift icon */}
        <motion.div
          className="absolute bottom-[30%] right-[12%] text-lavender/25"
          animate={{
            y: [5, -10, 5],
            rotate: [5, -5, 5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Gift className="h-8 w-8 md:h-12 md:w-12" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-coral" />
            </motion.div>
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold uppercase tracking-wider text-gray-carbon">
              Recursos para tu éxito
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-[var(--font-headline)] text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.1] text-black-deep"
          >
            Tu camino{' '}
            <span className="relative inline-block">
              <span className="gradient-text">comienza aquí</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-[4px] w-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #ff6b6b, #e056a0)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                layoutId="underline"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-lg leading-relaxed text-gray-carbon md:text-xl"
          >
            Cursos, guías y herramientas diseñadas para ayudarte a construir tu carrera remota
            con confianza y claridad.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              { number: '500+', label: 'Estudiantes' },
              { number: '6', label: 'Productos' },
              { number: '100%', label: 'Online' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-[var(--font-headline)] text-3xl font-bold text-coral md:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-sm font-medium text-gray-carbon">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
