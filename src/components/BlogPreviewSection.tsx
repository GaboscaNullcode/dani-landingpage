'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, BookOpen, Lightbulb, PenTool } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';

interface BlogPreviewSectionProps {
  articles: BlogArticle[];
}

export default function BlogPreviewSection({
  articles,
}: BlogPreviewSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (articles.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-padding) 2rem',
        background:
          'linear-gradient(180deg, #ffffff 0%, #fef7f0 40%, #fce7f3 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="blob absolute -right-32 top-20 h-[400px] w-[400px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(252, 211, 77, 0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="blob absolute -left-24 bottom-10 h-[300px] w-[300px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating icon decorations */}
        <motion.div
          className="absolute left-[8%] top-[20%] flex h-10 w-10 items-center justify-center rounded-full bg-lavender/30 opacity-40"
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <PenTool className="h-5 w-5 text-lavender" />
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] right-[10%] flex h-11 w-11 items-center justify-center rounded-full bg-sunshine/30 opacity-40"
          animate={{ y: [8, -8, 8], rotate: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Lightbulb className="h-5 w-5 text-sunshine" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-5 py-2"
          >
            <BookOpen className="h-5 w-5 text-coral" />
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-coral">
              Artículos recientes
            </span>
          </motion.div>

          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
            Del blog
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-gray-carbon">
            Ideas cortas para avanzar sin abrumarte.
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ y: -8 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block overflow-hidden rounded-[24px] bg-white p-1 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-gray-100">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                    <span className="font-[var(--font-dm-sans)] text-xs font-semibold uppercase tracking-wide text-coral">
                      Blog
                    </span>
                    <span className="text-gray-300">&middot;</span>
                    <span className="text-xs text-gray-400">
                      {article.readTime} min lectura
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold leading-snug text-black-deep transition-colors duration-300 group-hover:text-coral">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 font-[var(--font-dm-sans)] text-sm leading-relaxed text-gray-carbon">
                    {article.description}
                  </p>

                  {/* Read link */}
                  <span className="inline-flex items-center gap-1.5 font-[var(--font-dm-sans)] text-sm font-semibold text-coral transition-colors duration-300 group-hover:text-pink">
                    Leer artículo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-white/80 px-6 py-3 font-[var(--font-dm-sans)] text-sm font-semibold text-gray-carbon shadow-md backdrop-blur-sm transition-[color,box-shadow] duration-300 hover:text-coral hover:shadow-lg"
          >
            Ver todos los artículos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
