'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { BookOpen, Sparkles } from 'lucide-react';
import { getAdditionalProducts } from '@/data/tienda-data';
import ProductCard from './ProductCard';

export default function ProductosAdicionales() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const additionalProducts = getAdditionalProducts();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, #ffffff 0%, #fef7f0 100%)',
      }}
    >
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Floating book icon */}
        <motion.div
          className="absolute left-[12%] top-[20%] text-lavender/20"
          animate={{
            y: [-8, 8, -8],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BookOpen className="h-10 w-10 md:h-14 md:w-14" />
        </motion.div>

        {/* Yellow circle */}
        <motion.div
          className="absolute right-[15%] top-[30%] h-10 w-10 rounded-full opacity-50 md:h-14 md:w-14"
          style={{ background: '#fcd34d' }}
          animate={{
            y: [10, -10, 10],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Sparkles icon */}
        <motion.div
          className="absolute bottom-[25%] right-[8%] text-coral/15"
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <Sparkles className="h-8 w-8 md:h-12 md:w-12" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender/10 px-4 py-2"
          >
            <BookOpen className="h-4 w-4 text-lavender" />
            <span className="text-sm font-semibold uppercase tracking-wider text-lavender">
              eBooks
            </span>
          </motion.div>

          <h2 className="mb-4 font-[var(--font-headline)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-black-deep">
            Recursos Adicionales
          </h2>

          <p className="mx-auto max-w-xl text-gray-carbon">
            Guías prácticas a un precio accesible para dar tus primeros pasos con confianza.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
          {additionalProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="compact"
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
