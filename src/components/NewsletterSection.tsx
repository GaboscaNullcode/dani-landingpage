'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Mail,
  Sparkles,
  ArrowRight,
  Lock,
  User,
  CheckCircle2,
  Check,
  Send,
} from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { name, setName, email, setEmail, isSubmitting, isSuccess, error, handleSubmit } =
    useNewsletterForm('home');

  return (
    <section
      id="newsletter"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-padding) 2rem',
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
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
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
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating icon decorations */}
        <motion.div
          className="absolute left-[8%] top-[18%] flex h-11 w-11 items-center justify-center rounded-full bg-coral/20 opacity-50"
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Mail className="h-5 w-5 text-coral" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[12%] flex h-10 w-10 items-center justify-center rounded-full bg-lavender/30 opacity-40"
          animate={{ y: [8, -8, 8], rotate: [5, -5, 5] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Send className="h-5 w-5 text-lavender" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        {/* Centered header — same pattern as other sections */}
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
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-gray-dark">
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
            className="mx-auto mt-5 max-w-xl"
          >
            <p className="text-lg leading-relaxed text-gray-carbon">
              Regístrate y recibe{' '}
              <span className="font-bold text-coral underline decoration-coral/40 decoration-2 underline-offset-2">
                GRATIS
              </span>{' '}
              la guía &ldquo;Fórmula para un Título Optimizado&rdquo;.
              Ideal para destacar en plataformas freelance y mejorar tu CV.
            </p>
          </motion.div>
        </motion.div>

        {/* Form Card — centered, max-width constrained */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-md"
        >
          <div
            className="relative overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            {/* Decorative corner accents */}
            <div
              className="absolute -right-12 -top-12 h-24 w-24 rounded-full opacity-50"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full opacity-40"
              style={{
                background:
                  'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
              }}
            />

            {/* Form / Success */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center"
              >
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',
                    boxShadow: '0 12px 32px rgba(52, 211, 153, 0.4)',
                  }}
                >
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
                  Listo, {name}!
                </h3>
                <p className="mt-2 text-sm text-gray-medium">
                  Revisa tu inbox. Te enviamos la guía y contenido exclusivo.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-4">
                {/* Name field */}
                <div className="relative">
                  <label htmlFor="newsletter-name" className="sr-only">
                    Tu nombre
                  </label>
                  <motion.div
                    animate={{
                      scale: focusedField === 'name' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="group relative overflow-hidden rounded-xl transition-shadow duration-300"
                      style={{
                        boxShadow:
                          focusedField === 'name'
                            ? '0 0 0 3px rgba(255,107,107,0.2), 0 8px 24px rgba(255,107,107,0.15)'
                            : '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2" aria-hidden="true">
                        <User
                          className={`h-5 w-5 transition-colors duration-300 ${
                            focusedField === 'name' ? 'text-coral' : 'text-gray-medium'
                          }`}
                        />
                      </div>
                      <input
                        id="newsletter-name"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-xl border-2 border-gray-100 bg-white py-3.5 pl-12 pr-5 font-[var(--font-dm-sans)] text-black-deep placeholder-gray-400 transition-colors duration-300 focus:border-coral/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Email field */}
                <div className="relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Tu correo electrónico
                  </label>
                  <motion.div
                    animate={{
                      scale: focusedField === 'email' ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="group relative overflow-hidden rounded-xl transition-shadow duration-300"
                      style={{
                        boxShadow:
                          focusedField === 'email'
                            ? '0 0 0 3px rgba(255,107,107,0.2), 0 8px 24px rgba(255,107,107,0.15)'
                            : '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2" aria-hidden="true">
                        <Mail
                          className={`h-5 w-5 transition-colors duration-300 ${
                            focusedField === 'email' ? 'text-coral' : 'text-gray-medium'
                          }`}
                        />
                      </div>
                      <input
                        id="newsletter-email"
                        type="email"
                        placeholder="Tu mejor correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full rounded-xl border-2 border-gray-100 bg-white py-3.5 pl-12 pr-5 font-[var(--font-dm-sans)] text-black-deep placeholder-gray-400 transition-colors duration-300 focus:border-coral/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                        required
                        autoComplete="email"
                        spellCheck={false}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-shimmer group relative w-full overflow-hidden rounded-full py-4 font-[var(--font-headline)] text-base font-bold text-white transition-[transform,box-shadow] duration-500 disabled:opacity-70"
                  style={{
                    background: 'var(--gradient-coral-pink)',
                    boxShadow: '0 10px 30px rgba(255, 107, 107, 0.35)',
                  }}
                  whileHover={{
                    y: -3,
                    boxShadow: '0 18px 48px rgba(255, 107, 107, 0.45)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Sparkles className="h-5 w-5" />
                        </motion.span>
                        Enviando&hellip;
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Unirme a la newsletter</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Error display */}
                {error && (
                  <p className="text-center text-sm font-medium text-red-500">
                    {error}
                  </p>
                )}

                {/* Trust indicators */}
                <div className="flex flex-col items-center gap-2 pt-1">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-gray-medium">
                      <Lock className="h-3.5 w-3.5" />
                      <span>100% seguro</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                      <span>Sin spam</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                      <span>Cancela cuando quieras</span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
