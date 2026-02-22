'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Target,
  User,
  FileText,
  MessageCircle,
  DollarSign,
  CheckCircle,
  Sparkles,
  ScrollText,
  Clock,
  CalendarClock,
  UserX,
  Ban,
  BookOpen,
  Wifi,
  UserCheck,
  ShieldAlert,
  Lock,
  ClipboardCheck,
  BadgeCheck,
} from 'lucide-react';
import {
  contenidoAsesoria,
  terminosCondiciones,
} from '@/data/asesorias-data';

const iconMap: Record<string, React.ElementType> = {
  target: Target,
  user: User,
  'file-text': FileText,
  'message-circle': MessageCircle,
  'dollar-sign': DollarSign,
  'check-circle': CheckCircle,
};

const terminoIconMap: Record<string, React.ElementType> = {
  clock: Clock,
  'calendar-clock': CalendarClock,
  'user-x': UserX,
  ban: Ban,
  'book-open': BookOpen,
  wifi: Wifi,
  'user-check': UserCheck,
  'shield-alert': ShieldAlert,
  lock: Lock,
  'clipboard-check': ClipboardCheck,
  'badge-check': BadgeCheck,
};

const duplicatedTerminos = [...terminosCondiciones, ...terminosCondiciones];

export default function ContenidoSection() {
  const termsRef = useRef(null);
  const isTermsInView = useInView(termsRef, { once: true, margin: '-100px' });

  return (
    <>
      {/* Contenido Section */}
      <section className="relative overflow-hidden py-24" style={{ background: 'var(--cream)' }}>
        {/* Decorative blob */}
        <motion.div
          className="blob absolute -right-40 top-20 h-[400px] w-[400px] opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-coral shadow-sm">
              <Sparkles className="h-4 w-4" />
              Lo que trabajaremos
            </span>
            <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
              Qué podemos trabajar según tu plan
            </h2>
            <p className="text-lg text-gray-carbon">
              Cada acompañamiento se adapta a tu momento.{' '}
              <strong className="font-semibold text-gray-dark">
                Dependiendo del plan que elijas
              </strong>
              , trabajaremos algunas o todas estas áreas:
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contenidoAsesoria.map((item, index) => {
              const IconComponent = iconMap[item.icon] || CheckCircle;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'var(--gradient-coral-pink)',
                    }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-gray-dark">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-carbon">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Términos y Condiciones Carousel */}
      <section ref={termsRef} className="overflow-hidden bg-white py-20">
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTermsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="container-custom mb-10 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isTermsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender/10 px-5 py-2"
            >
              <ScrollText className="h-5 w-5 text-lavender" />
              <span className="font-[var(--font-inter)] text-sm font-semibold text-lavender">
                Antes de agendar
              </span>
            </motion.div>

            <h2 className="text-section-title font-[var(--font-headline)] font-bold text-gray-dark">
              Términos y condiciones
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
              Para que tu experiencia sea clara desde el inicio
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            {/* Gradient fade left */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent md:w-48" />
            {/* Gradient fade right */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent md:w-48" />

            <div className="overflow-hidden py-4">
              <div
                className="flex gap-6 animate-carousel"
                style={{ width: 'max-content' }}
              >
                {duplicatedTerminos.map((termino, index) => {
                  const TermIcon =
                    terminoIconMap[termino.icon] || CheckCircle;
                  return (
                    <div
                      key={`${termino.title}-${index}`}
                      className="w-[280px] flex-shrink-0 rounded-2xl border border-gray-light bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] md:w-[340px]"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lavender/10">
                        <TermIcon className="h-5 w-5 text-lavender" />
                      </div>
                      <h3 className="mb-2 font-[var(--font-headline)] text-base font-bold text-gray-dark">
                        {termino.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-carbon">
                        {termino.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background: 'var(--gradient-coral-pink)',
        }}
      >
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-white md:text-4xl">
              ¿Lista para dar el siguiente paso?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
              Agenda tu asesoría hoy y comienza a construir la carrera remota que mereces.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#planes"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[var(--font-headline)] font-bold text-coral shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Ver Opciones Disponibles
              </a>
              <a
                href="/#testimonios"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 font-[var(--font-headline)] font-bold text-white transition-all hover:-translate-y-1 hover:bg-white/10"
              >
                Leer Experiencias Reales
              </a>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
      </section>
    </>
  );
}
