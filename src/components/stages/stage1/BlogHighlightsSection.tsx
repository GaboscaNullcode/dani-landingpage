'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Brain, Globe, Wrench } from 'lucide-react';

const blogCards = [
  {
    icon: Brain,
    category: 'Mindset',
    title: 'La mentalidad que necesitas para trabajar remoto',
    description:
      'Descubre los cambios mentales clave para prosperar trabajando desde cualquier lugar.',
    href: '/blog',
    color: 'bg-lavender',
    colorLight: 'bg-lavender/10',
  },
  {
    icon: Globe,
    category: 'Plataformas',
    title: 'Donde encontrar trabajo remoto real',
    description:
      'Las mejores plataformas y sitios web para encontrar ofertas de trabajo remoto.',
    href: '/blog',
    color: 'bg-coral',
    colorLight: 'bg-coral/10',
  },
  {
    icon: Wrench,
    category: 'Herramientas',
    title: 'Las herramientas esenciales para empezar',
    description:
      'Todo lo que necesitas configurar antes de aplicar a tu primer trabajo remoto.',
    href: '/blog',
    color: 'bg-mint',
    colorLight: 'bg-mint/10',
  },
];

export default function BlogHighlightsSection() {
  return (
    <section id="blog" className="bg-white py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-gray-dark">
            Artículos destacados
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-carbon">
            Lee los artículos que te van a ayudar a entender mejor el mundo
            remoto y dar tus primeros pasos.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blogCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={card.href}
                  className="group block h-full rounded-2xl border border-gray-light/50 bg-white p-6 transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.color} text-white`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`rounded-full ${card.colorLight} px-3 py-1 text-xs font-bold text-gray-dark`}
                    >
                      {card.category}
                    </span>
                  </div>

                  <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-dark transition-colors duration-300 group-hover:text-coral">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-carbon">
                    {card.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-coral">
                    Leer artículo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-[var(--font-headline)] font-bold text-coral transition-colors duration-300 hover:text-pink"
          >
            Ver todos los artículos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
