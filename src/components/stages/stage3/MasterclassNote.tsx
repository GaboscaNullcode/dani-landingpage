'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';

export default function MasterclassNote() {
  return (
    <section className="bg-cream py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl bg-white p-8 shadow-sm md:flex-row md:p-10"
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-peach text-coral">
            <Play className="h-8 w-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-[var(--font-headline)] text-lg font-bold text-gray-dark">
              Recomendación antes de agendar
            </h3>
            <p className="mt-2 text-sm text-gray-carbon">
              Para aprovechar al máximo tu sesión, te recomendamos haber visto la
              Masterclass Gratuita &quot;Vive en Modo Remoto&quot; antes de
              agendar.
            </p>
          </div>
          <Link
            href="/recursos-gratuitos#masterclass"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-coral px-6 py-3 font-[var(--font-headline)] text-sm font-bold text-coral transition-colors duration-300 hover:bg-coral hover:text-white"
          >
            Ver Masterclass Gratuita
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
