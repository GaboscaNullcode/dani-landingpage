'use client';

import { motion } from 'motion/react';

interface StageHeroProps {
  title: string;
  subtitle: string;
}

export default function StageHero({ title, subtitle }: StageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-teal-dark"
      style={{
        paddingTop: 'var(--hero-padding-top)',
        paddingBottom: 'var(--section-padding)',
      }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="blob absolute -left-32 -top-32 h-[400px] w-[400px] opacity-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.5) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
        />
        <div
          className="blob absolute -bottom-32 -right-32 h-[350px] w-[350px] opacity-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.5) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-hero-title mx-auto max-w-4xl font-[var(--font-headline)] font-bold text-white"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-large mx-auto mt-6 max-w-2xl text-white/70"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
