'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const timelineData = [
  {
    year: '2017',
    role: 'Interprete',
    detail: 'Comenzando a $3.25/hora',
  },
  {
    year: '2019',
    role: 'Freelancer',
    detail: 'Expandiendo habilidades',
  },
  {
    year: '2021',
    role: 'Asistente Virtual',
    detail: 'Crecimiento profesional',
  },
  {
    year: 'HOY',
    role: 'Coach',
    detail: 'Ayudando a otros',
  },
];

const platforms = ['Upwork', 'LinkedIn', 'Indeed', 'Workana', 'Fiverr'];

function ArrowSVG() {
  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-coral"
    >
      <path
        d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HistorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="history"
      ref={ref}
      className="bg-teal-dark text-white"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-black">
            De <span className="text-coral">$3.25/hora</span> a Coach
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Mi camino en el mundo digital a traves de multiples plataformas
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-8">
          {timelineData.map((item, index) => (
            <div key={item.year} className="flex items-center gap-8">
              {/* Timeline Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group w-full min-w-[200px] max-w-[300px] rounded-[20px] border-2 border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-coral hover:bg-white/10"
              >
                {/* Year */}
                <span
                  className="mb-2 block font-[var(--font-headline)] font-black text-coral"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
                >
                  {item.year}
                </span>
                {/* Role */}
                <h3 className="mb-1 font-[var(--font-headline)] text-xl font-bold text-white">
                  {item.role}
                </h3>
                {/* Detail */}
                <p className="text-sm text-white/60">{item.detail}</p>
              </motion.div>

              {/* Arrow (hidden on last item and mobile) */}
              {index < timelineData.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                  className="timeline-arrow"
                >
                  <ArrowSVG />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Plataformas donde he trabajado
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {platforms.map((platform, index) => (
              <motion.span
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 font-[var(--font-headline)] text-sm font-semibold text-white/80 transition-all hover:border-coral hover:bg-coral/20 hover:text-white"
              >
                {platform}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
