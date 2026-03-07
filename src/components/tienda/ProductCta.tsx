'use client';

import { motion } from 'motion/react';
import type { Product } from '@/types/tienda';
import CheckoutButton from './CheckoutButton';

interface ProductCtaProps {
  product: Product;
}

export default function ProductCta({ product }: ProductCtaProps) {
  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: 'var(--gradient-coral-pink)',
      }}
    >
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-white md:text-4xl">
            ¿List@ para empezar?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
            Da el primer paso hacia tu carrera remota hoy.
          </p>
          {product.stripePriceId ? (
            <CheckoutButton
              priceId={product.stripePriceId}
              productId={product.id}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[var(--font-headline)] font-bold text-coral shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {product.ctaText}
            </CheckoutButton>
          ) : (
            <a
              href={product.ctaLink}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[var(--font-headline)] font-bold text-coral shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {product.ctaText}
            </a>
          )}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
    </section>
  );
}
