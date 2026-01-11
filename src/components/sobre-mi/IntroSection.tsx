'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { Hand, Quote, Star } from 'lucide-react';

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="intro"
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -right-40 top-1/4 h-[350px] w-[350px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative mx-auto w-full max-w-[420px] lg:mx-0"
          >
            {/* Decorative blob behind image */}
            <motion.div
              className="blob absolute -inset-6 opacity-50"
              style={{
                background:
                  'linear-gradient(135deg, rgba(224, 86, 160, 0.25) 0%, rgba(167, 139, 250, 0.2) 100%)',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-2xl">
              <Image
                src="/images/photos/dani-portrait-02.jpg"
                alt="Dani - Coach de Trabajo Remoto"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>

            {/* Decorative star */}
            <motion.div
              className="absolute right-2 top-8 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-pink shadow-lg md:-right-4"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Star className="h-7 w-7 fill-white text-white" />
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender/10 px-5 py-2"
            >
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Hand className="h-5 w-5 text-lavender" />
              </motion.div>
              <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-lavender">
                Sobre Mi
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-section-title mb-6 font-[var(--font-headline)] font-bold text-black-deep">
              Hola! Soy <span className="gradient-text-playful">Dani</span>
            </h2>

            {/* Story paragraphs */}
            <div className="space-y-5 text-gray-carbon">
              <p className="text-lg leading-relaxed">
                Y quiero compartir contigo como pase de{' '}
                <span className="font-semibold text-coral">
                  no tener experiencia, ni carrera universitaria, ni contactos,
                  ni un ingles perfecto
                </span>{' '}
                a construir una carrera remota con clientes internacionales y
                ganar en dolares.
              </p>

              <p className="text-lg leading-relaxed">
                Mi historia comenzo en 2017 cuando empece como interprete
                ganando apenas{' '}
                <span className="font-semibold text-pink">$3.25 por hora</span>.
                No tenia idea de que existia un mundo de posibilidades en el
                trabajo remoto.
              </p>

              <p className="text-lg leading-relaxed">
                Con el tiempo, descubri el mundo del asistente virtual en
                plataformas como Upwork y aprendi a crear perfiles estrategicos,
                postular con intencion e identificar oportunidades segun mis
                habilidades.
              </p>

              {/* Quote box */}
              <motion.div
                className="mt-8 rounded-2xl border-l-4 border-coral bg-gradient-to-r from-coral/5 to-transparent p-6"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Quote className="mb-3 h-8 w-8 text-coral/40" />
                <p className="font-[var(--font-headline)] text-lg font-semibold leading-relaxed text-gray-dark">
                  &ldquo;Aprender rapido, ser proactiva y mantener un mindset
                  fuerte fueron las claves que me permitieron crecer y ayudar a
                  otros a hacer lo mismo.&rdquo;
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
