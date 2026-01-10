'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const missionPoints = [
  'Sin necesidad de titulo universitario para empezar tu carrera remota',
  'Sin contactos previos en la industria digital o tecnologica',
  'Solo con determinacion y las herramientas correctas',
];

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="mission"
      ref={ref}
      className="bg-white"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      <div className="container-custom mx-auto max-w-[1000px] text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-section-title font-[var(--font-headline)] font-black text-black-deep">
            Trabajo remoto para <span className="text-pink">todos</span>
          </h2>
        </motion.div>

        {/* Mission Points */}
        <div className="flex flex-col gap-6">
          {missionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="mission-bullet group flex cursor-pointer items-center gap-6 rounded-[20px] bg-cream px-12 py-8 text-left transition-all duration-300 hover:bg-teal-dark hover:text-white"
            >
              <p
                className="font-[var(--font-headline)] font-semibold transition-colors"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
              >
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
