'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, Check } from 'lucide-react';

// ---------- Types ----------
interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (stage: number) => void; // 1, 2, or 3
}

interface QuizOption {
  id: string;
  label: string;
}

interface StageQuestion {
  question: string;
  options: QuizOption[];
}

// ---------- Data ----------
const questions: StageQuestion[] = [
  {
    question: '¿En qué punto estás hoy?',
    options: [
      { id: 'q1_a', label: 'Solo estoy explorando opciones' },
      { id: 'q1_b', label: 'Ya decidí, pero estoy confundid@ / abrumad@' },
      { id: 'q1_c', label: 'Ya decidí y quiero pasar a la acción YA!' },
    ],
  },
  {
    question: '¿Qué es lo que más te frena ahora mismo?',
    options: [
      { id: 'q2_a', label: 'No sé si esto es para mí' },
      { id: 'q2_b', label: 'No sé por dónde empezar, ni qué hacer primero' },
      { id: 'q2_c', label: 'Mi CV / perfil / postulaciones no están listos...' },
      { id: 'q2_d', label: 'Me falta estrategia para conseguir entrevistas/clientes' },
    ],
  },
  {
    question: '¿Has intentado postular o buscar trabajo remoto antes?',
    options: [
      { id: 'q3_a', label: 'No, todavía no' },
      { id: 'q3_b', label: 'Sí, pero de forma irregular' },
      { id: 'q3_c', label: 'Sí, con frecuencia, pero sin resultados claros' },
    ],
  },
  {
    question: '¿Qué necesitas más en este momento?',
    options: [
      { id: 'q4_a', label: 'Información clara sin presión' },
      { id: 'q4_b', label: 'Un mapa paso a paso y orden mental' },
      { id: 'q4_c', label: 'Acompañamiento directo y feedback personalizado' },
    ],
  },
  {
    question: '¿Qué nivel de apoyo prefieres para avanzar?',
    options: [
      { id: 'q5_a', label: 'Ir a mi ritmo con recursos gratuitos' },
      { id: 'q5_b', label: 'Seguir una ruta estructurada (guía/curso)' },
      { id: 'q5_c', label: 'Ir con acompañamiento 1:1 o programa intensivo' },
    ],
  },
];

const TOTAL = questions.length;

// ---------- Helpers ----------
// Misma lógica de reglas que QuizSection — prioridad: acción > confundido > explorando
function getResult(answers: (string | null)[]): number {
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

  // Prioridad 1: "List@ para la acción" → stage 3
  if (
    q1 === 'c' ||
    q2 === 'c' ||
    q2 === 'd' ||
    q3 === 'c' ||
    q4 === 'c' ||
    q5 === 'c'
  ) {
    return 3;
  }

  // Prioridad 2: "Confundid@" → stage 2
  if (q1 === 'b' || q2 === 'b' || q4 === 'b' || q5 === 'b') {
    return 2;
  }

  // Prioridad 3: "Explorando" → stage 1
  return 1;
}

// ---------- Slide variants ----------
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// ---------- Component ----------
export default function QuizModal({ isOpen, onClose, onResult }: QuizModalProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Focus close button on open (sin scroll)
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      });

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);

        // Restore focus sin scroll
        if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus({ preventScroll: true });
        }
      };
    }
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setCurrentQ(0);
      setAnswers([]);
      setDirection(1);
      setSelectedOption(null);
    }
  }, [isOpen]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusable = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, a[href]'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus({ preventScroll: true });
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus({ preventScroll: true });
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleOptionSelect = (optionId: string, optionIndex: number) => {
    if (selectedOption !== null) return; // prevent double-click
    setSelectedOption(optionIndex);

    const newAnswers = [...answers];
    newAnswers[currentQ] = optionId;
    setAnswers(newAnswers);

    // Auto-advance after 400ms
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ < TOTAL - 1) {
        setDirection(1);
        setCurrentQ((prev) => prev + 1);
      } else {
        // Última pregunta: calcular resultado, cerrar modal e informar al padre
        const resultStage = getResult(newAnswers);
        onResult(resultStage);
        onClose();
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentQ === 0) return;
    setSelectedOption(null);
    setDirection(-1);
    setCurrentQ((prev) => prev - 1);
  };

  if (!isOpen) return null;

  const progress = ((currentQ + 1) / TOTAL) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Quiz: descubre tu etapa"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-[520px] overflow-hidden rounded-2xl bg-white p-5 shadow-2xl sm:p-8"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              aria-label="Cerrar quiz"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-[var(--font-dm-sans)] text-sm font-medium text-gray-500">
                  Pregunta {currentQ + 1} de {TOTAL}
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-valuenow={currentQ + 1}
                aria-valuemin={1}
                aria-valuemax={TOTAL}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: '#E8466A' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Content area */}
            <div className="min-h-[320px] sm:min-h-[360px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`q-${currentQ}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Question */}
                  <h2 className="mb-6 pr-6 font-[var(--font-headline)] text-xl font-bold text-black-deep sm:text-2xl">
                    {questions[currentQ].question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentQ].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const wasAnswered =
                        answers[currentQ] === option.id &&
                        selectedOption === null;

                      return (
                        <motion.button
                          key={`${currentQ}-${idx}`}
                          onClick={() =>
                            handleOptionSelect(option.id, idx)
                          }
                          disabled={selectedOption !== null}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08, duration: 0.3 }}
                          className={`group flex w-full items-center gap-3 rounded-xl p-4 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none ${
                            isSelected
                              ? 'bg-gradient-to-r from-coral to-pink text-white shadow-lg shadow-coral/20'
                              : wasAnswered
                                ? 'bg-coral/10 text-black-deep ring-2 ring-coral/30'
                                : 'bg-cream/80 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {/* Letter indicator */}
                          <span
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-[var(--font-headline)] text-sm font-bold transition-colors ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : wasAnswered
                                  ? 'bg-coral/20 text-coral'
                                  : 'bg-white text-gray-400 group-hover:text-gray-600'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>

                          {/* Label */}
                          <span className="flex-1 font-[var(--font-dm-sans)] text-sm font-medium sm:text-base">
                            {option.label}
                          </span>

                          {/* Check icon */}
                          {(isSelected || wasAnswered) && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 25,
                              }}
                              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                                isSelected ? 'bg-white/20' : 'bg-coral/20'
                              }`}
                            >
                              <Check
                                className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-coral'}`}
                              />
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Back button */}
                  {currentQ > 0 && (
                    <motion.button
                      onClick={handleBack}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-5 flex items-center gap-1.5 font-[var(--font-dm-sans)] text-sm font-medium text-gray-400 transition-colors hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Atrás
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
