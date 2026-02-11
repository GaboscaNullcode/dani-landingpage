'use client';

import { memo } from 'react';
import { ShoppingBag, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import type { Product } from '@/types/tienda';
import { SectionHeader, FeaturedProductCard, CompactProductCard } from './TiendaSections';

interface SeccionProductosProps {
  featuredProducts: Product[];
  additionalProducts: Product[];
}

export default memo(function SeccionProductos({
  featuredProducts,
  additionalProducts,
}: SeccionProductosProps) {
  // El curso principal (más vendido)
  const cursoDestacado = featuredProducts.find((p) => p.category === 'curso');

  // Resto de productos (eBooks y masterclass)
  const otrosProductos = [
    ...featuredProducts.filter((p) => p.id !== cursoDestacado?.id),
    ...additionalProducts,
  ];

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
        <SectionHeader
          icon={<ShoppingBag className="h-4 w-4" />}
          badge="Productos"
          badgeColor="coral"
          title="Cursos, eBooks y Masterclasses"
          description="Recursos completos para acelerar tu camino hacia el trabajo remoto."
        />

        {/* Producto destacado */}
        {cursoDestacado && (
          <div className="mb-12">
            <FeaturedProductCard product={cursoDestacado} />
          </div>
        )}

        {/* Grid de otros productos */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otrosProductos.map((product, index) => (
            <CompactProductCard
              key={product.id}
              product={product}
              index={index}
              accentColor={product.category === 'masterclass' ? 'lavender' : 'coral'}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
