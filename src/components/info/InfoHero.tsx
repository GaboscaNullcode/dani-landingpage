'use client';

import { motion } from 'motion/react';
import { Info, Heart, HelpCircle } from 'lucide-react';

export default function InfoHero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20"
      style={{
        background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
      }}
    >
      {/* Decorative blobs */}
      <motion.div
        className="blob absolute -left-40 -top-40 h-[500px] w-[500px] opacity-25"
        style={{
          background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="blob absolute -right-32 bottom-0 h-[350px] w-[350px] opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: 'var(--gradient-coral-pink)',
            }}
          >
            <Info className="h-8 w-8 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-hero-title mb-6 font-[var(--font-headline)] font-bold text-gray-dark"
          >
            Centro de <span className="gradient-text">Información</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-body-large mx-auto mb-10 max-w-2xl text-gray-carbon"
          >
            Aquí encontrarás respuestas a las preguntas más frecuentes, formas de contactarme
            y todo lo que necesitas saber sobre Remote con Dani.
          </motion.p>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#faq"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-gray-dark shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <HelpCircle className="h-5 w-5 text-coral" />
              Preguntas Frecuentes
            </a>
            <a
              href="#contacto"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-gray-dark shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Heart className="h-5 w-5 text-pink" />
              Contacto
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
