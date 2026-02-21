'use client';

import { motion } from 'motion/react';
import {
  Compass,
  Target,
  Rocket,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface Paso {
  number: number;
  icon: typeof Compass;
  color: string;
  borderColor: string;
  title: string;
  description: string;
  label: string;
  products: string[];
  extra: string | null;
  closing: string | null;
}

const pasos: Paso[] = [
  {
    number: 1,
    icon: Compass,
    color: 'bg-coral',
    borderColor: 'border-coral',
    title: 'Entiende el mundo remoto',
    description:
      'Primero construyes base. Aprendes cómo funciona el trabajo remoto, dónde buscar y qué necesitas preparar antes de postular. Aquí dejas de sentir que todo es desconocido.',
    label: 'Aquí lees y trabajas:',
    products: [
      'Guía Práctica para el mundo del Trabajo Remoto',
      'Primeros Pasos como Asistente Virtual',
    ],
    extra: null,
    closing: null,
  },
  {
    number: 2,
    icon: Target,
    color: 'bg-lavender',
    borderColor: 'border-lavender',
    title: 'Define tu camino profesional',
    description:
      'Ahora necesitas dirección. Descubres tus fortalezas, exploras roles reales y eliges un enfoque claro.',
    label: 'Aquí trabajas:',
    products: ['Define tu Camino Remoto', '40 Nichos de Trabajo Remoto'],
    extra: null,
    closing: 'Aquí dejas de estar confundid@.',
  },
  {
    number: 3,
    icon: Rocket,
    color: 'bg-mint',
    borderColor: 'border-mint',
    title: 'Construye tu perfil profesional',
    description: 'Con dirección clara, toca prepararte.',
    label: 'Aquí desarrollas:',
    products: ['Optimiza tu Perfil Profesional y Postula con Éxito'],
    extra:
      'Aprendes a crear un CV estratégico y presentarte con profesionalismo.',
    closing: 'Aquí empiezas a verte list@.',
  },
  {
    number: 4,
    icon: Shield,
    color: 'bg-gray-dark',
    borderColor: 'border-gray-dark',
    title: 'Postula con seguridad y mentalidad correcta',
    description:
      'El último paso es acción + confianza. Practicas entrevistas, fortaleces tu seguridad y desarrollas constancia.',
    label: 'Aquí trabajas:',
    products: [
      'Ejercicios prácticos para postulación y entrevista',
      'El Mindset Correcto',
    ],
    extra: null,
    closing: 'Aquí dejas de dudar y empiezas a actuar.',
  },
];

export default function RutaProductSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="rounded-full bg-peach px-4 py-1.5 text-sm font-bold text-coral">
            PRODUCTO ESTRELLA
          </span>
          <h2 className="text-section-title mt-4 font-[var(--font-headline)] font-bold text-gray-dark">
            Ruta Paso a Paso{' '}
            <span className="gradient-text">Remota</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-carbon">
            Un programa completo con 3 etapas que te lleva de la curiosidad al
            trabajo remoto real. Sin saltos, sin confusión, todo en un solo
            sistema.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-6 top-0 hidden w-0.5 bg-gray-light md:left-1/2 md:block md:-translate-x-0.5" />

          {pasos.map((paso, index) => {
            const Icon = paso.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={paso.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative mb-12 last:mb-0 md:flex ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number circle (desktop center) */}
                <div className="absolute left-6 top-0 z-10 hidden -translate-x-1/2 md:left-1/2 md:block">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${paso.color} font-[var(--font-headline)] text-lg font-bold text-white shadow-md`}
                  >
                    {paso.number}
                  </div>
                </div>

                {/* Card with PASO content */}
                <div
                  className={`md:w-1/2 ${
                    isEven ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div
                    className={`rounded-2xl border-2 ${paso.borderColor} bg-white p-6 shadow-sm`}
                  >
                    {/* Mobile number circle + title */}
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${paso.color} font-[var(--font-headline)] text-sm font-bold text-white md:hidden`}
                      >
                        {paso.number}
                      </div>
                      <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-dark">
                        {paso.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-carbon">
                      {paso.description}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-gray-dark">
                      {paso.label}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {paso.products.map((product) => (
                        <li
                          key={product}
                          className="flex items-start gap-2 text-sm text-gray-dark"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span>{product}</span>
                        </li>
                      ))}
                    </ul>

                    {paso.extra && (
                      <p className="mt-3 text-sm text-gray-carbon">
                        {paso.extra}
                      </p>
                    )}

                    {paso.closing && (
                      <p className="mt-4 font-[var(--font-headline)] text-sm font-medium text-gray-dark italic">
                        {paso.closing}
                      </p>
                    )}
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>

        {/* Closing phrase */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-xl text-center font-[var(--font-headline)] text-lg font-medium text-gray-carbon italic"
        >
          &quot;No es teoría suelta. Es un recorrido claro para que avances
          sin perderte.&quot;
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <a
            href="/tienda/curso-paso-a-paso"
            className="btn-shimmer inline-flex items-center gap-3 rounded-full px-10 py-5 font-[var(--font-headline)] text-lg font-bold text-white"
            style={{ background: 'var(--gradient-coral-pink)' }}
          >
            Quiero la ruta completa
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
