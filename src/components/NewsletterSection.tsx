'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Send } from 'lucide-react';
import NewsletterFormCard from './NewsletterFormCard';

interface NewsletterSectionProps {
  source?: 'home' | 'newsletter_page' | 'blog' | 'quiz';
}

export default function NewsletterSection({ source = 'home' }: NewsletterSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isSectionVisible = useInView(ref, { margin: '100px' });

  return (
    <section
      id="newsletter"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-padding) 0',
        background:
          'linear-gradient(180deg, #fef7f0 0%, #fce4ec 50%, #f8e1f4 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="blob absolute -left-32 -top-20 h-[450px] w-[450px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
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
          className="blob absolute -bottom-20 -right-20 h-[380px] w-[380px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
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

        {/* Floating icon decorations */}
        <motion.div
          className="absolute left-[8%] top-[18%] flex h-11 w-11 items-center justify-center rounded-full bg-coral/20 opacity-50"
          animate={isSectionVisible ? { y: [-10, 10, -10], rotate: [-5, 5, -5] } : false}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Mail className="h-5 w-5 text-coral" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[12%] flex h-10 w-10 items-center justify-center rounded-full bg-lavender/30 opacity-40"
          animate={isSectionVisible ? { y: [8, -8, 8], rotate: [5, -5, 5] } : false}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Send className="h-5 w-5 text-lavender" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 shadow-md backdrop-blur-sm"
          >
            <Mail className="h-5 w-5 text-pink" />
            <span className="font-[var(--font-inter)] text-sm font-semibold text-gray-dark">
              Newsletter semanal
            </span>
          </motion.div>

          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
            Empieza tu camino al trabajo remoto con contenido exclusivo cada semana...
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-5 max-w-2xl"
          >
            <p className="text-lg leading-relaxed text-gray-carbon md:text-xl">
              Regístrate y recibe{' '}
              <span className="font-bold text-coral underline decoration-coral/40 decoration-2 underline-offset-2">
                GRATIS
              </span>{' '}
              la guía &ldquo;Fórmula para un Título Optimizado&rdquo;.
              Ideal para destacar en plataformas freelance y mejorar tu CV.
            </p>
          </motion.div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl"
        >
          <NewsletterFormCard source={source} />
        </motion.div>
      </div>
    </section>
  );
}
