'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import type { BlogCategory } from '@/types/blog';

interface BlogCategoriesProps {
  categories: BlogCategory[];
  activeSlug?: string;
}

export default function BlogCategories({
  categories,
  activeSlug,
}: BlogCategoriesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-12"
      style={{
        background:
          'linear-gradient(180deg, #fce7f3 0%, #fef7f0 50%, #ffffff 100%)',
      }}
    >
      {/* Subtle decorative element */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-10 top-0 h-32 w-32 rounded-full opacity-20 md:h-48 md:w-48"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {/* All Articles Link */}
          <Link
            href="/blog"
            className={`rounded-full px-5 py-2.5 font-[var(--font-dm-sans)] text-sm font-medium transition-colors duration-300 ${
              !activeSlug
                ? 'bg-black-deep text-white'
                : 'border border-gray-200 bg-white text-gray-carbon hover:border-coral hover:text-coral'
            }`}
          >
            Todos
          </Link>

          {/* Category Pills */}
          {categories.map((category, index) => {
            const isActive = activeSlug === category.slug;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={`/blog/categoria/${category.slug}`}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-[var(--font-dm-sans)] text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'border border-gray-200 bg-white text-gray-carbon hover:border-coral hover:text-coral'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: category.accentColor }
                      : undefined
                  }
                >
                  {!isActive && (
                    <span
                      className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{ backgroundColor: category.accentColor }}
                    />
                  )}
                  <span>{category.name.split('&')[0].trim()}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
