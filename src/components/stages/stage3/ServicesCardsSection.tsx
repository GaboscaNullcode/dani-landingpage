'use client';

import { motion } from 'motion/react';
import { Clock, Check, X } from 'lucide-react';

interface ServiceFeature {
  text: string;
  included: boolean;
}

interface ServiceCard {
  name: string;
  duration: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  features: ServiceFeature[];
  price?: string;
  ctaText: string;
  highlight?: boolean;
}

const services: ServiceCard[] = [
  {
    name: 'Consultoría',
    duration: '45 min',
    description:
      'Revisión rápida + preguntas puntuales. Te llevas tarea a casa y un reporte.',
    features: [
      { text: 'Consultoría de revisión', included: true },
      { text: 'Preguntas puntuales', included: true },
      { text: 'Reporte post-sesión', included: true },
      { text: 'Sin revisión posterior', included: false },
      { text: 'Sin comunidad privada', included: false },
    ],
    ctaText: 'Agendar consultoría',
  },
  {
    name: 'Asesoría',
    duration: '90 min',
    badge: 'RECOMENDADO',
    badgeColor: 'bg-coral text-white',
    description:
      'Sesión profunda con reporte + revisión + comunidad.',
    features: [
      { text: 'Asesoría completa', included: true },
      { text: 'Reporte post-sesión', included: true },
      { text: '1 revisión incluida', included: true },
      { text: 'Acceso a Comunidad Privada', included: true },
    ],
    ctaText: 'Agendar asesoría',
    highlight: true,
  },
  {
    name: 'Programa Intensivo',
    duration: '2 horas',
    badge: 'PREMIUM',
    badgeColor: 'bg-lavender text-white',
    description:
      'El paquete más completo: teoría + asesoría + revisión + comunidad.',
    features: [
      { text: 'Programa intensivo', included: true },
      { text: 'Asesoría personalizada', included: true },
      { text: 'Reporte post-sesión', included: true },
      { text: '2 revisiones incluidas', included: true },
      { text: 'Acceso a Comunidad Privada', included: true },
    ],
    ctaText: 'Agendar programa',
  },
];

export default function ServicesCardsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-gray-dark">
            Elige el servicio que mejor se adapte a ti
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-carbon">
            Todos los servicios incluyen sesión en vivo conmigo. Los pagos se
            procesan de forma segura con Stripe.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ${
                service.highlight
                  ? 'ring-2 ring-coral shadow-[0_8px_30px_rgba(255,107,107,0.15)]'
                  : 'border border-gray-light/50'
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full ${service.badgeColor} px-4 py-1 text-xs font-bold`}
                >
                  {service.badge}
                </span>
              )}

              {/* Header */}
              <h3 className="mt-2 font-[var(--font-headline)] text-2xl font-bold text-gray-dark">
                {service.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-gray-carbon">
                <Clock className="h-4 w-4 text-coral" />
                <span className="text-sm font-medium">{service.duration}</span>
              </div>
              <p className="mt-4 text-sm text-gray-carbon">
                {service.description}
              </p>

              {/* Features */}
              <ul className="mt-6 flex-1 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-start gap-3 text-sm"
                  >
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-light" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-gray-dark'
                          : 'text-gray-light'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="/asesorias#planes"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-8 block rounded-full py-4 text-center font-[var(--font-headline)] font-bold transition-shadow duration-300 ${
                  service.highlight
                    ? 'btn-shimmer text-white'
                    : 'border-2 border-coral text-coral hover:bg-coral hover:text-white'
                }`}
                style={
                  service.highlight
                    ? { background: 'var(--gradient-coral-pink)' }
                    : undefined
                }
              >
                {service.ctaText}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
