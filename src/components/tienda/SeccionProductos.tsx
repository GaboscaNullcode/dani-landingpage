'use client';

import { memo } from 'react';
import { BookOpen, PackageCheck } from 'lucide-react';
import { motion } from 'motion/react';
import type { Product, ProductType } from '@/types/tienda';
import { FeaturedProductCard } from './TiendaSections';
import type { PurchaseStatus } from './TiendaSections';

interface SeccionProductosProps {
  featuredProducts: Product[];
  purchasedProductIds?: string[];
  isLoggedIn?: boolean;
  productTypes?: Record<string, ProductType>;
}

export default memo(function SeccionProductos({
  featuredProducts,
  purchasedProductIds = [],
  isLoggedIn = false,
  productTypes,
}: SeccionProductosProps) {
  const purchasedSet = new Set(purchasedProductIds);
  const getStatus = (productId: string): PurchaseStatus => {
    if (!isLoggedIn) return 'none';
    return purchasedSet.has(productId) ? 'purchased' : 'locked';
  };

  const cursoDestacado = featuredProducts.find((p) => p.category === 'curso');

  if (!cursoDestacado) return null;

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-20 top-32 h-40 w-40 rounded-full bg-coral/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-16 bottom-48 h-28 w-28 rounded-full bg-lavender/15"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[10%] text-coral/15"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BookOpen className="h-12 w-12" />
        </motion.div>
      </div>

      <div className="container-custom relative">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-coral">
            <PackageCheck className="h-4 w-4" />
            Productos
          </span>
          <h2 className="mt-4 font-[var(--font-headline)] text-[clamp(1.5rem,3.5vw,2rem)] font-bold">
            Más vendido •{' '}
            <span className="italic text-coral">
              Recomendado para empezar
            </span>
          </h2>
        </div>
        <FeaturedProductCard
          product={cursoDestacado}
          purchaseStatus={getStatus(cursoDestacado.id)}
          productTypes={productTypes}
        />
      </div>
    </section>
  );
});
