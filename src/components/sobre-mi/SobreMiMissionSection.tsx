'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { Target, Lightbulb, Rocket, Heart } from 'lucide-react';

const missionPoints = [
  {
    icon: Lightbulb,
    title: 'Descubrir',
    text: 'Que descubras que el trabajo remoto es posible para ti, sin importar tu punto de partida',
  },
  {
    icon: Target,
    title: 'Creer',
    text: 'No necesitas titulo universitario ni contactos influyentes para empezar. Solo necesitas la decision de dar el primer paso',
  },
  {
    icon: Rocket,
    title: 'Construir',
    text: 'Mostrarte como, con las habilidades que ya tienes, puedes construir una carrera online y crear la vida que mereces',
  },
];

export default function SobreMiMissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="mission"
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -left-32 top-1/3 h-[400px] w-[400px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(224, 86, 160, 0.3) 0%, rgba(167, 139, 250, 0.2) 100%)',
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
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink/10 px-5 py-2"
            >
              <Heart className="h-5 w-5 fill-pink text-pink" />
              <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-pink">
                Mi Compromiso Contigo
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-section-title mb-6 font-[var(--font-headline)] font-black text-black-deep">
              Trabajo remoto para{' '}
              <span className="gradient-text-playful">todos</span>
            </h2>

            {/* Subtitle */}
            <p className="mb-10 text-lg leading-relaxed text-gray-carbon">
              Mi mision es ayudarte a construir la carrera remota que mereces.
              Estas son las tres cosas que quiero lograr contigo:
            </p>

            {/* Mission Points */}
            <div className="flex flex-col gap-5">
              {missionPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                    className="group flex items-start gap-5 rounded-[20px] bg-cream p-6 text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-coral/5 hover:to-pink/5"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-pink transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-[var(--font-headline)] text-lg font-bold text-black-deep">
                        {point.title}
                      </h3>
                      <p className="text-base leading-relaxed text-gray-carbon">
                        {point.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative mx-auto w-full max-w-[450px] lg:mx-0"
          >
            {/* Decorative blob behind image */}
            <motion.div
              className="blob absolute -inset-8 opacity-40"
              style={{
                background:
                  'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.25) 50%, rgba(224, 86, 160, 0.3) 100%)',
              }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-2xl">
              <Image
                src="/images/photos/dani-portrait-03.jpg"
                alt="Dani - Coach de Trabajo Remoto"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>

            {/* Floating quote card */}
            <motion.div
              className="absolute -bottom-6 left-2 z-20 max-w-[280px] rounded-2xl bg-white p-5 shadow-xl md:-left-6"
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <p className="font-[var(--font-headline)] text-sm font-semibold leading-relaxed text-gray-dark">
                &ldquo;Solo con determinacion y las herramientas correctas
                puedes lograrlo&rdquo;
              </p>
              <div className="mt-2 text-xs font-medium text-coral">— Dani</div>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              className="absolute right-2 top-16 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-lavender shadow-lg md:-right-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Target className="h-7 w-7 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
