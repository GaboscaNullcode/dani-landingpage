'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Mail, ArrowRight, Check } from 'lucide-react';

export default function NewsletterStageSection() {
  const [guideEmail, setGuideEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [guideConsent, setGuideConsent] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [guideSubmitted, setGuideSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleGuideSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!guideEmail || !guideConsent) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: guideEmail }),
      });
      setGuideSubmitted(true);
    } catch {
      // silently fail
    }
  };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setNewsletterSubmitted(true);
    } catch {
      // silently fail
    }
  };

  return (
    <section id="newsletter" className="bg-white py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-gray-dark">
            Recibe contenido directo en tu email
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Guide card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-light/50 bg-cream p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-coral text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-[var(--font-headline)] text-xl font-bold text-gray-dark">
              Guia gratuita
            </h3>
            <p className="mt-2 text-sm text-gray-carbon">
              Descarga la guia completa para dar tu primer paso en el trabajo
              remoto. Recibela directamente en tu email.
            </p>

            {guideSubmitted ? (
              <div className="mt-6 flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                <span className="font-medium">Revisa tu email</span>
              </div>
            ) : (
              <form onSubmit={handleGuideSubmit} className="mt-6 space-y-3">
                <input
                  type="email"
                  value={guideEmail}
                  onChange={(e) => setGuideEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full rounded-xl border border-gray-light bg-white px-4 py-3 text-sm text-gray-dark outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-coral"
                />
                <label className="flex items-start gap-2 text-xs text-gray-carbon">
                  <input
                    type="checkbox"
                    checked={guideConsent}
                    onChange={(e) => setGuideConsent(e.target.checked)}
                    className="mt-0.5 accent-coral"
                    required
                  />
                  Acepto recibir la guia y comunicaciones por email
                </label>
                <button
                  type="submit"
                  className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-[var(--font-headline)] text-sm font-bold text-white"
                  style={{ background: 'var(--gradient-coral-pink)' }}
                >
                  Descargar Guia
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Newsletter card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-gray-light/50 bg-cream p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lavender text-white">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-[var(--font-headline)] text-xl font-bold text-gray-dark">
              Newsletter semanal
            </h3>
            <p className="mt-2 text-sm text-gray-carbon">
              Cada semana recibe tips, ofertas laborales y contenido exclusivo
              sobre trabajo remoto directo en tu bandeja de entrada.
            </p>

            {newsletterSubmitted ? (
              <div className="mt-6 flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                <span className="font-medium">Te has suscrito correctamente</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mt-6 space-y-3"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full rounded-xl border border-gray-light bg-white px-4 py-3 text-sm text-gray-dark outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-coral"
                />
                <label className="flex items-start gap-2 text-xs text-gray-carbon">
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    className="mt-0.5 accent-coral"
                    required
                  />
                  Acepto recibir la newsletter y comunicaciones por email
                </label>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-coral px-6 py-3 font-[var(--font-headline)] text-sm font-bold text-coral transition-colors duration-300 hover:bg-coral hover:text-white"
                >
                  Suscribirme
                  <Mail className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
