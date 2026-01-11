'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function SobreMiHeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] overflow-hidden bg-cream"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -right-32 -top-32 h-[500px] w-[500px] opacity-30"
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
          className="blob absolute -left-40 bottom-0 h-[400px] w-[400px] opacity-25"
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
        <motion.div
          className="blob absolute right-1/4 top-1/2 h-[300px] w-[300px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(224, 86, 160, 0.3) 0%, rgba(167, 139, 250, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-coral/10 px-5 py-2"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-5 w-5 text-coral" />
              </motion.div>
              <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-coral">
                +6 anos en el mundo virtual
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 font-[var(--font-headline)] font-black text-black-deep"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Dani <span className="gradient-text-playful">Zilbert</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 font-[var(--font-headline)] text-2xl font-bold text-pink md:text-3xl"
            >
              Tu Coach de Trabajo Remoto!
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto max-w-xl text-lg leading-relaxed text-gray-carbon lg:mx-0"
            >
              Te ayudo a encontrar trabajo remoto para que puedas organizar tus
              horarios con flexibilidad, viajar y tener{' '}
              <span className="font-semibold text-coral">libertad remota</span>.
            </motion.p>

            {/* Floating heart decoration */}
            <motion.div
              className="mt-8 inline-flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-6 w-6 fill-pink text-pink" />
              </motion.div>
              <span className="text-sm font-medium text-gray-medium">
                Creando comunidad desde 2017
              </span>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 1,
              type: 'spring',
              stiffness: 80,
            }}
            className="relative order-1 mx-auto max-w-[500px] lg:order-2 lg:mx-0"
          >
            {/* Decorative blob behind image */}
            <motion.div
              className="blob absolute -inset-8 opacity-40"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.25) 50%, rgba(167, 139, 250, 0.3) 100%)',
              }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[40px] shadow-2xl">
              <Image
                src="/images/photos/dani-blazer-hero.png"
                alt="Dani Zilbert - Coach de Trabajo Remoto"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>

            {/* Floating stats card */}
            <motion.div
              className="absolute -left-6 bottom-16 z-20 rounded-2xl bg-white p-5 shadow-xl"
              animate={{
                y: [-8, 8, -8],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-center">
                <div className="font-[var(--font-headline)] text-4xl font-black text-coral">
                  +6
                </div>
                <div className="text-sm font-medium text-gray-medium">
                  Anos de experiencia
                </div>
              </div>
            </motion.div>

            {/* Floating badge top right */}
            <motion.div
              className="absolute -right-4 top-12 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender to-mint shadow-lg"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
