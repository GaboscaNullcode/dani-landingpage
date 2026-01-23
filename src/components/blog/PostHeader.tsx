'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import { formatDate } from '@/lib/blog-service';

interface PostHeaderProps {
  article: BlogArticle;
}

export default function PostHeader({ article }: PostHeaderProps) {
  return (
    <header
      className="relative overflow-hidden"
      style={{
        paddingTop: 'calc(80px + 3rem)',
        paddingBottom: '0',
        background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
      }}
    >
      {/* Decorative Floating Blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Yellow circle - top left */}
        <motion.div
          className="absolute left-[3%] top-[20%] h-12 w-12 rounded-full md:h-20 md:w-20"
          style={{ background: '#fcd34d' }}
          animate={{
            y: [-8, 8, -8],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Coral blob - right side */}
        <motion.div
          className="blob absolute -right-16 top-[30%] h-40 w-40 opacity-30 md:h-56 md:w-56"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Lavender blob - bottom left */}
        <motion.div
          className="blob absolute -left-10 bottom-[10%] h-32 w-32 opacity-20 md:h-48 md:w-48"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mint circle - floating right */}
        <motion.div
          className="absolute bottom-[30%] right-[10%] h-8 w-8 rounded-full md:h-12 md:w-12"
          style={{ background: '#6ee7b7' }}
          animate={{
            y: [8, -8, 8],
            x: [-4, 4, -4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-center gap-2 text-sm"
        >
          <Link
            href="/blog"
            className="font-[var(--font-dm-sans)] text-gray-medium transition-colors hover:text-coral"
          >
            Blog
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-300" />
          <span className="font-[var(--font-dm-sans)] text-coral">
            Artículo
          </span>
        </motion.nav>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-4"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-1.5 font-[var(--font-dm-sans)] text-xs font-medium uppercase tracking-wider text-white"
          >
            Blog
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 max-w-4xl font-[var(--font-headline)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] text-black-deep"
        >
          {article.title}
        </motion.h1>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap items-center gap-4 text-sm text-gray-medium"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="font-[var(--font-dm-sans)]">{formatDate(article.publishedAt)}</span>
          </div>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-[var(--font-dm-sans)]">{article.readTime} min de lectura</span>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-[21/9] overflow-hidden rounded-t-2xl bg-gray-100 md:rounded-t-3xl"
        >
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          {/* Gradient overlay at bottom for smooth transition */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </motion.div>
      </div>
    </header>
  );
}
