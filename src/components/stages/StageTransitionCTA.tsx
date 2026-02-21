'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface StageTransitionCTAProps {
  text: string;
  description?: string;
  primaryText: string;
  primaryHref: string;
  quizText?: string;
}

export default function StageTransitionCTA({
  text,
  description,
  primaryText,
  primaryHref,
  quizText = 'No estoy seguro/a → Hacer el quiz',
}: StageTransitionCTAProps) {
  return (
    <section className="bg-white py-20">
      <div className="container-custom text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl font-[var(--font-headline)] text-2xl font-bold text-gray-dark md:text-3xl"
        >
          {text}
        </motion.p>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-lg text-gray-carbon"
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={primaryHref}
            className="btn-shimmer inline-flex items-center gap-2 rounded-full px-8 py-4 font-[var(--font-headline)] font-bold text-white"
            style={{ background: 'var(--gradient-coral-pink)' }}
          >
            {primaryText}
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/empezar"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-light px-8 py-4 font-[var(--font-headline)] font-bold text-gray-carbon transition-colors duration-300 hover:border-coral hover:text-coral"
          >
            <HelpCircle className="h-5 w-5" />
            {quizText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
