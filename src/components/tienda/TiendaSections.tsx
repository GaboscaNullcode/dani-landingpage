'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Sparkles,
  ArrowRight,
  Check,
  BookOpen,
  Play,
  Crown,
  CircleCheck,
} from 'lucide-react';
import type { Product } from '@/types/tienda';
import { formatPrice } from '@/types/tienda';

// Purchase status: 'purchased' | 'locked' | 'none' (visitor, no login)
export type PurchaseStatus = 'purchased' | 'locked' | 'none';

// ============================================
// COMPACT PRODUCT CARD (Horizontal Layout)
// ============================================
interface CompactCardProps {
  product: Product;
  index?: number;
  accentColor?: 'coral' | 'lavender' | 'mint' | 'sky';
  purchaseStatus?: PurchaseStatus;
}

const accentStyles = {
  coral: {
    badge: 'bg-coral text-white',
    icon: 'from-coral to-pink',
    price: 'text-coral',
    button: 'bg-coral hover:bg-pink',
    border: 'hover:border-coral/30',
  },
  lavender: {
    badge: 'bg-lavender text-white',
    icon: 'from-lavender to-pink',
    price: 'text-lavender',
    button: 'bg-lavender hover:bg-pink',
    border: 'hover:border-lavender/30',
  },
  mint: {
    badge: 'bg-mint text-white',
    icon: 'from-mint to-lavender',
    price: 'text-mint',
    button: 'bg-mint hover:bg-lavender',
    border: 'hover:border-mint/30',
  },
  sky: {
    badge: 'bg-sky text-white',
    icon: 'from-sky to-lavender',
    price: 'text-sky',
    button: 'bg-sky hover:bg-lavender',
    border: 'hover:border-sky/30',
  },
};

function CompactProductCard({ product, index = 0, accentColor = 'coral', purchaseStatus = 'none' }: CompactCardProps) {
  const styles = accentStyles[accentColor];
  const isPurchased = purchaseStatus === 'purchased';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group relative flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${styles.border}`}
    >
      {/* Thumbnail */}
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="80px"
        />
        {isPurchased ? (
          <span className="absolute -right-1 -top-1 rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            Adquirido
          </span>
        ) : (
          product.badge && (
            <span
              className={`absolute -right-1 -top-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${styles.badge}`}
            >
              {product.badge}
            </span>
          )
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="mb-1 truncate font-[var(--font-headline)] text-base font-bold text-black-deep transition-colors group-hover:text-coral">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-carbon">
            {product.description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          {isPurchased ? (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-mint">
              <CircleCheck className="h-4 w-4" />
              Adquirido
            </span>
          ) : (
            <span className={`font-[var(--font-headline)] text-lg font-bold ${styles.price}`}>
              {formatPrice(product.price)}
            </span>
          )}
          {isPurchased ? (
            <Link
              href={`/tienda/${product.slug}`}
              className="inline-flex items-center gap-1 rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-teal-dark"
            >
              Ver producto
              <ArrowRight className="h-3 w-3" />
            </Link>
          ) : (
            <Link
              href={`/tienda/${product.slug}`}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 ${styles.button}`}
            >
              {product.ctaText}
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================
// FEATURED PRODUCT CARD (Para el curso principal)
// ============================================
interface FeaturedCardProps {
  product: Product;
  purchaseStatus?: PurchaseStatus;
}

function FeaturedProductCard({ product, purchaseStatus = 'none' }: FeaturedCardProps) {
  const isPurchased = purchaseStatus === 'purchased';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border-2 border-coral/20 bg-gradient-to-br from-white to-cream p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-coral/40 hover:shadow-xl md:p-8"
    >
      {/* Corner decoration */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-coral/20 to-pink/10" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-lavender/15 to-mint/10" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
        {/* Image */}
        <div className="relative mx-auto h-48 w-36 flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-md md:h-56 md:w-44">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 144px, 176px"
          />
          {isPurchased ? (
            <span className="absolute left-3 top-3 rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase text-white shadow-md">
              Adquirido
            </span>
          ) : (
            product.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-coral to-pink px-3 py-1 text-xs font-bold uppercase text-white shadow-md">
                {product.badge}
              </span>
            )
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <Crown className="h-5 w-5 text-sunshine" fill="currentColor" />
            <span className="text-sm font-semibold uppercase tracking-wider text-coral">
              {product.category}
            </span>
          </div>

          <h3 className="mb-3 font-[var(--font-headline)] text-2xl font-bold leading-tight text-black-deep md:text-3xl">
            {product.name}
          </h3>

          <p className="mb-4 text-gray-carbon">{product.description}</p>

          {/* Features */}
          {product.features && (
            <ul className="mb-5 grid grid-cols-2 gap-2">
              {product.features.slice(0, 4).map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-carbon">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-coral to-pink">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="truncate">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Price & CTA */}
          <div className="flex flex-wrap items-center gap-4">
            {isPurchased ? (
              <>
                <span className="inline-flex items-center gap-2 font-[var(--font-headline)] text-xl font-bold text-mint">
                  <CircleCheck className="h-6 w-6" />
                  Adquirido
                </span>
                <Link
                  href={`/tienda/${product.slug}`}
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-dark"
                >
                  Ver producto
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="font-[var(--font-headline)] text-3xl font-bold text-coral">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <Link
                  href={`/tienda/${product.slug}`}
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,107,107,0.35)]"
                >
                  {product.ctaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================
// FREE RESOURCE CARD
// ============================================
interface FreeCardProps {
  product: Product;
  index?: number;
  purchaseStatus?: PurchaseStatus;
}

function FreeResourceCard({ product, index = 0, purchaseStatus = 'none' }: FreeCardProps) {
  const IconComponent = product.category === 'gratis' && product.name.includes('Masterclass')
    ? Play
    : BookOpen;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border-2 border-mint/30 bg-gradient-to-br from-mint/5 to-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-mint hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-lavender shadow-md">
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase text-white">
          Gratis
        </span>
      </div>

      <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-black-deep transition-colors group-hover:text-mint">
        {product.name}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-gray-carbon">{product.description}</p>

      {product.features && (
        <ul className="mb-4 space-y-1.5">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-gray-carbon">
              <Check className="h-3.5 w-3.5 text-mint" strokeWidth={2.5} />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={product.ctaLink}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-mint bg-white py-2.5 text-sm font-bold text-mint transition-all duration-200 hover:bg-mint hover:text-white"
      >
        {product.ctaText}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}

// ============================================
// COMMUNITY/SERVICE CARD
// ============================================
interface ServiceCardProps {
  product: Product;
  purchaseStatus?: PurchaseStatus;
}

function ServiceCard({ product, purchaseStatus = 'none' }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/10 via-pink/5 to-coral/10 p-1"
    >
      <div className="rounded-[22px] bg-white p-6 md:p-8">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
          {/* Icon */}
          <div className="mb-5 md:mb-0">
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender to-pink shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Users className="h-10 w-10 text-white" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <span className="mb-2 inline-block rounded-full bg-lavender/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-lavender">
              Comunidad
            </span>

            <h3 className="mb-3 font-[var(--font-headline)] text-2xl font-bold text-black-deep">
              {product.name}
            </h3>

            <p className="mb-5 text-gray-carbon">{product.description}</p>

            {product.features && (
              <ul className="mb-6 grid gap-2 md:grid-cols-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-carbon">
                    <Sparkles className="h-4 w-4 text-lavender" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {purchaseStatus === 'purchased' ? (
                <>
                  <span className="inline-flex items-center gap-2 font-[var(--font-headline)] text-xl font-bold text-mint">
                    <CircleCheck className="h-6 w-6" />
                    Adquirido
                  </span>
                  <Link
                    href={`/tienda/${product.slug}`}
                    className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-dark"
                  >
                    Ver producto
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="font-[var(--font-headline)] text-3xl font-bold text-lavender">
                      {formatPrice(product.price, 'USD', product.isSubscription ? product.interval : undefined)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-medium line-through">
                        {formatPrice(product.originalPrice, 'USD', product.isSubscription ? product.interval : undefined)}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/tienda/${product.slug}`}
                    className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lavender to-pink px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(167,139,250,0.35)]"
                  >
                    {product.ctaText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================
// SECTION HEADER COMPONENT
// ============================================
interface SectionHeaderProps {
  icon: React.ReactNode;
  badge: string;
  badgeColor: 'coral' | 'lavender' | 'mint';
  title: string;
  description?: string;
}

const badgeColors = {
  coral: 'bg-coral/10 text-coral',
  lavender: 'bg-lavender/10 text-lavender',
  mint: 'bg-mint/10 text-mint',
};

function SectionHeader({ icon, badge, badgeColor, title, description }: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
        className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 ${badgeColors[badgeColor]}`}
      >
        {icon}
        <span className="text-sm font-semibold uppercase tracking-wider">{badge}</span>
      </motion.div>

      <h2 className="mb-3 font-[var(--font-headline)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-black-deep">
        {title}
      </h2>

      {description && <p className="mx-auto max-w-2xl text-gray-carbon">{description}</p>}
    </motion.div>
  );
}

// ============================================
// EXPORTS
// ============================================
export {
  CompactProductCard,
  FeaturedProductCard,
  FreeResourceCard,
  ServiceCard,
  SectionHeader,
};
