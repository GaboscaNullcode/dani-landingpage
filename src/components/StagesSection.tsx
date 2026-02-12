'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Compass,
  HelpCircle,
  Rocket,
  Sparkles,
  ArrowRight,
  Check,
  ShoppingBag,
  CircleHelp,
  Star,
} from 'lucide-react';
import QuizModal from './QuizModal';

export interface StageData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  cta: string;
  href: string;
  icon: typeof Compass;
  gradient: string;
  shadowColor: string;
  accentColor: string;
  badge?: string;
}

const stages: StageData[] = [
  {
    id: 'stage-card-1',
    title: 'Estoy Explorando',
    subtitle: 'Quiero entender si el trabajo remoto es para mí',
    description:
      'Si te llama la atención el trabajo remoto pero todavía no sabes por dónde empezar, aquí tienes recursos gratuitos y claros para informarte sin presión.',
    items: [
      'Masterclass gratuita',
      'Guía gratuita – Ruta de inicio en 7 días',
      'Blog',
      'Newsletter',
    ],
    cta: 'Explorar recursos gratuitos',
    href: '/recursos-gratuitos',
    icon: Compass,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
    shadowColor: 'rgba(167, 139, 250, 0.3)',
    accentColor: '#a78bfa',
  },
  {
    id: 'stage-card-2',
    title: 'Estoy confundid@',
    subtitle:
      'Quiero empezar con claridad — Necesito un paso a paso claro para avanzar',
    description:
      'Tienes la intención, pero la información suelta abruma. Aquí encuentras una ruta clara para empezar con orden y avanzar sin adivinar.',
    items: [
      'Ruta paso a paso (ordenada por etapas)',
      'Plantillas y Guía para CV y perfil',
    ],
    cta: 'Ver la ruta recomendada',
    href: '/ruta-recomendada',
    icon: HelpCircle,
    gradient: 'var(--gradient-coral-pink)',
    shadowColor: 'rgba(255, 107, 107, 0.3)',
    accentColor: '#e056a0',
    badge: 'MÁS COMÚN',
  },
  {
    id: 'stage-card-3',
    title: 'Estoy list@ para la acción',
    subtitle: 'Quiero resultados reales con acompañamiento profesional',
    description:
      'Tienes la decisión tomada y quieres postular con estrategia profesional YA. Buscas claridad total, feedback directo y un plan adaptado a tu caso.',
    items: [
      'Acompañamiento 1:1 personalizado',
      'Optimización real de CV y perfiles',
      'Estrategia clara según tu experiencia y objetivo',
    ],
    cta: 'Ver opciones de acompañamiento',
    href: '/servicios',
    icon: Rocket,
    gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
    shadowColor: 'rgba(224, 86, 160, 0.3)',
    accentColor: '#e056a0',
  },
];

export { stages };

export default function StagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [quizOpen, setQuizOpen] = useState(false);
  const [recommendedStage, setRecommendedStage] = useState<number | null>(null);
  const quizTriggerRef = useRef<HTMLButtonElement>(null);
  const stagesGridRef = useRef<HTMLDivElement>(null);

  const handleQuizResult = useCallback((stage: number) => {
    setRecommendedStage(stage);
    setQuizOpen(false);

    // Scroll suave a las tarjetas y highlight
    setTimeout(() => {
      stagesGridRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 250);
  }, []);

  const handleQuizClose = useCallback(() => {
    setQuizOpen(false);
    quizTriggerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section
      id="stages"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-padding) 0',
        background:
          'linear-gradient(135deg, #fef7f0 0%, #fce7f3 50%, #fef7f0 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="blob absolute -right-40 top-20 h-[500px] w-[500px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(252, 211, 77, 0.2) 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="blob absolute -left-32 bottom-0 h-[400px] w-[400px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 shadow-md backdrop-blur-sm"
          >
            <Sparkles className="h-5 w-5 text-coral" />
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-gray-dark">
              Elige tu camino
            </span>
          </motion.div>

          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
            Ruta Remote con{' '}
            <span className="gradient-text-playful">Dani</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
            Tu sendero hacia la libertad: elige tu ruta con Dani y transforma tu
            trabajo.
          </p>
        </motion.div>

        {/* Quiz Banner — compact, above cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <button
            ref={quizTriggerRef}
            onClick={() => setQuizOpen(true)}
            className="group inline-flex items-center gap-3 rounded-full bg-white/90 px-5 py-2.5 shadow-md backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <CircleHelp className="h-4 w-4 text-pink" />
            <span className="font-[var(--font-dm-sans)] text-sm text-gray-carbon">
              ¿No sabes en qué etapa estás?
            </span>
            <span className="inline-flex items-center gap-1 font-[var(--font-dm-sans)] text-sm font-bold text-pink transition-colors duration-300 group-hover:text-coral">
              Descúbrelo en 1 minuto
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </button>
        </motion.div>

        {/* Stages Grid */}
        <div
          ref={stagesGridRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            const stageNumber = index + 1;
            const isRecommended = recommendedStage === stageNumber;

            return (
              <motion.div
                key={stage.id}
                id={stage.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -12,
                  rotate: index === 1 ? 0 : index === 0 ? -1 : 1,
                }}
                className="relative pt-5"
              >
                {/* Recommended badge — outside the card for clean overflow */}
                <AnimatePresence>
                  {isRecommended && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.85 }}
                      transition={{
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="absolute -top-0.5 left-1/2 z-20 -translate-x-1/2"
                    >
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-coral to-pink px-5 py-2 font-[var(--font-dm-sans)] text-xs font-bold tracking-wide text-white shadow-[0_4px_20px_rgba(232,70,106,0.4)]">
                        <Star className="h-3.5 w-3.5 fill-white" />
                        Recomendada para ti
                        <Star className="h-3.5 w-3.5 fill-white" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card — overflow-hidden keeps the ribbon contained */}
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-8 transition-[box-shadow,border-color] duration-500 ${
                    isRecommended
                      ? 'border-2 border-coral/60 shadow-[0_0_25px_rgba(232,70,106,0.2),0_10px_50px_rgba(0,0,0,0.08)]'
                      : 'border-2 border-transparent shadow-[0_10px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.12)]'
                  }`}
                >
                  {/* Badge (e.g. MÁS COMÚN) */}
                  {stage.badge && (
                    <div
                      className="absolute -right-8 top-6 rotate-45 px-10 py-1 text-xs font-bold uppercase tracking-wider text-white"
                      style={{ background: stage.gradient }}
                    >
                      {stage.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <motion.div
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] shadow-lg"
                    style={{
                      background: stage.gradient,
                      boxShadow: `0 10px 30px ${stage.shadowColor}`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <IconComponent className="h-10 w-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mb-1 font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                    {stage.title}
                  </h3>
                  <p
                    className="mb-4 font-[var(--font-dm-sans)] text-sm font-medium"
                    style={{ color: stage.accentColor }}
                  >
                    {stage.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-gray-carbon">
                    {stage.description}
                  </p>

                  {/* Items */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {stage.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-gray-carbon"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15 + idx * 0.1,
                        }}
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-white"
                          style={{ background: stage.gradient }}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={stage.href}
                    className="btn-shimmer group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full py-4 font-[var(--font-headline)] text-sm font-bold uppercase tracking-wide text-white transition-[transform,box-shadow] duration-500"
                    style={{
                      background: stage.gradient,
                      boxShadow: `0 10px 30px ${stage.shadowColor}`,
                    }}
                  >
                    <span>{stage.cta}</span>
                    <motion.div
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Shop link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 text-center"
        >
          <Link
            href="/tienda"
            className="group inline-flex items-center gap-2 text-gray-carbon transition-colors duration-300 hover:text-coral"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>¿Buscas un recurso específico? Visita nuestra tienda</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={quizOpen}
        onClose={handleQuizClose}
        onResult={handleQuizResult}
      />
    </section>
  );
}
