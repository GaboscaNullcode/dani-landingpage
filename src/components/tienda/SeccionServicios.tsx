'use client';

import { memo } from 'react';
import {
  Users,
  Heart,
  Headphones,
  Mail,
  ArrowRight,
  Sparkles,
  CircleCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type { Product } from '@/types/tienda';
import { formatPrice } from '@/types/tienda';
import { SectionHeader } from './TiendaSections';
import type { PurchaseStatus } from './TiendaSections';

interface SeccionServiciosProps {
  communityProducts: Product[];
  purchasedProductIds?: string[];
  isLoggedIn?: boolean;
}

// ── Internal card component ──

interface ServiceGridCardProps {
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  features: string[];
  priceText: string;
  originalPriceText?: string;
  priceColor: string;
  ctaText: string;
  ctaLink: string;
  gradientFrom: string;
  gradientTo: string;
  purchaseStatus?: PurchaseStatus;
  index?: number;
}

function ServiceGridCard({
  icon,
  badge,
  badgeColor,
  title,
  description,
  features,
  priceText,
  originalPriceText,
  priceColor,
  ctaText,
  ctaLink,
  gradientFrom,
  gradientTo,
  purchaseStatus = 'none',
  index = 0,
}: ServiceGridCardProps) {
  const isPurchased = purchaseStatus === 'purchased';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Top: Icon + Badge */}
      <div className="mb-4 flex items-start justify-between">
        <motion.div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-md`}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-black-deep">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-gray-carbon">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="mb-6 grid grid-cols-2 gap-x-3 gap-y-2">
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-1.5 text-xs text-gray-carbon"
            >
              <Sparkles className="h-3 w-3 flex-shrink-0 text-lavender" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Spacer */}
      <div className="mt-auto" />

      {/* Price & CTA */}
      <div className="flex items-center justify-between gap-3">
        {isPurchased ? (
          <>
            <span className="inline-flex items-center gap-1.5 font-[var(--font-headline)] text-lg font-bold text-mint">
              <CircleCheck className="h-5 w-5" />
              Adquirido
            </span>
            <Link
              href="/mi-cuenta"
              className="inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-dark"
            >
              Ir a mi cuenta
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-[var(--font-headline)] text-xl font-bold ${priceColor}`}
              >
                {priceText}
              </span>
              {originalPriceText && (
                <span className="text-sm text-gray-400 line-through">
                  {originalPriceText}
                </span>
              )}
            </div>
            <Link
              href={ctaLink}
              className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 ${gradientFrom} ${gradientTo}`}
            >
              {ctaText}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </>
        )}
      </div>
    </motion.article>
  );
}

// ── Section ──

export default memo(function SeccionServicios({
  communityProducts,
  purchasedProductIds = [],
  isLoggedIn = false,
}: SeccionServiciosProps) {
  const comunidad = communityProducts[0];

  const getPurchaseStatus = (productId: string): PurchaseStatus => {
    if (!isLoggedIn) return 'none';
    return purchasedProductIds.includes(productId) ? 'purchased' : 'locked';
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-lavender/5 to-pink/5 py-16 md:py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-20 top-24 h-36 w-36 rounded-full bg-lavender/20"
          animate={{ scale: [1, 1.15, 1], x: [-10, 10, -10] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-16 bottom-20 h-28 w-28 rounded-full bg-pink/15"
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute left-[15%] top-[20%] text-lavender/20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="h-8 w-8" fill="currentColor" />
        </motion.div>
      </div>

      <div className="container-custom relative">
        <SectionHeader
          icon={<Users className="h-4 w-4" />}
          badge="Servicios"
          badgeColor="lavender"
          title="Comunidad y Acompañamiento"
          description="No tienes que hacer este camino sola. Conecta con personas que entienden tu proceso."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Comunidad */}
          {comunidad && (
            <ServiceGridCard
              icon={<Users className="h-6 w-6 text-white" />}
              badge="Comunidad"
              badgeColor="bg-lavender text-white"
              title={comunidad.name}
              description={comunidad.description}
              features={comunidad.features || []}
              priceText={formatPrice(
                comunidad.price,
                'USD',
                comunidad.isSubscription
                  ? comunidad.interval
                  : undefined,
              )}
              originalPriceText={
                comunidad.originalPrice
                  ? formatPrice(
                      comunidad.originalPrice,
                      'USD',
                      comunidad.isSubscription
                        ? comunidad.interval
                        : undefined,
                    )
                  : undefined
              }
              priceColor="text-coral"
              ctaText={comunidad.ctaText}
              ctaLink={`/tienda/${comunidad.slug}`}
              gradientFrom="from-lavender"
              gradientTo="to-pink"
              purchaseStatus={getPurchaseStatus(comunidad.id)}
              index={0}
            />
          )}

          {/* Acompañamientos */}
          <ServiceGridCard
            icon={<Headphones className="h-6 w-6 text-white" />}
            badge="Servicios 1:1"
            badgeColor="bg-coral text-white"
            title="Acompañamientos Personalizados"
            description="Una sesión conmigo puede ahorrarte meses de prueba y error. Te doy claridad, una estrategia concreta y la seguridad para avanzar con dirección."
            features={[
              'Consultoría 1:1',
              'Programa Intensivo',
              'Asesoría 1:1',
            ]}
            priceText="Desde $39"
            priceColor="text-coral"
            ctaText="Quiero saber más"
            ctaLink="/asesorias"
            gradientFrom="from-coral"
            gradientTo="to-pink"
            index={1}
          />

          {/* Newsletter */}
          <ServiceGridCard
            icon={<Mail className="h-6 w-6 text-white" />}
            badge="Gratuito"
            badgeColor="bg-sky text-white"
            title="Newsletter Semanal"
            description="Recibe cada semana consejos prácticos, oportunidades y recursos para avanzar en tu carrera remota."
            features={[
              'Acceso a comunidad privada',
              'Sesiones en vivo mensuales',
              'Networking con otros remotos',
              'Contenido exclusivo',
            ]}
            priceText="Gratuito"
            priceColor="text-mint"
            ctaText="Quiero saber más"
            ctaLink="/newsletter"
            gradientFrom="from-sky"
            gradientTo="to-lavender"
            index={2}
          />
        </div>
      </div>
    </section>
  );
});
