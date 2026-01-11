'use client';

import { motion } from 'motion/react';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <section className="relative bg-white">
      {/* Subtle decorative element */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-32 top-[20%] h-64 w-64 rounded-full opacity-[0.03]"
          style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #e056a0 100%)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-32 top-[60%] h-48 w-48 rounded-full opacity-[0.03]"
          style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #fcd34d 100%)' }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-custom relative z-10 py-12 md:py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose-custom mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
