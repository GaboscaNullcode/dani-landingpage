'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import { formatDate } from '@/lib/blog-service';

interface ArticleCardProps {
  article: BlogArticle;
  index?: number;
  variant?: 'default' | 'featured';
}

function ArticleCard({
  article,
  index = 0,
  variant = 'default',
}: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <Link href={`/blog/${article.slug}`} className="group block">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="grid gap-6 md:grid-cols-2 md:gap-10"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: article.category?.accentColor || '#ff6b6b' }}
              />
              <span className="text-sm font-medium text-gray-medium">
                {article.category?.name || 'Blog'}
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-medium">{formatDate(article.publishedAt)}</span>
            </div>

            <h2 className="mb-4 font-[var(--font-headline)] text-2xl font-bold leading-tight text-black-deep transition-colors duration-300 group-hover:text-coral md:text-3xl">
              {article.title}
            </h2>

            <p className="mb-6 line-clamp-2 text-base leading-relaxed text-gray-carbon">
              {article.description}
            </p>

            <div className="inline-flex items-center gap-2 font-[var(--font-dm-sans)] text-sm font-semibold text-coral">
              <span>Leer artículo</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  // Default variant - clean minimal card
  return (
    <Link href={`/blog/${article.slug}`} className="article-card group block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        {/* Image */}
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Meta */}
        <div className="mb-3 flex items-center gap-3">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: article.category?.accentColor || '#ff6b6b' }}
          />
          <span className="text-xs font-medium uppercase tracking-wide text-gray-medium">
            {article.category?.name || 'Blog'}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold leading-snug text-black-deep transition-colors duration-300 group-hover:text-coral">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-carbon">
          {article.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-medium">{formatDate(article.publishedAt)}</span>
          <span className="text-xs font-medium text-gray-medium">
            {article.readTime} min lectura
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export default memo(ArticleCard);
