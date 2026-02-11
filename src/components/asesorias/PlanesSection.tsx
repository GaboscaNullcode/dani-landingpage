'use client';

import { motion } from 'motion/react';
import { Check, Star, Clock, Sparkles } from 'lucide-react';
import { planes } from '@/data/asesorias-data';

export default function PlanesSection() {
  return (
    <section id="planes" className="relative py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
            <Sparkles className="h-4 w-4" />
            Elige tu plan
          </span>
          <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
            Planes de Asesoría
          </h2>
          <p className="text-lg text-gray-carbon">
            Dos opciones diseñadas para diferentes etapas de tu camino hacia el trabajo remoto.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {planes.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.isPopular
                  ? 'bg-gradient-to-br from-gray-dark to-black-deep text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]'
                  : 'bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-light'
              }`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full bg-coral px-3 py-1">
                  <Star className="h-3.5 w-3.5 fill-white text-white" />
                  <span className="text-xs font-bold uppercase tracking-wide">Más Popular</span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <p className={`mb-2 text-sm font-medium ${plan.isPopular ? 'text-gray-300' : 'text-gray-medium'}`}>
                  {plan.subtitle}
                </p>
                <h3 className={`text-2xl font-[var(--font-headline)] font-bold ${plan.isPopular ? 'text-white' : 'text-gray-dark'}`}>
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-2">
                <span className={`text-5xl font-[var(--font-headline)] font-bold ${plan.isPopular ? 'text-white' : 'text-gray-dark'}`}>
                  ${plan.price}
                </span>
                <span className={plan.isPopular ? 'text-gray-300' : 'text-gray-medium'}>USD</span>
              </div>

              {/* Duration */}
              <div className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 ${
                plan.isPopular ? 'bg-white/10' : 'bg-cream'
              }`}>
                <Clock className={`h-4 w-4 ${plan.isPopular ? 'text-coral-light' : 'text-coral'}`} />
                <span className={`text-sm font-medium ${plan.isPopular ? 'text-white' : 'text-gray-dark'}`}>
                  {plan.duration}
                </span>
              </div>

              {/* Description */}
              <p className={`mb-8 text-sm leading-relaxed ${plan.isPopular ? 'text-gray-300' : 'text-gray-carbon'}`}>
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                      plan.isPopular ? 'bg-coral' : 'bg-coral/10'
                    }`}>
                      <Check className={`h-3 w-3 ${plan.isPopular ? 'text-white' : 'text-coral'}`} />
                    </div>
                    <span className={`text-sm ${plan.isPopular ? 'text-gray-200' : 'text-gray-carbon'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-shimmer block w-full rounded-full py-4 text-center font-[var(--font-headline)] font-bold transition-all hover:-translate-y-1 ${
                  plan.isPopular
                    ? 'bg-white text-gray-dark hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]'
                    : 'text-white hover:shadow-[0_15px_40px_rgba(255,107,107,0.4)]'
                }`}
                style={
                  !plan.isPopular
                    ? { background: 'var(--gradient-coral-pink)' }
                    : undefined
                }
              >
                {plan.ctaText}
              </a>

              {/* Decorative element for popular plan */}
              {plan.isPopular && (
                <div
                  className="blob absolute -bottom-20 -right-20 h-40 w-40 opacity-20"
                  style={{
                    background: 'var(--gradient-coral-pink)',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
