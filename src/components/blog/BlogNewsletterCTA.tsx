'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';

export default function BlogNewsletterCTA() {
  const { name, setName, email, setEmail, isSubmitting, isSuccess, error, handleSubmit } =
    useNewsletterForm('blog');

  return (
    <section className="py-16">
      <div className="container-custom mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 50%, #a78bfa 100%)',
          }}
        >
          {/* Decorative elements */}
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
          />

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 py-4 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-[var(--font-headline)] text-2xl font-bold text-white">
                  Listo, {name}!
                </h3>
                <p className="mt-2 text-white/80">
                  Revisa tu inbox. Te enviamos la guia gratuita.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <div className="mb-6 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-white/80" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                    Newsletter gratuito
                  </span>
                </div>

                <h3 className="mb-3 font-[var(--font-headline)] text-2xl font-bold text-white md:text-3xl">
                  Descarga la guia gratuita
                </h3>
                <p className="mb-8 max-w-lg text-white/80">
                  Recibe la &ldquo;Formula para un Titulo Optimizado&rdquo; + tips
                  semanales para tu carrera remota.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 sm:flex-row sm:items-start"
                >
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-white/20 bg-white/15 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-colors focus:border-white/50 focus:outline-none sm:w-auto sm:flex-1"
                  />
                  <input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-white/20 bg-white/15 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-colors focus:border-white/50 focus:outline-none sm:w-auto sm:flex-1"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-[var(--font-headline)] font-bold text-coral transition-all hover:bg-white/90 disabled:opacity-70 sm:w-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Suscribirme
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {error && (
                  <p className="mt-3 text-sm font-medium text-white/90">
                    {error}
                  </p>
                )}

                <p className="mt-4 text-xs text-white/50">
                  Sin spam. Cancela cuando quieras.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
