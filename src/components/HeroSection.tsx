'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Hand, Laptop, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import RotatingText from './RotatingText';

const rotatingWords = ['libertad', 'claridad', 'propósito', 'independencia'];

// Unsplash avatar URLs for social proof
// Floating decorative shapes
const FloatingShapes = ({ isInView }: { isInView: boolean }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {/* Large coral blob - top right */}
    <motion.div
      className="blob absolute -right-20 -top-20 h-[500px] w-[500px] opacity-30"
      style={{
        background:
          'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
      }}
      animate={isInView ? {
        scale: [1, 1.1, 1],
        rotate: [0, 10, 0],
      } : { scale: 1, rotate: 0 }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    {/* Medium lavender blob - bottom left */}
    <motion.div
      className="blob absolute -bottom-32 -left-32 h-[400px] w-[400px] opacity-25"
      style={{
        background:
          'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
      }}
      animate={isInView ? {
        scale: [1, 1.15, 1],
        rotate: [0, -15, 0],
      } : { scale: 1, rotate: 0 }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2,
      }}
    />

    {/* Small floating circle - top left */}
    <motion.div
      className="absolute left-[10%] top-[15%] h-16 w-16 rounded-full bg-sunshine opacity-60"
      animate={isInView ? {
        y: [-10, 20, -10],
        x: [-5, 10, -5],
        rotate: [0, 180, 360],
      } : { y: 0, x: 0, rotate: 0 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    {/* Small floating circle - right side */}
    <motion.div
      className="absolute right-[15%] top-[30%] h-10 w-10 rounded-full bg-mint opacity-50"
      animate={isInView ? {
        y: [0, -25, 0],
        x: [0, 15, 0],
      } : { y: 0, x: 0 }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1,
      }}
    />

    {/* Decorative dots pattern */}
    <motion.div
      className="absolute bottom-[20%] right-[25%] h-20 w-20 opacity-30"
      style={{
        backgroundImage: 'radial-gradient(#ff6b6b 2px, transparent 2px)',
        backgroundSize: '12px 12px',
      }}
      animate={isInView ? {
        rotate: [0, 90, 0],
        scale: [1, 1.1, 1],
      } : { rotate: 0, scale: 1 }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    {/* Small pink blob */}
    <motion.div
      className="blob absolute bottom-[30%] left-[5%] h-24 w-24 opacity-40"
      style={{
        background: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
      }}
      animate={isInView ? {
        y: [-15, 15, -15],
        scale: [1, 1.2, 1],
      } : { y: 0, scale: 1 }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 3,
      }}
    />
  </div>
);

export default function HeroSection() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { margin: '200px' });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="noise-overlay relative flex min-h-screen items-center justify-center overflow-hidden py-32"
      style={{
        background:
          'linear-gradient(135deg, #fef7f0 0%, #ffecd2 40%, #fce7f3 100%)',
      }}
    >
      <FloatingShapes isInView={isHeroInView} />

      <div className="container-custom relative z-10 grid max-w-[1300px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content Column */}
        <div className="text-center lg:text-left">
          {/* Playful badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 200,
            }}
            className="mb-6 inline-flex items-center rounded-full bg-white/80 px-5 py-2.5 shadow-md backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Hand className="h-5 w-5 text-coral" />
              </motion.div>
              <span className="font-[var(--font-inter)] text-sm font-semibold text-gray-dark">
                Tu guía hacia el trabajo remoto
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="text-hero-title mb-8 font-[var(--font-headline)] font-bold text-black-deep"
          >
            Deja el miedo atrás y construye tu{' '}
            <span className="relative inline-block text-pink md:inline">
              <RotatingText
                texts={rotatingWords}
                mainClassName="inline-flex"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                elementLevelClassName="inline-block"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="url(#gradient-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <defs>
                  <linearGradient
                    id="gradient-underline"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ff6b6b" />
                    <stop offset="50%" stopColor="#e056a0" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 max-w-xl font-[var(--font-headline)] text-lg font-semibold text-gray-dark lg:mx-0"
          >
            Acompañamiento real para empezar, crecer y trabajar remoto con
            claridad.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body-large mb-10 max-w-xl text-gray-carbon lg:mx-0"
          >
            Sé que dar el primer paso da miedo. Por eso te acompaño de la mano
            para que construyas tu carrera remota con{' '}
            <span className="font-semibold text-pink">claridad</span>,{' '}
            <span className="font-semibold text-coral">confianza</span> y{' '}
            <span className="font-semibold text-lavender">un plan real</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            {/* Primary CTA */}
            <Link
              href="/asesorias"
              className="btn-shimmer group relative inline-flex items-center gap-3 rounded-full px-8 py-4 font-[var(--font-headline)] text-base font-bold text-white shadow-[0_10px_40px_rgba(255,107,107,0.3)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(224,86,160,0.4)]"
              style={{
                background: 'var(--gradient-coral-pink)',
              }}
            >
              <span>Agenda tu acompañamiento</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/empezar"
              className="group relative inline-flex items-center gap-2 rounded-full border-2 border-black-deep bg-white px-8 py-4 font-[var(--font-headline)] text-base font-bold text-black-deep transition-[transform,border-color,background-color,color,box-shadow] duration-500 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-white hover:shadow-[0_15px_40px_rgba(255,107,107,0.3)]"
            >
              <span>Descubre tu ruta</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>

        {/* Image Column */}
        <motion.div
          initial={{ scale: 0.95, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: 'spring',
            stiffness: 120,
          }}
          className="relative hidden lg:block"
        >
          <div className="relative mx-auto max-w-[520px]">
            {/* Decorative background shape */}
            <motion.div
              className="blob absolute -bottom-8 -left-8 -right-8 -top-8 opacity-60"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 50%, rgba(167, 139, 250, 0.3) 100%)',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main image */}
            <div className="relative overflow-hidden rounded-[30px] shadow-2xl">
              <Image
                src="/images/photos/dani-blazer-hero.png"
                alt="Dani - Coach de Trabajo Remoto"
                width={520}
                height={650}
                className="relative z-10 w-full object-cover"
                priority
                fetchPriority="high"
              />
            </div>

            {/* Floating card - top right */}
            <motion.div
              className="absolute -right-6 top-8 z-20 rounded-2xl bg-white p-4 shadow-xl"
              animate={{
                y: [-5, 5, -5],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-pink">
                  <Laptop className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-medium">Intención clara, acción real</div>
                  <div className="font-[var(--font-headline)] font-bold text-black-deep">
                    Vive en modo remoto
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card - bottom left */}
            <motion.div
              className="absolute -left-6 bottom-20 z-20 rounded-2xl bg-white p-4 shadow-xl"
              animate={{
                y: [5, -5, 5],
                rotate: [2, -2, 2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-lavender to-mint">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-medium">+6 años de</div>
                  <div className="font-[var(--font-headline)] font-bold text-black-deep">
                    Experiencia
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-wider text-gray-medium">
            SCROLL
          </span>
          <div className="flex h-10 w-6 items-center justify-center rounded-full border-2 border-gray-medium/40">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-4 w-4 text-coral" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
