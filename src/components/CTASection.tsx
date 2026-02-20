'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  BookOpen,
  MessageCircle,
  Lightbulb,
  Rocket,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Heart,
} from 'lucide-react';

const ctaButtons = [
  {
    text: 'Define tu Ruta Remota',
    icon: Rocket,
    href: '/empezar',
    gradient: 'var(--gradient-coral-pink)',
    shadow: 'rgba(255, 107, 107, 0.3)',
  },
  {
    text: 'Empieza con la Guía Completa',
    icon: BookOpen,
    href: '/tienda/curso-paso-a-paso',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
    shadow: 'rgba(167, 139, 250, 0.3)',
  },
  {
    text: 'Agenda tu Acompañamiento 1:1',
    icon: MessageCircle,
    href: '/asesorias',
    gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
    shadow: 'rgba(224, 86, 160, 0.3)',
  },
];

const trustBadges = [
  { icon: CheckCircle, text: 'Enfoque práctico y realista' },
  { icon: Heart, text: 'Únete a nuestra comunidad remota' },
];

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
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
        <motion.div
          className="blob absolute bottom-0 right-1/4 h-[350px] w-[350px] translate-x-1/2 opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating decorations */}
        <motion.div
          className="absolute left-[10%] top-[30%] flex h-12 w-12 items-center justify-center rounded-full bg-coral/20 opacity-30"
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Rocket className="h-6 w-6 text-coral" />
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] right-[10%] flex h-10 w-10 items-center justify-center rounded-full bg-lavender/20 opacity-30"
          animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Sparkles className="h-5 w-5 text-lavender" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10 mx-auto max-w-[900px] text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-coral/10 px-5 py-2"
        >
          <Lightbulb className="h-5 w-5 text-coral" />
          <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-coral">
            El miedo no va a desaparecer solo
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 font-[var(--font-headline)] text-3xl font-bold text-black-deep md:text-4xl lg:text-5xl"
        >
          ¿Estas list@ para vivir en{' '}
          <span className="gradient-text-playful">modo remoto</span>?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-12 max-w-2xl text-lg text-gray-carbon"
        >
          Una sesión conmigo puede ahorrarte meses de prueba y error.{' '}
          <span className="font-semibold text-pink">Veamos tu caso y definamos tu ruta.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-4 md:flex-row"
        >
          {ctaButtons.map((button, index) => {
            const IconComponent = button.icon;
            return (
              <motion.div
                key={button.text}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={button.href}
                  className="btn-shimmer group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-[var(--font-headline)] text-sm font-bold text-white transition-all duration-500 hover:-translate-y-1 md:w-auto"
                  style={{
                    background: button.gradient,
                    boxShadow: `0 15px 40px ${button.shadow}`,
                  }}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{button.text}</span>
                  <motion.span
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-carbon"
              >
                <IconComponent className="h-5 w-5 text-coral" />
                <span>{badge.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
