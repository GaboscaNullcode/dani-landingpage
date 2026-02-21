'use client';

import { motion } from 'motion/react';
import { Calendar, Clock, Video, ArrowDown } from 'lucide-react';

export default function AsesoriaHero() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden"
      style={{
        paddingTop: 'var(--hero-padding-top)',
        paddingBottom: 'var(--section-padding)',
        background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
      }}
    >
      {/* Decorative blobs */}
      <motion.div
        className="blob absolute -right-32 -top-32 h-[500px] w-[500px] opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="blob absolute -left-32 bottom-0 h-[400px] w-[400px] opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm"
          >
            <Video className="h-4 w-4 text-coral" />
            <span className="text-sm font-semibold text-gray-dark">Elige el acompañamiento adecuado para ti.</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-hero-title mb-6 font-[var(--font-headline)] font-bold text-gray-dark"
          >
            El momento es ahora,{' '}
            <span className="gradient-text">Vamos paso a paso.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-body-large mx-auto mb-10 max-w-2xl text-gray-carbon"
          >
            Una sesión conmigo puede ahorrarte meses de prueba y error.
            Te doy claridad, una estrategia concreta y la seguridad para avanzar con dirección.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-gray-carbon">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
                <Video className="h-5 w-5 text-coral" />
              </div>
              <span className="font-medium">Por videollamada</span>
            </div>
            <div className="flex items-center gap-2 text-gray-carbon">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink/10">
                <Calendar className="h-5 w-5 text-pink" />
              </div>
              <span className="font-medium">Horarios flexibles</span>
            </div>
            <div className="flex items-center gap-2 text-gray-carbon">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender/10">
                <Clock className="h-5 w-5 text-lavender" />
              </div>
              <span className="font-medium">Reporte incluido</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a
              href="#planes"
              className="btn-shimmer inline-flex items-center gap-2 rounded-full px-8 py-4 font-[var(--font-headline)] text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-1"
              style={{
                background: 'var(--gradient-coral-pink)',
                boxShadow: '0 10px 40px rgba(255, 107, 107, 0.3)',
              }}
            >
              <span>Ver opciones</span>
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,125.67,82.39,321.39,56.44Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
