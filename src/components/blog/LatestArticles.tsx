'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import ArticleCard from './ArticleCard';
import type { BlogArticle } from '@/types/blog';

interface LatestArticlesProps {
  articles: BlogArticle[];
  title?: string;
  subtitle?: string;
}

export default function LatestArticles({
  articles,
  title,
  subtitle,
}: LatestArticlesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        paddingTop: '3rem',
        paddingBottom: 'var(--section-padding)',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        background: 'linear-gradient(180deg, #ffffff 0%, #fef7f0 30%, #fce7f3 100%)',
      }}
    >
      {/* Decorative Floating Blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Pink blob - right side */}
        <motion.div
          className="blob absolute -right-32 top-[30%] h-72 w-72 opacity-20 md:h-[400px] md:w-[400px]"
          style={{
            background: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Coral blob - left bottom */}
        <motion.div
          className="blob absolute -left-20 bottom-[20%] h-48 w-48 opacity-15 md:h-72 md:w-72"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #fcd34d 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Small floating heart icon */}
        <motion.div
          className="absolute right-[8%] top-[10%] text-coral opacity-25"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" />
        </motion.div>

        {/* Yellow circle - floating */}
        <motion.div
          className="absolute bottom-[40%] left-[5%] h-10 w-10 rounded-full opacity-50 md:h-14 md:w-14"
          style={{ background: '#fcd34d' }}
          animate={{
            y: [10, -15, 10],
            x: [-5, 5, -5],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Mint small circle */}
        <motion.div
          className="absolute right-[20%] top-[50%] h-6 w-6 rounded-full opacity-40 md:h-8 md:w-8"
          style={{ background: '#6ee7b7' }}
          animate={{
            scale: [1, 1.2, 1],
            y: [-8, 8, -8],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 font-[var(--font-dm-sans)] text-sm font-medium uppercase tracking-[0.15em] text-lavender">
              {subtitle || 'Más artículos'}
            </p>
            <h2 className="font-[var(--font-headline)] text-2xl font-bold text-black-deep md:text-3xl">
              {title || 'Últimas publicaciones'}
            </h2>
          </div>

          <Link
            href="/blog/todos"
            className="group hidden items-center gap-2 font-[var(--font-dm-sans)] text-sm font-semibold text-gray-carbon transition-colors hover:text-coral sm:inline-flex"
          >
            <span>Ver todos</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* Mobile View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center sm:hidden"
        >
          <Link
            href="/blog/todos"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-[var(--font-dm-sans)] text-sm font-semibold text-gray-carbon transition-all hover:border-coral hover:text-coral"
          >
            <span>Ver todos los artículos</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-20 max-w-2xl rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:p-12"
        >
          <h3 className="mb-3 font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
            ¿Te gustaría recibir más contenido?
          </h3>
          <p className="mb-6 text-gray-carbon">
            Únete al newsletter y recibe consejos semanales directamente en tu inbox.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-[var(--font-dm-sans)] text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink hover:shadow-lg"
          >
            <span>Suscribirme al newsletter</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
