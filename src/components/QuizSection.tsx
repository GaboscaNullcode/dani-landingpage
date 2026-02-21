'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
  Rocket,
  RotateCcw,
  Mail,
  BookOpen,
  GraduationCap,
  MessageCircle,
  Gift,
  Check,
  Star,
  ChevronDown,
  HelpCircle,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { stages, type StageData } from './StagesSection';

// Types
interface QuizOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface ProductRecommendation {
  name: string;
  price: string;
  description: string;
  href: string;
  priority: 'primary' | 'secondary';
  icon: typeof BookOpen;
  gradient: string;
  tag?: string;
}

interface LevelResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  shadowColor: string;
  accentColor: string;
  recommendations: ProductRecommendation[];
}

// Quiz Data con iconos para feedback visual
const questions: QuizQuestion[] = [
  {
    id: 'question_1',
    question: '¿En qué punto estás hoy?',
    options: [
      { id: 'q1_a', label: 'Solo estoy explorando opciones', icon: Compass },
      { id: 'q1_b', label: 'Ya decidí, pero estoy confundid@ / abrumad@', icon: HelpCircle },
      { id: 'q1_c', label: 'Ya decidí y quiero pasar a la acción YA!', icon: Rocket },
    ],
  },
  {
    id: 'question_2',
    question: '¿Qué es lo que más te frena ahora mismo?',
    options: [
      { id: 'q2_a', label: 'No sé si esto es para mí', icon: Compass },
      { id: 'q2_b', label: 'No sé por dónde empezar, ni qué hacer primero', icon: HelpCircle },
      { id: 'q2_c', label: 'Mi CV / perfil / postulaciones no están listos...', icon: Rocket },
      { id: 'q2_d', label: 'Me falta estrategia para conseguir entrevistas/clientes', icon: Rocket },
    ],
  },
  {
    id: 'question_3',
    question: '¿Has intentado postular o buscar trabajo remoto antes?',
    options: [
      { id: 'q3_a', label: 'No, todavía no', icon: Compass },
      { id: 'q3_b', label: 'Sí, pero de forma irregular', icon: Compass },
      { id: 'q3_c', label: 'Sí, con frecuencia, pero sin resultados claros', icon: Rocket },
    ],
  },
  {
    id: 'question_4',
    question: '¿Qué necesitas más en este momento?',
    options: [
      { id: 'q4_a', label: 'Información clara sin presión', icon: Compass },
      { id: 'q4_b', label: 'Un mapa paso a paso y orden mental', icon: HelpCircle },
      { id: 'q4_c', label: 'Acompañamiento directo y feedback personalizado', icon: Rocket },
    ],
  },
  {
    id: 'question_5',
    question: '¿Qué nivel de apoyo prefieres para avanzar?',
    options: [
      { id: 'q5_a', label: 'Ir a mi ritmo con recursos gratuitos', icon: Compass },
      { id: 'q5_b', label: 'Seguir una ruta estructurada (guía/curso)', icon: HelpCircle },
      { id: 'q5_c', label: 'Ir con acompañamiento 1:1 o programa intensivo', icon: Rocket },
    ],
  },
];

// Results Data — 3 resultados basados en reglas
const levelResults: Record<string, LevelResult> = {
  explorando: {
    id: 'explorando',
    title: 'Estoy Explorando',
    subtitle: 'Nivel de Descubrimiento',
    description:
      'Es normal sentir dudas al principio. Lo importante es que ya estás aquí buscando respuestas. Empieza con calma, sin presión, y descubre si esto es para ti.',
    icon: Compass,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
    shadowColor: 'rgba(167, 139, 250, 0.3)',
    accentColor: '#a78bfa',
    recommendations: [
      {
        name: 'Newsletter Semanal',
        price: 'Gratis',
        description: 'Recibe tips y recursos cada semana directo en tu correo',
        href: '/newsletter',
        priority: 'primary',
        icon: Mail,
        gradient: 'var(--gradient-coral-pink)',
        tag: 'Recomendado',
      },
      {
        name: 'Guía de Inicio',
        price: 'Gratis',
        description: 'Tu primer mapa mental del trabajo remoto',
        href: '/recursos',
        priority: 'secondary',
        icon: Gift,
        gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
      },
      {
        name: 'Masterclass Gratuita',
        price: 'Gratis',
        description: 'Descubre si el mundo remoto es para ti',
        href: '/recursos',
        priority: 'secondary',
        icon: GraduationCap,
        gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
      },
    ],
  },
  confundido: {
    id: 'confundido',
    title: 'Estoy confundid@',
    subtitle: 'Nivel de Preparación',
    description:
      'El miedo a no saber es el más fácil de vencer: se cura con información correcta. Necesitas una guía clara que elimine la confusión y te dé un plan paso a paso.',
    icon: HelpCircle,
    gradient: 'var(--gradient-coral-pink)',
    shadowColor: 'rgba(255, 107, 107, 0.3)',
    accentColor: '#e056a0',
    recommendations: [
      {
        name: 'eBook: Guía Práctica para Iniciar',
        price: '$27 USD',
        description:
          'Todo lo esencial para dar tus primeros pasos con confianza',
        href: '/tienda',
        priority: 'primary',
        icon: BookOpen,
        gradient: 'var(--gradient-coral-pink)',
        tag: 'Más vendido',
      },
      {
        name: 'eBook: Define tu Camino Remoto',
        price: '$7 USD',
        description: 'Clarifica tus objetivos y define tu ruta ideal',
        href: '/tienda',
        priority: 'secondary',
        icon: BookOpen,
        gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
      },
    ],
  },
  accion: {
    id: 'accion',
    title: 'Estoy list@ para la acción',
    subtitle: 'Nivel Personalizado',
    description:
      'Ya sabes que quieres esto. Ahora necesitas dejar de investigar y empezar a ejecutar con un sistema probado y acompañamiento que te lleve a resultados.',
    icon: Rocket,
    gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
    shadowColor: 'rgba(224, 86, 160, 0.3)',
    accentColor: '#e056a0',
    recommendations: [
      {
        name: 'Curso Completo: Paso a Paso + 6 Bonos',
        price: '$47 USD',
        description:
          'La guía definitiva con todo incluido para lanzar tu carrera remota',
        href: '/ebook-trabajo-remoto',
        priority: 'primary',
        icon: BookOpen,
        gradient: 'var(--gradient-coral-pink)',
        tag: 'Mejor valor',
      },
      {
        name: 'Programa Intensivo 1:1',
        price: '$155 USD',
        description:
          '4 horas donde construimos juntas tu estrategia completa',
        href: '/asesorias',
        priority: 'secondary',
        icon: MessageCircle,
        gradient: 'linear-gradient(135deg, #374c4f 0%, #4a5c5f 100%)',
      },
    ],
  },
};

// Orden de resultados para la vista por niveles
const levelOrder = ['explorando', 'confundido', 'accion'];

// Helper: determina el resultado según las reglas de asignación
function getResult(answers: (string | null)[]): string {
  // Extrae la letra de la opción (e.g. "q1_a" → "a")
  const answer = (qi: number): string | null => {
    const id = answers[qi];
    if (!id) return null;
    return id.split('_')[1];
  };

  const q1 = answer(0);
  const q2 = answer(1);
  const q3 = answer(2);
  const q4 = answer(3);
  const q5 = answer(4);

  // Prioridad 1: "List@ para la acción"
  if (
    q1 === 'c' ||
    q2 === 'c' ||
    q2 === 'd' ||
    q3 === 'c' ||
    q4 === 'c' ||
    q5 === 'c'
  ) {
    return 'accion';
  }

  // Prioridad 2: "Confundid@"
  if (q1 === 'b' || q2 === 'b' || q4 === 'b' || q5 === 'b') {
    return 'confundido';
  }

  // Prioridad 3: "Explorando" (default)
  return 'explorando';
}

// Level Accordion Component
function LevelAccordion({
  level,
  stage,
  isExpanded,
  onToggle,
  index,
}: {
  level: LevelResult;
  stage: StageData;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden rounded-[24px] bg-white shadow-lg shadow-pink/5"
    >
      {/* Accordion Header */}
      <motion.button
        onClick={onToggle}
        className="group flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-cream/50 sm:p-6"
        whileTap={{ scale: 0.995 }}
      >
        {/* Level Icon */}
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-white shadow-lg sm:h-16 sm:w-16"
          style={{
            background: stage.gradient,
            boxShadow: `0 10px 30px ${stage.shadowColor}`,
          }}
        >
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>

        {/* Level Info */}
        <div className="flex-1">
          <h3 className="mb-1 font-[var(--font-headline)] text-xl font-bold text-black-deep sm:text-2xl">
            {stage.title}
          </h3>
          <p
            className="font-[var(--font-dm-sans)] text-sm font-medium"
            style={{ color: stage.accentColor }}
          >
            {level.subtitle}
          </p>
        </div>

        {/* Expand Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-gray-carbon transition-colors group-hover:bg-coral/10 group-hover:text-coral"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="border-t border-gray-light/50 px-5 pb-6 pt-5 sm:px-6">
              {/* Description */}
              <p className="mb-6 font-[var(--font-dm-sans)] text-sm leading-relaxed text-gray-carbon">
                {stage.description}
              </p>

              {/* Items */}
              <ul className="mb-6 space-y-3">
                {stage.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-carbon"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: stage.gradient }}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={stage.href}
                className="btn-shimmer group/btn inline-flex items-center gap-2 rounded-full px-6 py-3 font-[var(--font-headline)] text-sm font-bold uppercase tracking-wide text-white transition-[transform,box-shadow] duration-500"
                style={{
                  background: stage.gradient,
                  boxShadow: `0 10px 30px ${stage.shadowColor}`,
                }}
              >
                <span>{stage.cta}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function QuizSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // View mode state
  const [viewMode, setViewMode] = useState<'quiz' | 'levels'>('quiz');

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([null, null, null, null, null]);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Levels view state
  const [expandedLevel, setExpandedLevel] = useState<string | null>('explorando');

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionId;
    setSelectedAnswers(newAnswers);
  };

  // Navigation handlers with improved transitions
  const handleNext = () => {
    if (isTransitioning) return;

    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true);
      setDirection('next');
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      }, 150);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowResult(true);
        setIsTransitioning(false);
        // Scroll al inicio de la página cuando se muestran los resultados
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isTransitioning || currentQuestion === 0) return;

    setIsTransitioning(true);
    setDirection('prev');
    setTimeout(() => {
      setCurrentQuestion(currentQuestion - 1);
      setIsTransitioning(false);
    }, 150);
  };

  const handleRestart = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setSelectedAnswers([null, null, null, null, null]);
    setDirection('next');
  };

  // Get current result
  const resultId = getResult(selectedAnswers);
  const result = levelResults[resultId];
  const currentSelectedOption = selectedAnswers[currentQuestion];

  // Animation variants
  const cardVariants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction === 'next' ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction === 'next' ? -15 : 15,
    }),
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Animated background - siempre usa fondo claro para mejor contraste */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 40%, #fce7f3 70%, #f5f3ff 100%)',
          }}
        />

        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-50">
          <motion.div
            className="absolute h-[800px] w-[800px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)',
              top: '-20%',
              right: '-10%',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-[600px] w-[600px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
              bottom: '-10%',
              left: '-5%',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(110,231,183,0.25) 0%, transparent 70%)',
              top: '30%',
              left: '30%',
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Geometric shapes */}
        <motion.div
          className="absolute right-[10%] top-[15%] h-4 w-4 rotate-45 bg-coral/30"
          animate={{ rotate: [45, 90, 45], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-[15%] top-[25%] h-3 w-3 rounded-full bg-lavender/40"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[20%] h-5 w-5 rounded-full border-2 border-mint/50"
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[10%] h-6 w-6 rounded-lg border-2 border-pink/30"
          animate={{ rotate: [0, -180, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Sparkle elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles className="h-4 w-4 text-sunshine/60" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div
        className="container-custom relative z-10"
        style={{
          padding: 'var(--section-padding) 0',
          paddingTop: 'clamp(10rem, 18vw, 14rem)',
        }}
      >
        {/* Header - Always visible */}
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
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 shadow-lg shadow-pink/10 backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="h-5 w-5 text-coral" />
            </motion.div>
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-gray-dark">
              Quiz Remote Con Dani
            </span>
          </motion.div>

          <h1 className="text-hero-title font-[var(--font-headline)] font-bold text-black-deep">
            Descubre por dónde empezar tu{' '}
            <span className="gradient-text-playful">camino remoto</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-carbon">
            Responde 5 preguntas para obtener tu ruta ideal
          </p>
        </motion.div>

        {/* View Mode Toggle - Only show when not in results */}
        {!showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-md"
          >
            <div className="relative flex rounded-2xl bg-white/80 p-1.5 shadow-lg shadow-pink/10 backdrop-blur-sm">
              {/* Animated background pill */}
              <motion.div
                className="absolute inset-y-1.5 rounded-xl bg-gradient-to-r from-coral to-pink shadow-md"
                initial={false}
                animate={{
                  left: viewMode === 'quiz' ? '6px' : '50%',
                  right: viewMode === 'quiz' ? '50%' : '6px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />

              {/* Quiz Tab */}
              <button
                onClick={() => setViewMode('quiz')}
                className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-[var(--font-dm-sans)] text-sm font-semibold transition-colors ${
                  viewMode === 'quiz' ? 'text-white' : 'text-gray-carbon hover:text-gray-dark'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Hacer Quiz</span>
              </button>

              {/* Levels Tab */}
              <button
                onClick={() => setViewMode('levels')}
                className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-[var(--font-dm-sans)] text-sm font-semibold transition-colors ${
                  viewMode === 'levels' ? 'text-white' : 'text-gray-carbon hover:text-gray-dark'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Ver por Niveles</span>
              </button>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* QUIZ VIEW */}
          {viewMode === 'quiz' && !showResult && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl"
            >
              {/* Visual Step Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="flex items-center">
                      <motion.div
                        className={`flex h-10 w-10 items-center justify-center rounded-full font-[var(--font-headline)] font-bold transition-all duration-500 ${
                          index < currentQuestion
                            ? 'bg-gradient-to-br from-coral to-pink text-white shadow-lg shadow-coral/30'
                            : index === currentQuestion
                              ? 'bg-white text-coral shadow-xl shadow-pink/20 ring-4 ring-coral/20'
                              : 'bg-white/60 text-gray-medium'
                        }`}
                        animate={index === currentQuestion ? {
                          scale: [1, 1.08, 1],
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {index < currentQuestion ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <Check className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          index + 1
                        )}
                      </motion.div>
                      {index < 4 && (
                        <div className="mx-1 h-1 w-8 overflow-hidden rounded-full bg-white/60 sm:w-12">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-coral to-pink"
                            initial={{ width: '0%' }}
                            animate={{
                              width: index < currentQuestion ? '100%' : '0%'
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Question Card */}
              <div className="perspective-1000">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentQuestion}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="relative overflow-hidden rounded-[32px] bg-white/95 p-6 shadow-2xl shadow-pink/10 backdrop-blur-xl sm:p-10"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Decorative corner gradient */}
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-coral/20 to-pink/10 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-tr from-lavender/20 to-mint/10 blur-2xl" />

                    {/* Question Number & Subtitle */}
                    <div className="relative mb-6 flex items-start justify-between">
                      <div>
                        <motion.span
                          key={`num-${currentQuestion}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-1 block font-[var(--font-dm-sans)] text-sm font-semibold uppercase tracking-wider text-coral"
                        >
                          Pregunta {currentQuestion + 1} de {questions.length}
                        </motion.span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-0.5 font-[var(--font-dm-sans)] text-xs font-medium text-coral">
                          <Sparkles className="h-3 w-3" />
                          Sé honesta contigo mism@
                        </span>
                      </div>
                      <motion.span
                        className="font-[var(--font-headline)] text-6xl font-black text-coral/10 sm:text-7xl"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        {currentQuestion + 1}
                      </motion.span>
                    </div>

                    {/* Question Text */}
                    <motion.h2
                      key={`q-${currentQuestion}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative mb-8 font-[var(--font-headline)] text-2xl font-bold text-black-deep sm:text-3xl"
                    >
                      {questions[currentQuestion].question}
                    </motion.h2>

                    {/* Options */}
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => {
                        const isSelected = currentSelectedOption === option.id;
                        return (
                          <motion.label
                            key={option.id}
                            custom={index}
                            variants={optionVariants}
                            initial="hidden"
                            animate="visible"
                            className={`group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl p-4 transition-all duration-300 sm:p-5 ${
                              isSelected
                                ? 'bg-gradient-to-r from-coral to-pink text-white shadow-lg shadow-coral/30'
                                : 'bg-cream/80 hover:bg-gradient-to-r hover:from-gray-dark hover:to-gray-carbon hover:text-white hover:shadow-lg'
                            }`}
                            whileHover={{ x: isSelected ? 0 : 6, scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Selection indicator */}
                            <input
                              type="radio"
                              name={`question_${currentQuestion}`}
                              value={option.id}
                              checked={isSelected}
                              onChange={() => handleOptionSelect(option.id)}
                              className="sr-only"
                            />

                            {/* Icon */}
                            <motion.div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                                isSelected
                                  ? 'bg-white/20'
                                  : 'bg-coral/10 group-hover:bg-white/20'
                              }`}
                              animate={isSelected ? {
                                scale: [1, 1.1, 1],
                              } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              <option.icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-coral group-hover:text-white'}`} />
                            </motion.div>

                            {/* Radio circle */}
                            <span
                              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                isSelected
                                  ? 'border-white bg-white'
                                  : 'border-gray-dark/30 group-hover:border-white/50'
                              }`}
                            >
                              <AnimatePresence>
                                {isSelected && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                    className="h-3 w-3 rounded-full bg-coral"
                                  />
                                )}
                              </AnimatePresence>
                            </span>

                            {/* Label */}
                            <span className="flex-1 font-[var(--font-dm-sans)] text-sm font-medium sm:text-base">
                              {option.label}
                            </span>

                            {/* Selected checkmark */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
                                >
                                  <Check className="h-4 w-4" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.label>
                        );
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex items-center justify-between">
                      <motion.button
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-2 rounded-full px-5 py-3 font-[var(--font-dm-sans)] font-semibold transition-all duration-300 ${
                          currentQuestion === 0
                            ? 'invisible'
                            : 'border-2 border-gray-dark text-gray-dark hover:bg-gray-dark hover:text-white'
                        }`}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Anterior</span>
                      </motion.button>

                      <motion.button
                        onClick={handleNext}
                        disabled={!currentSelectedOption || isTransitioning}
                        className={`btn-shimmer group relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-[var(--font-headline)] font-bold text-white transition-all duration-300 sm:px-8 ${
                          currentSelectedOption && !isTransitioning
                            ? 'hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,107,0.4)]'
                            : 'cursor-not-allowed opacity-50'
                        }`}
                        style={{
                          background: currentSelectedOption
                            ? 'var(--gradient-coral-pink)'
                            : '#ccc',
                        }}
                        whileHover={currentSelectedOption && !isTransitioning ? { scale: 1.02 } : {}}
                        whileTap={currentSelectedOption && !isTransitioning ? { scale: 0.98 } : {}}
                      >
                        <span>
                          {currentQuestion === questions.length - 1
                            ? '¡Ver mi resultado!'
                            : 'Siguiente'}
                        </span>
                        <motion.div
                          animate={currentSelectedOption ? { x: [0, 4, 0] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex items-center justify-center gap-6 text-center text-sm text-gray-medium"
              >
                <span className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint/20">
                    <Check className="h-3 w-3 text-mint" />
                  </span>
                  100% Gratis
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lavender/20">
                    <Check className="h-3 w-3 text-lavender" />
                  </span>
                  Sin registro
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral/20">
                    <Check className="h-3 w-3 text-coral" />
                  </span>
                  1 minuto
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* LEVELS VIEW */}
          {viewMode === 'levels' && !showResult && (
            <motion.div
              key="levels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-4xl"
            >
              {/* Intro text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-center font-[var(--font-dm-sans)] text-gray-carbon"
              >
                Explora cada nivel y encuentra el que mejor se adapte a tu situación actual
              </motion.p>

              {/* Level Accordions */}
              <div className="space-y-4">
                {levelOrder.map((levelKey, index) => (
                  <LevelAccordion
                    key={levelKey}
                    level={levelResults[levelKey]}
                    stage={stages[index]}
                    isExpanded={expandedLevel === levelKey}
                    onToggle={() => setExpandedLevel(expandedLevel === levelKey ? null : levelKey)}
                    index={index}
                  />
                ))}
              </div>

              {/* CTA to take quiz */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-center"
              >
                <p className="mb-4 font-[var(--font-dm-sans)] text-gray-carbon">
                  ¿No estás seguro/a de cuál es tu nivel?
                </p>
                <button
                  onClick={() => setViewMode('quiz')}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-8 py-4 font-[var(--font-headline)] font-bold text-white shadow-lg shadow-coral/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Hacer el Quiz</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* RESULTS VIEW */}
          {showResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl"
            >
              {/* Result Header */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-12 text-center"
              >
                {/* Celebration icon with bounce */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3,
                  }}
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl text-white shadow-2xl sm:h-32 sm:w-32"
                  style={{
                    background: result.gradient,
                    boxShadow: `0 20px 50px ${result.shadowColor}`,
                  }}
                >
                  <result.icon className="h-12 w-12 sm:h-16 sm:w-16" />
                </motion.div>

                {/* Level badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-white shadow-lg"
                  style={{
                    background: result.gradient,
                    boxShadow: `0 10px 40px ${result.shadowColor}`,
                  }}
                >
                  <result.icon className="h-5 w-5" />
                  <span className="font-[var(--font-dm-sans)] text-sm font-bold uppercase tracking-wider">
                    {result.subtitle}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-4 font-[var(--font-headline)] text-4xl font-bold text-black-deep sm:text-5xl"
                >
                  <span className="gradient-text-playful">{result.title}</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mx-auto max-w-2xl text-lg text-gray-carbon sm:text-xl"
                >
                  {result.description}
                </motion.p>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-10"
              >
                <h3 className="mb-8 flex items-center justify-center gap-2 text-center font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                  <span>Tu camino recomendado</span>
                  <Sparkles className="h-6 w-6 text-coral" />
                </h3>

                <div
                  className={`grid gap-6 ${
                    result.recommendations.length === 1
                      ? 'md:grid-cols-1 md:max-w-md md:mx-auto'
                      : result.recommendations.length === 2
                        ? 'md:grid-cols-2'
                        : 'md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {/* Recommendations */}
                  {result.recommendations.map((rec, index) => {
                    const isPrimary = rec.priority === 'primary';

                    return (
                      <motion.div
                        key={rec.name}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`group relative overflow-hidden rounded-[28px] p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-8 ${
                          isPrimary ? 'text-white' : 'bg-white'
                        }`}
                        style={isPrimary ? {
                          background: rec.gradient,
                          boxShadow: `0 25px 50px -12px ${result.shadowColor}`,
                        } : {}}
                      >
                        {/* Decorative elements */}
                        {isPrimary && (
                          <>
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />
                          </>
                        )}

                        {/* Tag */}
                        {rec.tag && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 + index * 0.1 }}
                            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                              isPrimary ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-r from-coral to-pink text-white'
                            }`}
                          >
                            {rec.tag}
                          </motion.span>
                        )}

                        <div className="relative">
                          <div
                            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                              isPrimary ? 'bg-white/20 backdrop-blur-sm' : ''
                            }`}
                            style={!isPrimary ? { background: rec.gradient } : {}}
                          >
                            <rec.icon className={`h-8 w-8 ${isPrimary ? 'text-white' : 'text-white'}`} />
                          </div>
                          <h4
                            className={`mb-3 font-[var(--font-headline)] text-xl font-bold sm:text-2xl ${
                              isPrimary ? '' : 'text-black-deep'
                            }`}
                          >
                            {rec.name}
                          </h4>
                          <p
                            className={`mb-5 text-sm sm:text-base ${
                              isPrimary ? 'text-white/90' : 'text-gray-carbon'
                            }`}
                          >
                            {rec.description}
                          </p>
                          <div
                            className={`mb-5 font-[var(--font-headline)] text-3xl font-black ${
                              isPrimary ? '' : 'text-coral'
                            }`}
                          >
                            {rec.price}
                          </div>
                          <Link
                            href={rec.href}
                            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-[var(--font-dm-sans)] font-bold shadow-lg transition-all duration-300 hover:shadow-xl group-hover:translate-x-1 ${
                              isPrimary ? 'bg-white text-gray-dark' : 'text-white'
                            }`}
                            style={!isPrimary ? { background: rec.gradient } : {}}
                          >
                            <span>Quiero esto</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Secondary CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col items-center gap-5 text-center"
              >
                <Link
                  href="/tienda"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-gray-dark px-8 py-4 font-[var(--font-headline)] font-bold text-gray-dark transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-white hover:shadow-[0_15px_40px_rgba(255,107,107,0.3)]"
                >
                  <span>Explorar todos los productos</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={handleRestart}
                  className="group mt-2 inline-flex items-center gap-2 font-[var(--font-dm-sans)] text-gray-medium transition-colors hover:text-coral"
                >
                  <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180" />
                  <span>Volver a hacer el quiz</span>
                </button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-12 rounded-2xl bg-white/60 p-6 text-center backdrop-blur-sm"
              >
                <div className="flex items-center justify-center gap-1 text-sunshine">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 font-[var(--font-dm-sans)] text-gray-carbon">
                  <span className="font-bold text-black-deep">+500 personas</span> ya descubrieron su camino remoto con Dani
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
