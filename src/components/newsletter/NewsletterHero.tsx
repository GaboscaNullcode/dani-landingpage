'use client';

import { motion } from 'motion/react';
import { Mail, Gift, Check, Sparkles, BookOpen, Video, Users, ArrowRight } from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';

const benefits = [
  {
    icon: BookOpen,
    title: 'Guía GRATIS',
    description: 'Fórmula para un Título Optimizado que atraiga clientes',
  },
  {
    icon: Video,
    title: 'Masterclass de 2 horas',
    description: 'Acceso inmediato a contenido exclusivo sobre trabajo remoto',
  },
  {
    icon: Mail,
    title: 'Tips semanales',
    description: 'Estrategias y consejos directo en tu bandeja de entrada',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conecta con otros que están en el mismo camino',
  },
];

export default function NewsletterHero() {
  const { name, setName, email, setEmail, isSubmitting, isSuccess, error, handleSubmit } =
    useNewsletterForm('newsletter_page');

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen overflow-hidden pt-32 pb-20"
        style={{
          background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
        }}
      >
        {/* Decorative blobs */}
        <motion.div
          className="blob absolute -right-40 -top-40 h-[600px] w-[600px] opacity-25"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="blob absolute -left-40 bottom-20 h-[400px] w-[400px] opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm">
                  <Gift className="h-4 w-4 text-coral" />
                  <span className="text-sm font-semibold text-gray-dark">
                    Recursos Gratuitos
                  </span>
                </div>

                <h1 className="text-hero-title mb-6 font-[var(--font-headline)] font-bold text-gray-dark">
                  Recibe tu <span className="gradient-text">Guía Gratuita</span>
                </h1>

                <p className="text-body-large mb-8 text-gray-carbon">
                  Descarga la <strong>Fórmula para un Título Optimizado</strong> que te ayudará
                  a destacar en plataformas de trabajo remoto y atraer más clientes.
                </p>

                {/* What you get */}
                <div className="mb-8 space-y-4">
                  {[
                    'Guía descargable en PDF',
                    'Acceso a la masterclass de 2 horas',
                    'Tips semanales exclusivos',
                    'Comunidad de apoyo',
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-coral">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-dark">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                  {!isSuccess ? (
                    <>
                      <div className="mb-6 text-center">
                        <div
                          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                          style={{
                            background: 'var(--gradient-coral-pink)',
                          }}
                        >
                          <Mail className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="mb-2 font-[var(--font-headline)] text-2xl font-bold text-gray-dark">
                          Únete a la comunidad
                        </h2>
                        <p className="text-sm text-gray-medium">
                          Más de 5,000 personas ya reciben mis tips
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-dark">
                            Tu nombre
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="¿Cómo te llamas?"
                            className="w-full rounded-xl border border-gray-light px-4 py-3 text-gray-dark transition-all focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-dark">
                            Tu email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tu@email.com"
                            className="w-full rounded-xl border border-gray-light px-4 py-3 text-gray-dark transition-all focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-xl py-4 font-[var(--font-headline)] font-bold text-white transition-all hover:-translate-y-1 disabled:opacity-70"
                          style={{
                            background: 'var(--gradient-coral-pink)',
                          }}
                        >
                          {isSubmitting ? (
                            <span>Enviando...</span>
                          ) : (
                            <>
                              <span>Quiero mi guía gratis</span>
                              <ArrowRight className="h-5 w-5" />
                            </>
                          )}
                        </button>

                        {error && (
                          <p className="text-center text-sm font-medium text-red-500">
                            {error}
                          </p>
                        )}

                        <p className="text-center text-xs text-gray-medium">
                          Al suscribirte aceptas recibir emails de Remote con Dani.
                          Puedes darte de baja en cualquier momento.
                        </p>
                      </form>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center"
                    >
                      <div
                        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',
                        }}
                      >
                        <Check className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="mb-3 font-[var(--font-headline)] text-2xl font-bold text-gray-dark">
                        ¡Listo, {name}!
                      </h3>
                      <p className="mb-6 text-gray-carbon">
                        Revisa tu bandeja de entrada. Te envié la guía y el acceso
                        a la masterclass gratuita.
                      </p>
                      <p className="text-sm text-gray-medium">
                        ¿No lo ves? Revisa tu carpeta de spam.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,125.67,82.39,321.39,56.44Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
              <Sparkles className="h-4 w-4" />
              Lo que recibirás
            </span>
            <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
              Todo Esto es Gratis
            </h2>
            <p className="text-lg text-gray-carbon">
              Al unirte a la comunidad tendrás acceso a estos recursos sin costo.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-start gap-4 rounded-2xl border border-gray-light bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coral/20 hover:shadow-[0_10px_40px_rgba(255,107,107,0.1)]"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'var(--gradient-coral-pink)',
                    }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-[var(--font-headline)] font-bold text-gray-dark">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-carbon">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
