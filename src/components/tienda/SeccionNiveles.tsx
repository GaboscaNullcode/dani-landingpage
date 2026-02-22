'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import type { Product, ProductCategory } from '@/types/tienda';
import { CompactProductCard } from './TiendaSections';
import type { PurchaseStatus } from './TiendaSections';

interface SeccionNivelesProps {
  levels: { category: ProductCategory; products: Product[] }[];
  purchasedProductIds?: string[];
  isLoggedIn?: boolean;
}

const levelHeadingColors: Record<string, string> = {
  coral: 'text-coral',
  lavender: 'text-lavender',
  pink: 'text-pink',
  sky: 'text-sky',
};

const levelCardAccent: Record<
  string,
  'coral' | 'lavender' | 'mint' | 'sky'
> = {
  coral: 'coral',
  lavender: 'lavender',
  pink: 'coral',
  sky: 'sky',
};

export default memo(function SeccionNiveles({
  levels,
  purchasedProductIds = [],
  isLoggedIn = false,
}: SeccionNivelesProps) {
  const purchasedSet = new Set(purchasedProductIds);
  const getStatus = (productId: string): PurchaseStatus => {
    if (!isLoggedIn) return 'none';
    return purchasedSet.has(productId) ? 'purchased' : 'locked';
  };

  if (levels.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-[var(--font-headline)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-black-deep">
            ¿Buscas algo más específico?
          </h2>
          <p className="mx-auto max-w-2xl text-gray-carbon">
            Explora los recursos según el nivel en el que te encuentras.
          </p>
        </motion.div>

        {/* Levels */}
        <div className="space-y-10">
          {levels.map((level, levelIndex) => (
            <motion.div
              key={level.category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Level heading */}
              <h3
                className={`mb-1 font-[var(--font-headline)] text-xl font-bold italic md:text-2xl ${levelHeadingColors[level.category.accentColor] || 'text-coral'}`}
              >
                {level.category.name}
              </h3>
              <p className="mb-6 text-sm italic text-gray-carbon">
                {level.category.subtitle}
              </p>

              {/* Products grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {level.products.map((product, index) => (
                  <CompactProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    accentColor={
                      levelCardAccent[level.category.accentColor] || 'coral'
                    }
                    purchaseStatus={getStatus(product.id)}
                  />
                ))}
              </div>

              {/* Level description */}
              {level.category.description && (
                <p className="mt-4 text-sm text-gray-carbon">
                  <span className="mr-1">👉</span>
                  {level.category.description}
                </p>
              )}

              {/* Divider (not on last level) */}
              {levelIndex < levels.length - 1 && (
                <hr className="mt-10 border-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
