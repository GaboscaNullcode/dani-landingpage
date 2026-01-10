'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
  Sprout,
  Rocket,
  Target,
  RotateCcw,
  Mail,
  BookOpen,
  GraduationCap,
  MessageCircle,
  Gift,
} from 'lucide-react';

// Types
interface QuizOption {
  id: string;
  label: string;
  points: number;
  flag?: string;
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
}

interface LevelResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Compass;
  gradient: string;
  shadowColor: string;
  recommendations: ProductRecommendation[];
  avRecommendation?: ProductRecommendation;
}

// Quiz Data
const questions: QuizQuestion[] = [
  {
    id: 'question_1',
    question: '¿Qué tanto conoces sobre el trabajo remoto?',
    options: [
      { id: 'q1_a', label: 'Apenas estoy explorando, no sé mucho', points: 0 },
      {
        id: 'q1_b',
        label: 'Conozco lo básico pero no sé por dónde empezar',
        points: 1,
      },
      {
        id: 'q1_c',
        label: 'Ya investigué bastante, quiero tomar acción',
        points: 2,
      },
      {
        id: 'q1_d',
        label: 'Tengo experiencia pero necesito orientación personalizada',
        points: 3,
      },
    ],
  },
  {
    id: 'question_2',
    question: '¿Qué te gustaría lograr?',
    options: [
      {
        id: 'q2_a',
        label: 'Entender si el trabajo remoto es para mí',
        points: 0,
      },
      {
        id: 'q2_b',
        label: 'Aprender sobre ser Asistente Virtual',
        points: 1,
        flag: 'interes_av',
      },
      { id: 'q2_c', label: 'Conseguir mi primer trabajo remoto', points: 2 },
      { id: 'q2_d', label: 'Ordenar mi perfil y estrategia actual', points: 3 },
    ],
  },
  {
    id: 'question_3',
    question: '¿Cuánto estás dispuesto/a a invertir en tu formación?',
    options: [
      {
        id: 'q3_a',
        label: 'Prefiero empezar con recursos gratuitos',
        points: 0,
      },
      { id: 'q3_b', label: 'Puedo invertir poco ($7-$27)', points: 1 },
      {
        id: 'q3_c',
        label: 'Estoy listo/a para invertir en algo completo ($47+)',
        points: 2,
      },
      {
        id: 'q3_d',
        label: 'Busco acompañamiento personalizado (asesoría)',
        points: 3,
      },
    ],
  },
];

// Results Data
const levelResults: Record<string, LevelResult> = {
  nivel_0: {
    id: 'nivel_0',
    title: 'Eres un Explorador',
    subtitle: 'Nivel 0',
    description:
      'Estás en la etapa de descubrimiento. Es el momento perfecto para explorar sin presión y entender si el trabajo remoto es para ti.',
    icon: Compass,
    gradient: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 100%)',
    shadowColor: 'rgba(255, 240, 230, 0.5)',
    recommendations: [
      {
        name: 'Newsletter Semanal',
        price: 'Gratis',
        description: 'Contenido semanal con tips y recursos para empezar',
        href: '/newsletter',
        priority: 'primary',
        icon: Mail,
        gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
      },
      {
        name: 'Guía Gratuita',
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
        description: 'Para decidir si el mundo remoto es para ti',
        href: '/recursos',
        priority: 'secondary',
        icon: GraduationCap,
        gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
      },
    ],
  },
  nivel_1: {
    id: 'nivel_1',
    title: 'Eres Iniciante',
    subtitle: 'Nivel 1',
    description:
      'Ya tienes interés pero necesitas claridad. Los recursos de entrada te ayudarán a definir tu camino sin abrumarte.',
    icon: Sprout,
    gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
    shadowColor: 'rgba(224, 86, 160, 0.3)',
    recommendations: [
      {
        name: 'eBook: Guía Práctica para Iniciar',
        price: '$27 USD',
        description: 'Todo lo esencial para dar tus primeros pasos',
        href: '/tienda',
        priority: 'primary',
        icon: BookOpen,
        gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
      },
      {
        name: 'eBook: Define tu Camino Remoto',
        price: '$7 USD',
        description: 'Clarifica tus objetivos y define tu ruta',
        href: '/tienda',
        priority: 'secondary',
        icon: BookOpen,
        gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
      },
    ],
    avRecommendation: {
      name: 'Masterclass Asistente Virtual',
      price: '$22 USD',
      description: 'Especialmente para ti que quieres ser AV',
      href: '/masterclass-av',
      priority: 'primary',
      icon: GraduationCap,
      gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
    },
  },
  nivel_2: {
    id: 'nivel_2',
    title: 'Estás En Acción',
    subtitle: 'Nivel 2',
    description:
      'Ya decidiste dar el paso. Necesitas una guía estructurada que te lleve de la mano desde el inicio hasta conseguir tu primer cliente.',
    icon: Rocket,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
    shadowColor: 'rgba(255, 107, 107, 0.3)',
    recommendations: [
      {
        name: 'Curso Práctico: Paso a Paso + 6 Bonos',
        price: '$47 USD',
        description:
          'Guía completa con todo lo que necesitas para iniciar tu carrera remota',
        href: '/ebook-trabajo-remoto',
        priority: 'primary',
        icon: BookOpen,
        gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
      },
    ],
  },
  nivel_3: {
    id: 'nivel_3',
    title: 'Buscas Personalización',
    subtitle: 'Nivel 3',
    description:
      'Tienes preguntas específicas y no quieres perder tiempo. Una asesoría personalizada acelerará tus resultados.',
    icon: Target,
    gradient: 'linear-gradient(135deg, #374c4f 0%, #4a5c5f 100%)',
    shadowColor: 'rgba(55, 76, 79, 0.3)',
    recommendations: [
      {
        name: 'Asesoría Intensiva: Crea tu Camino Remoto',
        price: '$155 USD',
        description: '4 horas de acompañamiento + acceso a comunidad',
        href: '/asesorias',
        priority: 'primary',
        icon: MessageCircle,
        gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
      },
      {
        name: 'Asesoría: Iniciando tu Camino Remoto',
        price: '$66 USD',
        description: '1.5 horas de sesión personalizada + seguimiento',
        href: '/asesorias',
        priority: 'secondary',
        icon: MessageCircle,
        gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
      },
    ],
  },
};

// Helper function to determine level
function getLevel(score: number): string {
  if (score <= 2) return 'nivel_0';
  if (score <= 4) return 'nivel_1';
  if (score <= 6) return 'nivel_2';
  return 'nivel_3';
}

export default function QuizSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [showResult, setShowResult] = useState(false);
  const [interesAV, setInteresAV] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Calculate score
  const calculateScore = (): number => {
    return selectedAnswers.reduce((total, answerId, questionIndex) => {
      if (!answerId) return total;
      const question = questions[questionIndex];
      const option = question.options.find((opt) => opt.id === answerId);
      return total + (option?.points || 0);
    }, 0);
  };

  // Handle option selection
  const handleOptionSelect = (optionId: string, flag?: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionId;
    setSelectedAnswers(newAnswers);

    if (flag === 'interes_av') {
      setInteresAV(true);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection('next');
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show results
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection('prev');
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([null, null, null]);
    setShowResult(false);
    setInteresAV(false);
    setDirection('next');
  };

  // Get current result
  const score = calculateScore();
  const levelId = getLevel(score);
  const result = levelResults[levelId];
  const currentSelectedOption = selectedAnswers[currentQuestion];

  // Animation variants
  const slideVariants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
        }}
      />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -right-32 -top-32 h-[500px] w-[500px] opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="blob absolute -bottom-40 -left-40 h-[600px] w-[600px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="blob absolute right-1/4 top-1/3 h-[300px] w-[300px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(252, 211, 77, 0.4) 0%, rgba(255, 107, 107, 0.3) 100%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div
        className="container-custom relative z-10"
        style={{
          padding: 'var(--section-padding) 2rem',
          paddingTop: 'clamp(10rem, 18vw, 14rem)'
        }}
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
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
                  <Sparkles className="h-5 w-5 text-coral" />
                  <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-gray-dark">
                    Tu Camino Personalizado
                  </span>
                </motion.div>

                <h1 className="text-hero-title font-[var(--font-headline)] font-bold text-black-deep">
                  ¿Por dónde{' '}
                  <span className="gradient-text-playful">empiezo?</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-lg text-gray-carbon">
                  Responde 3 preguntas y te mostraré el camino ideal para ti
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 flex justify-center gap-3"
              >
                {[0, 1, 2].map((step) => (
                  <motion.div
                    key={step}
                    className="h-2 w-16 overflow-hidden rounded-full sm:w-20"
                    style={{
                      background:
                        step <= currentQuestion
                          ? 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)'
                          : 'rgba(255, 255, 255, 0.5)',
                    }}
                    initial={false}
                    animate={{
                      scale: step === currentQuestion ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </motion.div>

              {/* Question Card */}
              <div className="mx-auto max-w-2xl">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentQuestion}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="relative rounded-[28px] bg-white p-6 shadow-[0_15px_60px_rgba(0,0,0,0.1)] sm:p-10"
                  >
                    {/* Question Number */}
                    <span
                      className="absolute -top-4 left-6 font-[var(--font-headline)] text-7xl font-black sm:-top-6 sm:left-8 sm:text-8xl"
                      style={{
                        color: 'rgba(255, 107, 107, 0.15)',
                      }}
                    >
                      {currentQuestion + 1}
                    </span>

                    {/* Question Text */}
                    <h2 className="relative mb-8 font-[var(--font-headline)] text-xl font-bold text-black-deep sm:text-2xl">
                      {questions[currentQuestion].question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-4">
                      {questions[currentQuestion].options.map(
                        (option, index) => {
                          const isSelected =
                            currentSelectedOption === option.id;
                          return (
                            <motion.label
                              key={option.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`group flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition-all duration-300 sm:p-5 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-coral to-pink text-white shadow-[0_10px_30px_rgba(255,107,107,0.3)]'
                                  : 'bg-cream hover:bg-gray-dark hover:text-white'
                              }`}
                              whileHover={{ x: isSelected ? 0 : 8 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <input
                                type="radio"
                                name={`question_${currentQuestion}`}
                                value={option.id}
                                checked={isSelected}
                                onChange={() =>
                                  handleOptionSelect(option.id, option.flag)
                                }
                                className="sr-only"
                              />
                              <span
                                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                  isSelected
                                    ? 'border-white bg-white'
                                    : 'border-gray-dark group-hover:border-white'
                                }`}
                              >
                                {isSelected && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="h-3 w-3 rounded-full bg-coral"
                                  />
                                )}
                              </span>
                              <span className="font-[var(--font-dm-sans)] text-sm font-medium sm:text-base">
                                {option.label}
                              </span>
                            </motion.label>
                          );
                        }
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex items-center justify-between">
                      <motion.button
                        onClick={handlePrev}
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
                        disabled={!currentSelectedOption}
                        className={`btn-shimmer flex items-center gap-2 rounded-full px-6 py-3 font-[var(--font-headline)] font-bold text-white transition-all duration-300 sm:px-8 ${
                          currentSelectedOption
                            ? 'hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,107,0.4)]'
                            : 'cursor-not-allowed opacity-50'
                        }`}
                        style={{
                          background: currentSelectedOption
                            ? 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)'
                            : '#ccc',
                        }}
                        whileHover={currentSelectedOption ? { scale: 1.02 } : {}}
                        whileTap={currentSelectedOption ? { scale: 0.98 } : {}}
                      >
                        <span>
                          {currentQuestion === questions.length - 1
                            ? 'Ver Resultado'
                            : 'Siguiente'}
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // Results Section
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl"
            >
              {/* Result Header */}
              <div className="mb-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full shadow-xl sm:h-32 sm:w-32"
                  style={{
                    background: result.gradient,
                    boxShadow: `0 20px 50px ${result.shadowColor}`,
                  }}
                >
                  <result.icon
                    className={`h-14 w-14 sm:h-16 sm:w-16 ${levelId === 'nivel_3' ? 'text-white' : 'text-gray-dark'}`}
                  />
                </motion.div>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2 inline-block rounded-full bg-white/80 px-4 py-1 font-[var(--font-dm-sans)] text-sm font-semibold text-gray-dark shadow-md backdrop-blur-sm"
                >
                  {result.subtitle}
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-section-title font-[var(--font-headline)] font-bold text-black-deep"
                >
                  {result.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mx-auto mt-4 max-w-xl text-lg text-gray-carbon"
                >
                  {result.description}
                </motion.p>
              </div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <h3 className="mb-6 text-center font-[var(--font-headline)] text-xl font-bold text-black-deep">
                  Te recomiendo:
                </h3>

                <div
                  className={`grid gap-6 ${
                    result.recommendations.length === 1
                      ? 'md:grid-cols-1'
                      : result.recommendations.length === 2
                        ? 'md:grid-cols-2'
                        : 'md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {/* Show AV recommendation first if flag is set and level is 1 */}
                  {interesAV && result.avRecommendation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ y: -8 }}
                      className="group relative overflow-hidden rounded-[24px] p-6 text-white shadow-xl"
                      style={{
                        background: result.avRecommendation.gradient,
                      }}
                    >
                      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                      <div className="relative">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                          <result.avRecommendation.icon className="h-7 w-7" />
                        </div>
                        <h4 className="mb-2 font-[var(--font-headline)] text-lg font-bold">
                          {result.avRecommendation.name}
                        </h4>
                        <p className="mb-4 text-sm text-white/90">
                          {result.avRecommendation.description}
                        </p>
                        <div className="mb-4 font-[var(--font-headline)] text-2xl font-black">
                          {result.avRecommendation.price}
                        </div>
                        <Link
                          href={result.avRecommendation.href}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-[var(--font-dm-sans)] font-bold text-gray-dark transition-all duration-300 hover:shadow-lg"
                        >
                          <span>Ver Más</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {result.recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className={`group relative overflow-hidden rounded-[24px] p-6 shadow-xl ${
                        rec.priority === 'primary' && !interesAV
                          ? 'text-white'
                          : 'bg-white'
                      }`}
                      style={
                        rec.priority === 'primary' && !interesAV
                          ? { background: rec.gradient }
                          : {}
                      }
                    >
                      {rec.priority === 'primary' && !interesAV && (
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                      )}
                      <div className="relative">
                        <div
                          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                            rec.priority === 'primary' && !interesAV
                              ? 'bg-white/20'
                              : ''
                          }`}
                          style={
                            rec.priority !== 'primary' || interesAV
                              ? { background: rec.gradient }
                              : {}
                          }
                        >
                          <rec.icon
                            className={`h-7 w-7 ${
                              rec.priority === 'primary' && !interesAV
                                ? 'text-white'
                                : 'text-white'
                            }`}
                          />
                        </div>
                        <h4
                          className={`mb-2 font-[var(--font-headline)] text-lg font-bold ${
                            rec.priority === 'primary' && !interesAV
                              ? ''
                              : 'text-black-deep'
                          }`}
                        >
                          {rec.name}
                        </h4>
                        <p
                          className={`mb-4 text-sm ${
                            rec.priority === 'primary' && !interesAV
                              ? 'text-white/90'
                              : 'text-gray-carbon'
                          }`}
                        >
                          {rec.description}
                        </p>
                        <div
                          className={`mb-4 font-[var(--font-headline)] text-2xl font-black ${
                            rec.priority === 'primary' && !interesAV
                              ? ''
                              : 'text-coral'
                          }`}
                        >
                          {rec.price}
                        </div>
                        <Link
                          href={rec.href}
                          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-[var(--font-dm-sans)] font-bold transition-all duration-300 hover:shadow-lg ${
                            rec.priority === 'primary' && !interesAV
                              ? 'bg-white text-gray-dark'
                              : 'text-white'
                          }`}
                          style={
                            rec.priority !== 'primary' || interesAV
                              ? { background: rec.gradient }
                              : {}
                          }
                        >
                          <span>Ver Más</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Secondary CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-gray-dark px-8 py-4 font-[var(--font-headline)] font-bold text-gray-dark transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-white hover:shadow-[0_15px_40px_rgba(255,107,107,0.3)]"
                >
                  <span>Ver todos los productos</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <button
                  onClick={handleRestart}
                  className="mt-4 inline-flex items-center gap-2 font-[var(--font-dm-sans)] text-gray-medium transition-colors hover:text-coral"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Volver a hacer el quiz</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
