'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { getPopularArticles } from '@/data/blog-data';
import ArticleCard from './ArticleCard';

export default function PopularArticles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const popularArticles = getPopularArticles();
  const featuredArticle = popularArticles[0];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      {/* Decorative Floating Blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Lavender blob - top left */}
        <motion.div
          className="blob absolute -left-20 top-10 h-40 w-40 opacity-15 md:h-64 md:w-64"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Small coral circle - floating */}
        <motion.div
          className="absolute right-[10%] top-[20%] h-8 w-8 rounded-full opacity-40 md:h-12 md:w-12"
          style={{ background: '#ff6b6b' }}
          animate={{
            y: [-15, 15, -15],
            x: [5, -5, 5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating star icon */}
        <motion.div
          className="absolute left-[8%] top-[15%] text-sunshine opacity-30"
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-8 w-8 md:h-10 md:w-10" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-2 font-[var(--font-dm-sans)] text-sm font-medium uppercase tracking-[0.15em] text-coral">
            Destacado
          </p>
          <h2 className="font-[var(--font-headline)] text-2xl font-bold text-black-deep md:text-3xl">
            Artículo popular
          </h2>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && (
          <ArticleCard article={featuredArticle} variant="featured" />
        )}

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-16 h-px bg-gray-200"
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  );
}
