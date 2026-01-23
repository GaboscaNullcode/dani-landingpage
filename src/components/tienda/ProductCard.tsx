'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Product, formatPrice } from '@/data/tienda-data';

interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'compact' | 'free';
  index?: number;
}

const categoryColors: Record<Product['category'], { bg: string; text: string; gradient: string }> = {
  curso: {
    bg: 'bg-coral/10',
    text: 'text-coral',
    gradient: 'from-coral to-pink',
  },
  ebook: {
    bg: 'bg-lavender/10',
    text: 'text-lavender',
    gradient: 'from-lavender to-pink',
  },
  masterclass: {
    bg: 'bg-pink/10',
    text: 'text-pink',
    gradient: 'from-pink to-coral',
  },
  comunidad: {
    bg: 'bg-mint/10',
    text: 'text-mint',
    gradient: 'from-mint to-lavender',
  },
  gratis: {
    bg: 'bg-sunshine/10',
    text: 'text-sunshine',
    gradient: 'from-sunshine to-coral',
  },
};

function ProductCard({ product, variant = 'featured', index = 0 }: ProductCardProps) {
  const colors = categoryColors[product.category];

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="product-card group relative flex flex-col overflow-hidden rounded-[var(--radius-soft)] bg-white shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-lifted)]"
      >
        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r ${colors.gradient} px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg`}
          >
            {product.badge}
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Category icon */}
          <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-lg backdrop-blur-sm">
            <Sparkles className={`h-5 w-5 ${colors.text}`} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Category */}
          <span
            className={`mb-3 inline-flex w-fit items-center rounded-full ${colors.bg} px-3 py-1 text-xs font-semibold uppercase tracking-wider ${colors.text}`}
          >
            {product.category}
          </span>

          {/* Title */}
          <h3 className="mb-2 font-[var(--font-headline)] text-xl font-bold leading-tight text-black-deep transition-colors group-hover:text-coral">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 flex-grow text-sm leading-relaxed text-gray-carbon">
            {product.description}
          </p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className="mb-5 space-y-2">
              {product.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-carbon">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-coral to-pink">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Price & CTA */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
            <div className="flex items-baseline gap-2">
              <span className="font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <Link
              href={product.ctaLink}
              className="btn-shimmer group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-pink px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,107,107,0.35)]"
            >
              <span>{product.ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group flex flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]"
      >
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${colors.gradient} shadow-md`}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-[var(--font-headline)] text-xl font-bold text-black-deep">
            {formatPrice(product.price)}
          </span>
        </div>

        <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-black-deep transition-colors group-hover:text-coral">
          {product.name}
        </h3>

        <p className="mb-4 line-clamp-2 flex-grow text-sm text-gray-carbon">
          {product.description}
        </p>

        <Link
          href={product.ctaLink}
          className="inline-flex items-center gap-2 text-sm font-semibold text-coral transition-colors hover:text-pink"
        >
          <span>{product.ctaText}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.article>
    );
  }

  // Free variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]"
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute right-4 top-4 rounded-full ${product.isFree ? 'bg-mint' : 'bg-lavender'} px-3 py-1 text-xs font-bold uppercase tracking-wider text-white`}
        >
          {product.badge}
        </div>
      )}

      <div className="mb-4 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.gradient} shadow-lg`}
        >
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-[var(--font-headline)] text-lg font-bold text-black-deep transition-colors group-hover:text-coral">
            {product.name}
          </h3>
          <span className="font-[var(--font-headline)] text-xl font-bold text-coral">
            {product.price === 0 ? 'Gratis' : `${formatPrice(product.price)}/mes`}
          </span>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-gray-carbon">
        {product.description}
      </p>

      {product.features && (
        <ul className="mb-5 space-y-2">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-carbon">
              <Check className={`h-4 w-4 ${colors.text}`} strokeWidth={2.5} />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={product.ctaLink}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
          product.isFree
            ? 'border-2 border-mint bg-mint/5 text-mint hover:bg-mint hover:text-white'
            : 'border-2 border-lavender bg-lavender/5 text-lavender hover:bg-lavender hover:text-white'
        }`}
      >
        <span>{product.ctaText}</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}

export default memo(ProductCard);
