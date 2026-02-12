'use client';

import { motion } from 'motion/react';
import {
  Compass,
  Target,
  Rocket,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const etapas = [
  {
    number: 1,
    icon: Compass,
    title: 'Guía Práctica para Iniciar',
    description:
      'Todo lo que necesitas saber para entender el mundo remoto y prepararte para dar el primer paso.',
    items: [
      'Fundamentos del trabajo remoto',
      'Preparación de documentos esenciales',
      'Plataformas reales donde buscar',
    ],
    color: 'bg-coral',
    borderColor: 'border-coral',
  },
  {
    number: 2,
    icon: Target,
    title: 'Define tu Camino + 40 Nichos',
    description:
      'Descubre tu nicho ideal entre más de 40 opciones y define tu camino con claridad.',
    items: [
      'Test de perfil profesional',
      'Catálogo de 40+ nichos remotos',
      'Estrategia de posicionamiento',
    ],
    color: 'bg-lavender',
    borderColor: 'border-lavender',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'Optimización + Entrevistas + Mindset',
    description:
      'Perfecciona tu perfil, prepara tus entrevistas y desarrolla la mentalidad para el éxito remoto.',
    items: [
      'Optimización de CV y portafolio',
      'Simulacro de entrevistas',
      'Mindset del profesional remoto',
    ],
    color: 'bg-mint',
    borderColor: 'border-mint',
  },
];

export default function RutaProductSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">
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

          {etapas.map((etapa, index) => {
            const Icon = etapa.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={etapa.number}
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
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${etapa.color} font-[var(--font-headline)] text-lg font-bold text-white shadow-md`}
                  >
                    {etapa.number}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`md:w-1/2 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <div
                    className={`rounded-2xl border-2 ${etapa.borderColor} bg-white p-6 shadow-sm`}
                  >
                    <div
                      className={`mb-3 flex items-center gap-3 ${
                        isEven ? 'md:justify-end' : ''
                      }`}
                    >
                      {/* Number circle (mobile) */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${etapa.color} font-[var(--font-headline)] text-sm font-bold text-white md:hidden`}
                      >
                        {etapa.number}
                      </div>
                      <div
                        className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl ${etapa.color}/10 md:flex`}
                      >
                        <Icon
                          className={`h-5 w-5`}
                          style={{ color: `var(--${etapa.color.replace('bg-', '')})` }}
                        />
                      </div>
                      <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-dark">
                        Etapa {etapa.number}: {etapa.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-carbon">
                      {etapa.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {etapa.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-center gap-2 text-sm text-gray-dark ${
                            isEven ? 'md:justify-end' : ''
                          }`}
                        >
                          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
          &quot;Todo integrado en un solo sistema, diseñado para avanzar sin
          saltos.&quot;
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
