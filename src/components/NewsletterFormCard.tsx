'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Sparkles,
  ArrowRight,
  Lock,
  User,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';

interface NewsletterFormCardProps {
  source?: 'home' | 'newsletter_page' | 'blog' | 'quiz';
}

const cornerAccentTopRight = {
  background: 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)',
} as const;

const cornerAccentBottomLeft = {
  background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
} as const;

export default function NewsletterFormCard({ source = 'home' }: NewsletterFormCardProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const { name, setName, email, setEmail, isSubmitting, isSuccess, error, handleSubmit } =
    useNewsletterForm(source);

  return (
    <div
      className="relative rounded-[28px] bg-white p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* Decorative corner accents */}
      <div
        className="absolute right-4 top-4 h-24 w-24 rounded-full opacity-50"
        style={cornerAccentTopRight}
      />
      <div
        className="absolute bottom-4 left-4 h-20 w-20 rounded-full opacity-40"
        style={cornerAccentBottomLeft}
      />

      {/* Card header */}
      <div className="relative mb-5 text-center">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-coral/10">
          <Mail className="h-5 w-5 text-coral" />
        </div>
        <h3 className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
          Contenido exclusivo cada semana
        </h3>
        <p className="mt-1 text-base leading-relaxed text-gray-medium">
          Recibe{' '}
          <span className="font-semibold text-coral">GRATIS</span> la guía
          &ldquo;Fórmula para un Título Optimizado&rdquo;.
        </p>
      </div>

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
            <label htmlFor={`newsletter-name-${source}`} className="sr-only">
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
                suppressHydrationWarning
              >
                <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2" aria-hidden="true">
                  <User
                    className={`h-5 w-5 transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-coral' : 'text-gray-medium'
                    }`}
                  />
                </div>
                <input
                  id={`newsletter-name-${source}`}
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border-2 border-gray-100 bg-white py-3.5 pl-12 pr-5 font-[var(--font-inter)] text-black-deep placeholder-gray-400 transition-colors duration-300 focus:border-coral/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                  required
                  autoComplete="name"
                  data-lpignore="true"
                  data-1p-ignore
                />
              </div>
            </motion.div>
          </div>

          {/* Email field */}
          <div className="relative">
            <label htmlFor={`newsletter-email-${source}`} className="sr-only">
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
                suppressHydrationWarning
              >
                <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2" aria-hidden="true">
                  <Mail
                    className={`h-5 w-5 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-coral' : 'text-gray-medium'
                    }`}
                  />
                </div>
                <input
                  id={`newsletter-email-${source}`}
                  type="email"
                  placeholder="Tu mejor correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border-2 border-gray-100 bg-white py-3.5 pl-12 pr-5 font-[var(--font-inter)] text-black-deep placeholder-gray-400 transition-colors duration-300 focus:border-coral/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  data-lpignore="true"
                  data-1p-ignore
                />
              </div>
            </motion.div>
          </div>

          {/* Consent checkbox */}
          <label className="flex cursor-pointer items-start gap-3 pt-1">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-coral"
            />
            <span className="text-sm leading-snug text-gray-carbon">
              Acepto recibir correos y puedo cancelar cuando quiera.
            </span>
          </label>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !accepted}
            className="btn-shimmer group relative w-full overflow-hidden rounded-full py-4 font-[var(--font-headline)] text-base font-bold text-white transition-[transform,box-shadow] duration-500 disabled:cursor-not-allowed disabled:opacity-70"
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
  );
}
