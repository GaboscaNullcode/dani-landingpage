'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, Zap } from 'lucide-react';
import { getFeaturedProducts } from '@/data/tienda-data';
import ProductCard from './ProductCard';

export default function ProductosDestacados() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const featuredProducts = getFeaturedProducts();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: '5rem 0' }}
    >
      {/* Decorative Floating Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Lavender blob - top right */}
        <motion.div
          className="blob absolute -right-24 top-20 h-48 w-48 opacity-15 md:h-72 md:w-72"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Coral blob - left bottom */}
        <motion.div
          className="blob absolute -left-16 bottom-32 h-40 w-40 opacity-10 md:h-56 md:w-56"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating star icon */}
        <motion.div
          className="absolute left-[10%] top-[25%] text-sunshine opacity-25"
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Star className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" />
        </motion.div>

        {/* Floating zap icon */}
        <motion.div
          className="absolute bottom-[20%] right-[8%] text-coral/20"
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Zap className="h-8 w-8 md:h-12 md:w-12" fill="currentColor" />
        </motion.div>

        {/* Small mint circle */}
        <motion.div
          className="absolute bottom-[40%] left-[5%] h-8 w-8 rounded-full opacity-40 md:h-12 md:w-12"
          style={{ background: '#6ee7b7' }}
          animate={{
            y: [8, -8, 8],
            x: [-4, 4, -4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2"
          >
            <Star className="h-4 w-4 text-coral" fill="currentColor" />
            <span className="text-sm font-semibold uppercase tracking-wider text-coral">
              Más Populares
            </span>
          </motion.div>

          <h2 className="mb-4 font-[var(--font-headline)] text-[clamp(2rem,5vw,3rem)] font-bold text-black-deep">
            Productos Destacados
          </h2>

          <p className="mx-auto max-w-2xl text-gray-carbon">
            Los recursos más completos y valorados por nuestra comunidad. Cada uno diseñado
            para llevarte al siguiente nivel.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="featured"
              index={index}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center text-sm text-gray-carbon"
        >
          Todos los productos incluyen{' '}
          <span className="font-semibold text-coral">acceso de por vida</span> y{' '}
          <span className="font-semibold text-coral">actualizaciones gratuitas</span>
        </motion.p>
      </div>
    </section>
  );
}
