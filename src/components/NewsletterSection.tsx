'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Mail,
  Sparkles,
  ArrowRight,
  Gift,
  Lock,
  User,
  CheckCircle2,
  Star,
  Zap,
  BookOpen,
  Check,
} from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { name, setName, email, setEmail, isSubmitting, isSuccess, error, handleSubmit } =
    useNewsletterForm('home');

  const benefits = [
    { icon: BookOpen, text: 'Plantilla paso a paso para tu título' },
    { icon: Star, text: 'Ejemplos reales de títulos exitosos' },
    { icon: Zap, text: 'Bonus: Checklist de optimización' },
  ];

  return (
    <section
      id="newsletter"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(4rem, 10vw, 8rem) 1.5rem',
        background: 'linear-gradient(180deg, #fef7f0 0%, #fce4ec 50%, #f8e1f4 100%)',
      }}
    >
      {/* Sophisticated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large gradient orb - top left */}
        <motion.div
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, rgba(255,107,107,0.4) 0%, rgba(224,86,160,0.2) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Medium orb - bottom right */}
        <motion.div
          className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(224,86,160,0.2) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating decorative shapes */}
        <motion.div
          className="absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-coral"
          animate={{ y: [-10, 10, -10], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[15%] top-[25%] h-2 w-2 rounded-full bg-pink"
          animate={{ y: [8, -8, 8], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[20%] h-4 w-4 rounded-full bg-lavender/50"
          animate={{ y: [-12, 12, -12], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Geometric accent lines */}
        <svg
          className="absolute right-[5%] top-[30%] h-32 w-32 opacity-20"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            strokeDasharray="8 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="100%" stopColor="#e056a0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-custom relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left side - Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2"
            >
              <span
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                  boxShadow: '0 8px 32px rgba(255,107,107,0.35)',
                }}
              >
                <Gift className="h-4 w-4" />
                GRATIS
              </span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-5 w-5 text-sunshine" />
              </motion.span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-4 font-[var(--font-headline)] text-3xl font-bold leading-tight text-black-deep md:text-4xl lg:text-[2.75rem]"
            >
              Descarga la guía{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                &ldquo;Fórmula para un Título Optimizado&rdquo;
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #ff6b6b 0%, #e056a0 100%)',
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 text-lg text-gray-carbon md:text-xl"
            >
              Y únete a <span className="font-semibold text-coral">+2,500 profesionales</span> que
              reciben contenido exclusivo cada semana
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,107,107,0.15) 0%, rgba(224,86,160,0.15) 100%)',
                    }}
                  >
                    <benefit.icon className="h-5 w-5 text-coral" />
                  </span>
                  <span className="font-medium text-gray-dark">{benefit.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right side - Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: `
                  0 4px 6px rgba(0, 0, 0, 0.02),
                  0 12px 24px rgba(224, 86, 160, 0.08),
                  0 24px 48px rgba(255, 107, 107, 0.1),
                  inset 0 1px 1px rgba(255, 255, 255, 0.8)
                `,
              }}
            >
              {/* Decorative corner accent */}
              <div
                className="absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-60"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full opacity-40"
                style={{
                  background:
                    'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
                }}
              />

              {/* Form header */}
              <div className="relative mb-8 text-center">
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                    boxShadow: '0 12px 32px rgba(255, 107, 107, 0.4)',
                  }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Mail className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
                  Recibe tu guía gratis
                </h3>
                <p className="mt-2 text-sm text-gray-medium">
                  Solo ingresa tus datos y la enviaremos a tu inbox
                </p>
              </div>

              {/* Form / Success */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
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
                    Revisa tu inbox. Te enviamos la guia y contenido exclusivo.
                  </p>
                </motion.div>
              ) : (
              <form onSubmit={handleSubmit} className="relative space-y-5">
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
                      className="group relative overflow-hidden rounded-2xl transition-all duration-300"
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
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full border-2 border-transparent bg-white py-4 pl-12 pr-5 font-[var(--font-dm-sans)] text-black-deep placeholder-gray-medium transition-all duration-300 focus:border-coral/30 focus:outline-none"
                        style={{
                          background:
                            focusedField === 'name'
                              ? 'linear-gradient(to right, rgba(255,255,255,1), rgba(254,247,240,1))'
                              : '#ffffff',
                        }}
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
                      className="group relative overflow-hidden rounded-2xl transition-all duration-300"
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
                        className="w-full border-2 border-transparent bg-white py-4 pl-12 pr-5 font-[var(--font-dm-sans)] text-black-deep placeholder-gray-medium transition-all duration-300 focus:border-coral/30 focus:outline-none"
                        style={{
                          background:
                            focusedField === 'email'
                              ? 'linear-gradient(to right, rgba(255,255,255,1), rgba(254,247,240,1))'
                              : '#ffffff',
                        }}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-2xl py-4 font-[var(--font-headline)] text-base font-bold text-white transition-all duration-500 disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 50%, #d64c94 100%)',
                    boxShadow: '0 12px 36px rgba(255, 107, 107, 0.35)',
                  }}
                  whileHover={{
                    y: -3,
                    boxShadow: '0 18px 48px rgba(255, 107, 107, 0.45)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

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
                        Enviando...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Quiero mi guía gratis</span>
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
                <div className="flex flex-col items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-medium">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Tu información está 100% segura</span>
                  </div>
                  <div className="flex items-center gap-4">
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
        </motion.div>
      </div>
    </section>
  );
}
