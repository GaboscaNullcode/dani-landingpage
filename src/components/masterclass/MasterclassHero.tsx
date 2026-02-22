'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Play, Clock, Sparkles } from 'lucide-react';

const tags = [
  { label: '100% Practico', bg: 'bg-coral/10 text-coral' },
  { label: 'Paso a Paso', bg: 'bg-pink/10 text-pink' },
  { label: 'Para LATAM y Global', bg: 'bg-lavender/10 text-lavender' },
];

export default function MasterclassHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '200px' });

  return (
    <section
      ref={ref}
      className="noise-overlay relative flex min-h-[70vh] items-center overflow-hidden py-32"
      style={{
        background:
          'linear-gradient(135deg, #fef7f0 0%, #ffecd2 40%, #fce7f3 100%)',
      }}
    >
      {/* Animated decorative blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="blob absolute -right-20 -top-20 h-[500px] w-[500px] opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
          animate={
            isInView
              ? { scale: [1, 1.1, 1], rotate: [0, 10, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="blob absolute -bottom-32 -left-32 h-[400px] w-[400px] opacity-25"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
          animate={
            isInView
              ? { scale: [1, 1.15, 1], rotate: [0, -15, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Floating shapes */}
        <motion.div
          className="absolute left-[10%] top-[20%] flex h-12 w-12 items-center justify-center rounded-full bg-sunshine opacity-60"
          animate={
            isInView
              ? { y: [-10, 20, -10], x: [-5, 10, -5], rotate: [0, 180, 360] }
              : { y: 0, x: 0, rotate: 0 }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[12%] top-[35%] flex h-10 w-10 items-center justify-center rounded-full bg-mint opacity-50"
          animate={
            isInView
              ? { y: [0, -25, 0], x: [0, 15, 0] }
              : { y: 0, x: 0 }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="blob absolute bottom-[25%] left-[5%] h-24 w-24 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
          }}
          animate={
            isInView
              ? { y: [-15, 15, -15], scale: [1, 1.2, 1] }
              : { y: 0, scale: 1 }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2.5 shadow-md backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Play className="h-5 w-5 text-coral" />
            </motion.div>
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-gray-dark">
              Masterclass Gratuita
            </span>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
              GRATIS
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            className="text-hero-title font-[var(--font-headline)] font-bold text-black-deep"
          >
            Vive en{' '}
            <span className="gradient-text-playful">Modo Remoto</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 font-[var(--font-headline)] text-xl font-semibold text-gray-dark md:text-2xl"
          >
            Empieza tu camino remoto hoy!
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body-large mx-auto mt-6 max-w-2xl text-gray-carbon"
          >
            En esta masterclass gratuita de{' '}
            <span className="font-semibold text-coral">2 horas</span>, Dani te
            explica como iniciar en el trabajo remoto desde cero: que opciones
            existen, que busca el mercado, que necesitas para postular y como
            evitar errores comunes al empezar.
          </motion.p>

          {/* Duration badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2 text-gray-carbon"
          >
            <Clock className="h-5 w-5 text-coral" />
            <span className="font-medium">2 horas de contenido practico</span>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {tags.map((tag, index) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className={`rounded-full px-5 py-2 text-sm font-semibold ${tag.bg}`}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-5 w-5 text-coral/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
