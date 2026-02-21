'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, Clock, Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import type { AsesoriaPlan, PaymentPlan } from '@/types/tienda';
import ProgramaIntensivoModal from './ProgramaIntensivoModal';

const VISIBLE_FEATURES = 4;

interface PlanesSectionProps {
  planes: AsesoriaPlan[];
  paymentPlans?: PaymentPlan[];
}

export default function PlanesSection({ planes, paymentPlans = [] }: PlanesSectionProps) {
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());
  const [baseHeight, setBaseHeight] = useState(0);
  const [showProgramaModal, setShowProgramaModal] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const togglePlan = (planId: string) => {
    setExpandedPlans((prev) => {
      const next = new Set(prev);
      if (next.has(planId)) {
        next.delete(planId);
      } else {
        next.add(planId);
      }
      return next;
    });
  };

  const measureBaseHeight = useCallback(() => {
    if (!gridRef.current || expandedPlans.size > 0) return;
    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    let max = 0;
    cards.forEach((card) => {
      const prev = card.style.minHeight;
      card.style.minHeight = '0px';
      max = Math.max(max, card.offsetHeight);
      card.style.minHeight = prev;
    });
    if (max > 0) setBaseHeight(max);
  }, [expandedPlans.size]);

  useEffect(() => {
    measureBaseHeight();
    window.addEventListener('resize', measureBaseHeight);
    return () => window.removeEventListener('resize', measureBaseHeight);
  }, [measureBaseHeight]);

  async function handleCheckout(planId: string) {
    const plan = planes.find((p) => p.id === planId);
    if (!plan || !plan.stripePriceId) return;

    setLoadingPlan(planId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          productId: plan.id,
          isAsesoria: true,
          planId: plan.id,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setLoadingPlan(null);
      }
    } catch {
      console.error('Checkout request failed');
      setLoadingPlan(null);
    }
  }

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
            Pensado para tí
          </span>
          <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
            Elige tu Acompañamiento
          </h2>
          <p className="text-lg text-gray-carbon">
            Tres opciones diseñadas para diferentes etapas de tu camino hacia el trabajo remoto.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div ref={gridRef} className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {planes.map((plan, index) => {
            const isExpanded = expandedPlans.has(plan.id);
            const hasHiddenFeatures = plan.features.length > VISIBLE_FEATURES;
            const visibleFeatures = hasHiddenFeatures && !isExpanded
              ? plan.features.slice(0, VISIBLE_FEATURES)
              : plan.features;
            const hiddenCount = plan.features.length - VISIBLE_FEATURES;
            const isLoading = loadingPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ minHeight: baseHeight || undefined }}
              className={`relative flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
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
                {plan.featuresTitle && (
                  <p className={`mb-3 text-sm font-semibold ${plan.isPopular ? 'text-white' : 'text-gray-dark'}`}>
                    {plan.featuresTitle}
                  </p>
                )}
                <ul className="mb-2 space-y-3">
                  {visibleFeatures.map((feature, idx) => (
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

                {/* Expanded features */}
                <AnimatePresence>
                  {isExpanded && hasHiddenFeatures && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="space-y-3 overflow-hidden"
                    >
                      {plan.features.slice(VISIBLE_FEATURES).map((feature, idx) => (
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
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Toggle button */}
                {hasHiddenFeatures && (
                  <button
                    onClick={() => togglePlan(plan.id)}
                    className={`mb-4 mt-2 flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      plan.isPopular
                        ? 'text-coral-light hover:text-white'
                        : 'text-coral hover:text-pink'
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                    {isExpanded ? 'Ver menos' : `Ver ${hiddenCount} más`}
                  </button>
                )}

                {/* Note */}
                {plan.note && (
                  <p className={`mb-8 text-xs italic leading-relaxed ${plan.isPopular ? 'text-gray-400' : 'text-gray-medium'}`}>
                    {plan.note}
                  </p>
                )}

                {/* CTA */}
                {plan.id === 'crea-camino' ? (
                  <button
                    onClick={() => setShowProgramaModal(true)}
                    disabled={isLoading}
                    className="btn-shimmer mt-auto block w-full rounded-full bg-white py-4 text-center font-[var(--font-headline)] font-bold text-gray-dark transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirigiendo...
                      </span>
                    ) : (
                      plan.ctaText
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={isLoading || loadingPlan !== null}
                    className={`btn-shimmer mt-auto block w-full rounded-full py-4 text-center font-[var(--font-headline)] font-bold transition-all hover:-translate-y-1 disabled:opacity-50 ${
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
                    {isLoading ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirigiendo...
                      </span>
                    ) : (
                      plan.ctaText
                    )}
                  </button>
                )}

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
            );
          })}
        </div>

        {/* Modal T&C Programa Intensivo */}
        {planes.find((p) => p.id === 'crea-camino') && (
          <ProgramaIntensivoModal
            isOpen={showProgramaModal}
            onClose={() => setShowProgramaModal(false)}
            plan={planes.find((p) => p.id === 'crea-camino')!}
            paymentPlans={paymentPlans}
          />
        )}
      </div>
    </section>
  );
}
