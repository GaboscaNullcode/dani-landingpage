'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Gift, Users, Heart, Sparkles } from 'lucide-react';
import { getFreeResources } from '@/data/tienda-data';
import ProductCard from './ProductCard';

export default function RecursosGratuitos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const freeResources = getFreeResources();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: '5rem 0 6rem',
        background: 'linear-gradient(180deg, #fef7f0 0%, #fce7f3 50%, #fef7f0 100%)',
      }}
    >
      {/* Decorative Floating Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Mint blob - left */}
        <motion.div
          className="blob absolute -left-20 top-[30%] h-48 w-48 opacity-25 md:h-64 md:w-64"
          style={{
            background: 'linear-gradient(135deg, #6ee7b7 0%, #a78bfa 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Pink blob - right */}
        <motion.div
          className="blob absolute -right-16 bottom-[20%] h-40 w-40 opacity-20 md:h-56 md:w-56"
          style={{
            background: 'linear-gradient(135deg, #e056a0 0%, #ff6b6b 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating gift icon */}
        <motion.div
          className="absolute right-[15%] top-[15%] text-mint/30"
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Gift className="h-10 w-10 md:h-14 md:w-14" />
        </motion.div>

        {/* Floating users icon */}
        <motion.div
          className="absolute bottom-[30%] left-[10%] text-lavender/25"
          animate={{
            y: [8, -8, 8],
            rotate: [5, -5, 5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Users className="h-8 w-8 md:h-12 md:w-12" />
        </motion.div>

        {/* Heart icon */}
        <motion.div
          className="absolute right-[25%] top-[50%] text-coral/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" />
        </motion.div>

        {/* Small yellow circle */}
        <motion.div
          className="absolute left-[20%] top-[20%] h-8 w-8 rounded-full opacity-50 md:h-12 md:w-12"
          style={{ background: '#fcd34d' }}
          animate={{
            y: [10, -10, 10],
            x: [-5, 5, -5],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-mint/15 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-mint" />
            <span className="text-sm font-semibold uppercase tracking-wider text-mint">
              Nivel 0
            </span>
          </motion.div>

          <h2 className="mb-4 font-[var(--font-headline)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-black-deep">
            Recursos Gratuitos & Comunidad
          </h2>

          <p className="mx-auto max-w-2xl text-gray-carbon">
            Empieza sin compromiso. Estos recursos te ayudarán a entender si el mundo del
            trabajo remoto es para ti, y conectar con personas en tu mismo camino.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {freeResources.map((resource, index) => (
            <ProductCard
              key={resource.id}
              product={resource}
              variant="free"
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-16 max-w-2xl rounded-2xl bg-white p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:p-10"
        >
          <motion.div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-pink shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="h-8 w-8 text-white" fill="currentColor" />
          </motion.div>

          <h3 className="mb-3 font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
            ¿No sabes por dónde empezar?
          </h3>

          <p className="mb-6 text-gray-carbon">
            Agenda una llamada gratuita de 15 minutos y te ayudaré a encontrar el recurso
            perfecto para tu situación actual.
          </p>

          <a
            href="/asesoria"
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-8 py-4 font-[var(--font-inter)] font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,107,0.35)]"
          >
            <span>Agendar llamada gratuita</span>
            <Sparkles className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
