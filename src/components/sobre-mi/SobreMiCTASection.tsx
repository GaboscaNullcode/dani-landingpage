'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Rocket, Heart, ArrowRight, Sparkles } from 'lucide-react';

export default function SobreMiCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-[#2d3f42] to-teal-dark"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -left-32 -top-32 h-[400px] w-[400px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="blob absolute -bottom-32 -right-32 h-[500px] w-[500px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating decorations */}
        <motion.div
          className="absolute left-[15%] top-[20%] flex h-12 w-12 items-center justify-center rounded-full bg-coral/20"
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Sparkles className="h-6 w-6 text-coral" />
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] right-[15%] flex h-10 w-10 items-center justify-center rounded-full bg-mint/20"
          animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Heart className="h-5 w-5 fill-mint text-mint" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10 mx-auto max-w-[900px] text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2"
        >
          <Rocket className="h-5 w-5 text-coral" />
          <span className="text-sm font-semibold text-white/90">
            Tu momento es ahora
          </span>
        </motion.div>

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 text-xl leading-relaxed text-white/90 md:text-2xl"
        >
          Estoy aqui para{' '}
          <span className="font-semibold text-coral">guiarte</span>,{' '}
          <span className="font-semibold text-pink">inspirarte</span> y darte
          las herramientas que a mi me hubiera encantado tener al comenzar.
        </motion.p>

        {/* Gratitude */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 text-lg text-white/70"
        >
          Gracias por estar aqui y apostar por tu libertad remota.
        </motion.p>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mb-12 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          <p className="font-[var(--font-headline)] text-xl font-semibold leading-relaxed text-white md:text-2xl">
            &ldquo;Espero que mi historia te inspire a dar ese salto y que
            pronto tu tambien digas:{' '}
            <span className="text-coral">
              Fue la mejor decision que tome
            </span>
            .&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 fill-pink text-pink" />
            <span className="font-medium text-white/80">— Dani</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/empezar"
            className="btn-shimmer group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-[var(--font-headline)] font-bold text-white transition-all duration-500 hover:-translate-y-1 sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
              boxShadow: '0 15px 40px rgba(255, 107, 107, 0.3)',
            }}
          >
            <Rocket className="h-5 w-5" />
            <span>Empieza tu camino</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </Link>

          <Link
            href="/tienda"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 font-[var(--font-headline)] font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            <span>Ver productos</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
