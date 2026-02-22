'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Hand, Award, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isSectionVisible = useInView(ref, { margin: '100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="blob absolute -left-40 top-1/4 h-[400px] w-[400px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
          animate={isSectionVisible ? {
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          } : false}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="blob absolute -right-32 bottom-0 h-[300px] w-[300px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
          }}
          animate={isSectionVisible ? {
            scale: [1, 1.15, 1],
          } : false}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image Column - Now first on large screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative mx-auto max-w-[420px] overflow-visible lg:mx-0"
          >
            {/* Decorative blob behind image */}
            <motion.div
              className="blob absolute -inset-6 opacity-50"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 107, 107, 0.25) 0%, rgba(224, 86, 160, 0.2) 50%, rgba(167, 139, 250, 0.25) 100%)',
              }}
              animate={isSectionVisible ? {
                scale: [1, 1.05, 1],
              } : false}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-2xl">
              <Image
                src="/images/photos/dani-portrait-01.jpg"
                alt="Dani - Coach de Trabajo Remoto"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>

            {/* Floating stat card - hidden on mobile */}
            <motion.div
              className="absolute -right-4 bottom-8 z-20 hidden rounded-2xl bg-white p-5 shadow-xl sm:block"
              animate={isSectionVisible ? {
                y: [-5, 5, -5],
                rotate: [-2, 2, -2],
              } : false}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-center">
                <div className="font-[var(--font-headline)] text-3xl font-bold text-coral">
                  +6
                </div>
                <div className="text-sm text-gray-medium">
                  Años de experiencia
                </div>
              </div>
            </motion.div>

            {/* Small decorative element - hidden on mobile */}
            <motion.div
              className="absolute -left-4 top-12 z-20 hidden h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender to-mint shadow-lg sm:flex"
              animate={isSectionVisible ? {
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              } : false}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Award className="h-7 w-7 text-white" />
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Playful badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender/10 px-5 py-2"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Hand className="h-5 w-5 text-lavender" />
              </motion.div>
              <span className="font-[var(--font-inter)] text-sm font-semibold text-lavender">
                También tuve miedo al principio
              </span>
            </motion.div>

            {/* Name */}
            <h2 className="text-section-title mb-6 font-[var(--font-headline)] font-bold text-black-deep">
              Soy <span className="gradient-text-playful">Dani</span>
            </h2>

            {/* Description */}
            <div className="space-y-5 text-gray-carbon">
              <p className="text-lg leading-relaxed">
                Hace 6 años estaba exactamente donde tú estás ahora: queriendo
                cambiar mi vida, pero sin saber si realmente podía lograrlo.
              </p>
              <p className="text-lg leading-relaxed">
                Empecé ganando{' '}
                <span className="font-semibold text-coral">$3.25 la hora</span>,
                sin carrera universitaria. Aprendí oficios que me llenaron de
                habilidades y me permitieron crecer en el mundo remoto.
              </p>
              <p className="text-lg leading-relaxed">
                Comencé como intérprete, y con el tiempo trabajé como asistente
                virtual, community manager, brand manager, soporte
                administrativo, project manager, operaciones, y más.
              </p>
              <p className="text-lg leading-relaxed">
                Hoy trabajo con clientes de todo el mundo y acompaño a otras
                personas a construir su propio camino remoto.
              </p>
              <p className="text-lg leading-relaxed">
                No necesitas un título especial ni contactos en la industria.
                Solo necesitas{' '}
                <span className="font-semibold text-pink">
                  la guía correcta
                </span>{' '}
                y a alguien que ya haya recorrido el camino.
              </p>

              {/* Highlight box */}
              <motion.div
                className="mt-6 rounded-2xl border-l-4 border-coral bg-gradient-to-r from-coral/5 to-transparent p-5"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="font-[var(--font-headline)] text-lg font-semibold text-gray-dark">
                  &ldquo;El miedo no desaparece, pero cuando tienes claridad sobre
                  qué hacer, se vuelve más pequeño que tus ganas.&rdquo;
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/sobre-mi"
                className="btn-shimmer group inline-flex items-center gap-3 rounded-full px-8 py-4 font-[var(--font-headline)] text-base font-bold text-white shadow-[0_10px_40px_rgba(167,139,250,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(167,139,250,0.4)]"
                style={{
                  background:
                    'linear-gradient(135deg, #a78bfa 0%, #e056a0 100%)',
                }}
              >
                <span>Mi historia completa</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
