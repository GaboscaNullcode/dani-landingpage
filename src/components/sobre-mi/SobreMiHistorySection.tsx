'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from 'motion/react';
import {
  TrendingUp,
  Headphones,
  Phone,
  Lightbulb,
  MapPin,
  Briefcase,
  Heart,
  Globe,
  Sparkles,
  Quote,
} from 'lucide-react';

const timelineData = [
  {
    year: '2017',
    role: 'Intérprete presencial',
    salary: '$3.25 USD/hora',
    detail: 'Primer contacto con clientes internacionales.',
    icon: Headphones,
    gradient: 'from-coral to-pink',
    colorHex: '#ff6b6b',
  },
  {
    year: '2019',
    role: 'Primeros pasos en el mundo remoto',
    salary: 'Interpretación telefónica',
    detail: 'Ingreso sube a $12 USD por hora.',
    icon: Phone,
    gradient: 'from-pink to-lavender',
    colorHex: '#e056a0',
  },
  {
    year: '2020',
    role: 'Descubrimiento + miedo',
    salary: 'Momento clave',
    detail:
      'Descubro que personas de habla hispana trabajan remoto como asistentes virtuales. Pensaba: "¿Quién me va a contratar sin experiencia?"',
    icon: Lightbulb,
    gradient: 'from-lavender to-mint',
    colorHex: '#a78bfa',
  },
  {
    year: '2021',
    role: 'Salto al mundo remoto + vida nómada digital',
    salary: 'Asistente Virtual',
    detail:
      'Empiezo como Asistente Virtual y decido comenzar a vivir como nómada digital, trabajando desde distintos lugares.',
    icon: MapPin,
    gradient: 'from-mint to-lavender',
    colorHex: '#6ee7b7',
  },
  {
    year: '2021 – 2024',
    role: 'Crecimiento profesional',
    salary: 'Múltiples roles',
    detail:
      'Asistente Ejecutiva · Reclutamiento & Training · Social Media Manager · Real Estate Account Manager · Intake & Acquisitions · Creación de Contenido & Brand Manager · Administradora de Operaciones · Manager de Operaciones',
    icon: Briefcase,
    gradient: 'from-coral to-pink',
    colorHex: '#ff6b6b',
  },
  {
    year: 'Dic 2024',
    role: 'Nace Remote con Dani!',
    salary: 'Nuevo inicio',
    detail:
      'Un espacio para acompañar a otras personas a construir su carrera remota con claridad y estrategia.',
    icon: Heart,
    gradient: 'from-pink to-lavender',
    colorHex: '#e056a0',
  },
  {
    year: '2025',
    role: 'Manager de Operaciones & Social Media Manager',
    salary: 'Clientes Globales',
    detail:
      'Trabajo con clientes internacionales mientras acompaño a nuevas personas en su camino remoto. Integro mi experiencia en reprogramación mental y regulación del sistema nervioso para acompañar procesos de crecimiento con claridad, enfoque y conciencia.',
    icon: Globe,
    gradient: 'from-lavender to-mint',
    colorHex: '#a78bfa',
  },
  {
    year: 'HOY',
    role: 'Coach',
    salary: 'Tu Turno',
    detail:
      'Ayudando a otros a lograr su libertad remota y construir la carrera que merecen',
    icon: Sparkles,
    gradient: 'from-coral to-pink',
    colorHex: '#ff6b6b',
    isHighlight: true,
  },
];

const platforms = [
  'Upwork',
  'Workana',
  'Fiverr',
  'LinkedIn',
];

const skills = [
  'Reclutamiento',
  'Gmail & Agenda',
  'Social Media Mgmt',
  'Gestión de Proyectos',
  'Google Workspace',
  'Canva PRO',
  'ClickUp & Asana',
  'Brand Management',
  'Edición de Video',
  'Real Estate',
  'Operaciones',
];

// Timeline item component - animates based on scroll progress
function TimelineItem({
  item,
  index,
  isEven,
  scrollProgress,
  totalItems,
  isTimelineInView,
}: {
  item: (typeof timelineData)[0];
  index: number;
  isEven: boolean;
  scrollProgress: MotionValue<number>;
  totalItems: number;
  isTimelineInView: boolean;
}) {
  const Icon = item.icon;
  const isFirst = index === 0;

  // Calculate when this item should appear based on scroll progress
  // Items appear at evenly distributed points along the scroll
  const linePosition = index / (totalItems - 1); // 0, 0.25, 0.5, 0.75, 1

  // Items appear BEFORE the line reaches them (offset by 0.15)
  const appearAt = Math.max(0, linePosition - 0.15);

  // For the first item: appears when timeline comes into view
  // For other items: appears before the line reaches them
  const cardOpacity = useTransform(
    scrollProgress,
    isFirst
      ? [0, 0.05]
      : [appearAt, appearAt + 0.08],
    [0, 1]
  );

  const cardX = useTransform(
    scrollProgress,
    isFirst
      ? [0, 0.1]
      : [appearAt, appearAt + 0.1],
    [isEven ? -40 : 40, 0]
  );

  const cardScale = useTransform(
    scrollProgress,
    isFirst
      ? [0, 0.08]
      : [appearAt, appearAt + 0.08],
    [0.9, 1]
  );

  // Node animations - appear with the card
  const nodeOpacity = useTransform(
    scrollProgress,
    isFirst
      ? [0, 0.03]
      : [appearAt, appearAt + 0.05],
    [0, 1]
  );

  const nodeScale = useTransform(
    scrollProgress,
    isFirst
      ? [0, 0.06]
      : [appearAt, appearAt + 0.08],
    [0, 1]
  );

  // Glow animation - expands after node appears
  const glowOpacity = useTransform(
    scrollProgress,
    isFirst
      ? [0.02, 0.1]
      : [appearAt + 0.02, appearAt + 0.1],
    [0, 0.5]
  );

  const glowScale = useTransform(
    scrollProgress,
    isFirst
      ? [0.02, 0.12]
      : [appearAt + 0.02, appearAt + 0.12],
    [0.5, 1.2]
  );

  // Icon animation - appears after node fills
  const iconOpacity = useTransform(
    scrollProgress,
    isFirst
      ? [0.04, 0.1]
      : [appearAt + 0.03, appearAt + 0.1],
    [0, 1]
  );

  const iconScale = useTransform(
    scrollProgress,
    isFirst
      ? [0.04, 0.1]
      : [appearAt + 0.03, appearAt + 0.1],
    [0, 1]
  );

  // Don't render anything until timeline is in view
  if (!isTimelineInView) {
    return (
      <div
        className={`relative flex items-start gap-6 pl-20 opacity-0 md:pl-0 ${
          isEven ? 'md:flex-row md:text-right' : 'md:flex-row-reverse md:text-left'
        }`}
      >
        <div className={`flex-1 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <div className="h-20" />
          </div>
        </div>
        <div className="absolute left-4 top-0 z-10 md:left-1/2 md:-translate-x-1/2">
          <div className="h-12 w-12 rounded-full border-2 border-white/10 bg-teal-dark" />
        </div>
        <div className="hidden flex-1 md:block" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-start gap-6 pl-20 md:pl-0 ${
        isEven ? 'md:flex-row md:text-right' : 'md:flex-row-reverse md:text-left'
      }`}
    >
      {/* Card */}
      <div className={`flex-1 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
        <motion.div
          style={{ opacity: cardOpacity, x: cardX, scale: cardScale }}
          className="group rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          whileHover={{ y: -5 }}
        >
          {/* Year & Salary badges */}
          <div
            className={`mb-4 flex flex-wrap items-center gap-3 ${
              isEven ? 'md:justify-end' : 'md:justify-start'
            }`}
          >
            <span
              className="font-[var(--font-headline)] text-2xl font-black"
              style={{ color: item.colorHex }}
            >
              {item.year}
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${item.colorHex}20`,
                color: item.colorHex,
              }}
            >
              {item.salary}
            </span>
          </div>

          {/* Role */}
          <h3 className="mb-2 font-[var(--font-headline)] text-xl font-bold text-white">
            {item.role}
          </h3>

          {/* Detail */}
          <p className="text-base leading-relaxed text-white/60">
            {item.detail}
          </p>

          {/* Highlight badge for "HOY" - Links to /empezar */}
          {item.isHighlight && (
            <Link href="/empezar" className={`block ${isEven ? 'md:text-right' : ''}`}>
              <motion.div
                className={`mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-4 py-2 transition-shadow hover:shadow-lg hover:shadow-coral/30 ${
                  isEven ? 'md:ml-auto' : ''
                }`}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-bold text-white">
                  Tu momento es ahora
                </span>
              </motion.div>
            </Link>
          )}
        </motion.div>
      </div>

      {/* Node - Center on desktop, left on mobile */}
      <div className="absolute left-4 top-0 z-10 md:left-1/2 md:-translate-x-1/2">
        {/* Glow effect - expands outward */}
        <motion.div
          className="absolute -inset-3 rounded-full"
          style={{
            backgroundColor: item.colorHex,
            filter: 'blur(12px)',
            opacity: glowOpacity,
            scale: glowScale,
          }}
        />

        {/* Node circle - scales up and fills with color */}
        <motion.div
          className="relative flex h-12 w-12 items-center justify-center rounded-full border-2"
          style={{
            borderColor: item.colorHex,
            backgroundColor: item.colorHex,
            opacity: nodeOpacity,
            scale: nodeScale,
          }}
        >
          {/* Icon - appears after node */}
          <motion.div
            style={{ opacity: iconOpacity, scale: iconScale }}
          >
            <Icon className="h-6 w-6 text-white" strokeWidth={2} />
          </motion.div>
        </motion.div>
      </div>

      {/* Empty space for the other side on desktop */}
      <div className="hidden flex-1 md:block" />
    </div>
  );
}

export default function SobreMiHistorySection() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, margin: '-100px' });

  // Check if timeline is in view to start animations
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-50px' });

  // Track scroll progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  // Transform scroll progress to line height (only when in view)
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="history"
      ref={containerRef}
      className="relative overflow-hidden bg-teal-dark"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -left-40 top-[20%] h-[400px] w-[400px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="blob absolute -right-40 bottom-[20%] h-[350px] w-[350px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="h-5 w-5 text-coral" />
            </motion.div>
            <span className="font-[var(--font-inter)] text-sm font-semibold text-white/80">
              Mi Trayectoria
            </span>
          </motion.div>

          <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-black text-white">
            Mi <span className="text-coral">Camino</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Cómo construí mi carrera remota desde cero
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-base font-semibold text-coral">
            Para que tú también puedas hacerlo.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-3xl">
          {/* Background line (gray) - only visible when timeline is in view */}
          <motion.div
            className="absolute bottom-0 left-[calc(1rem+22px)] top-0 w-1 rounded-full bg-white/10 md:left-1/2 md:-translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={isTimelineInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          />

          {/* Animated solid coral line that fills on scroll */}
          <motion.div
            className="absolute left-[calc(1rem+22px)] top-0 w-1 origin-top rounded-full bg-coral md:left-1/2 md:-translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={isTimelineInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            style={{
              height: '100%',
              scaleY: lineScaleY,
            }}
          />

          {/* Timeline Items */}
          <div className="relative space-y-16 md:space-y-20">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                isEven={index % 2 === 0}
                scrollProgress={scrollYProgress}
                totalItems={timelineData.length}
                isTimelineInView={isTimelineInView}
              />
            ))}
          </div>
        </div>

        {/* Stats highlight */}
        <motion.div
          ref={footerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 mt-20 flex items-center justify-center"
        >
          <motion.div
            className="inline-flex items-center gap-4 rounded-full bg-white/10 px-6 py-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-5 w-5 text-mint" />
            </motion.div>
            <span className="text-sm font-medium text-white/70">
              +6 años de crecimiento continuo
            </span>
          </motion.div>
        </motion.div>

        {/* Quote bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isFooterInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-16 max-w-xl"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <Quote className="mb-3 h-8 w-8 text-coral/40" />
            <p className="font-[var(--font-headline)] text-lg font-semibold leading-relaxed text-white/80">
              &ldquo;Si algo me ha enseñado el mundo remoto es que no hay
              límites. Cuando crees en ti, defines intenciones claras y tomas
              acciones alineadas, todo se vuelve posible. Y el aprendizaje
              constante es la clave para seguir creciendo!&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Skills & Platforms */}
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Habilidades que desarrollé
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isFooterInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-mint hover:bg-mint/20 hover:text-white"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Plataformas donde he trabajado
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {platforms.map((platform, index) => (
                <motion.span
                  key={platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isFooterInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.06 }}
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-2 font-[var(--font-headline)] text-sm font-semibold text-white/80 transition-all hover:border-coral hover:bg-coral/20 hover:text-white"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {platform}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
