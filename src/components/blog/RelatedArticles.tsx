'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import ArticleCard from './ArticleCard';

interface RelatedArticlesProps {
  articles: BlogArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (articles.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-padding) 0',
        background: 'linear-gradient(180deg, #ffffff 0%, #fef7f0 50%, #fce7f3 100%)',
      }}
    >
      {/* Decorative Floating Blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Pink blob - right side */}
        <motion.div
          className="blob absolute -right-24 top-[20%] h-48 w-48 opacity-15 md:h-72 md:w-72"
          style={{
            background: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Yellow circle - floating */}
        <motion.div
          className="absolute bottom-[30%] left-[5%] h-8 w-8 rounded-full opacity-40 md:h-12 md:w-12"
          style={{ background: '#fcd34d' }}
          animate={{
            y: [8, -12, 8],
            x: [-4, 4, -4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mint circle - bottom right */}
        <motion.div
          className="absolute bottom-[15%] right-[10%] h-6 w-6 rounded-full opacity-35 md:h-10 md:w-10"
          style={{ background: '#6ee7b7' }}
          animate={{
            scale: [1, 1.15, 1],
            y: [-6, 6, -6],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 font-[var(--font-inter)] text-sm font-medium uppercase tracking-[0.15em] text-coral">
              Sigue leyendo
            </p>
            <h2 className="font-[var(--font-headline)] text-2xl font-bold text-black-deep md:text-3xl">
              Artículos relacionados
            </h2>
          </div>

          <Link
            href="/blog"
            className="group hidden items-center gap-2 font-[var(--font-inter)] text-sm font-semibold text-gray-carbon transition-colors hover:text-coral sm:inline-flex"
          >
            <span>Ver todos</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Mobile View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-[var(--font-inter)] text-sm font-semibold text-gray-carbon transition-all hover:border-coral hover:text-coral"
          >
            <span>Ver más artículos</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
