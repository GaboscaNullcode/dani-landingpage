'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Gift } from 'lucide-react';
import type { ProductBono } from '@/types/tienda';
import { resolveIcon } from '@/lib/icon-map';

interface SeccionBonosProps {
  bonos: ProductBono[];
}

export default function SeccionBonos({ bonos }: SeccionBonosProps) {
  if (bonos.length === 0) return null;

  return (
    <section className="bg-cream/40 py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
            <Gift className="h-4 w-4" />
            Bonos incluidos
          </div>
          <h2 className="font-[var(--font-headline)] text-2xl font-bold text-gray-dark md:text-3xl">
            Además, te llevas estos extras
          </h2>
        </motion.div>

        <div
          className={`mx-auto grid max-w-4xl gap-6 ${
            bonos.length === 1
              ? 'grid-cols-1 max-w-md'
              : bonos.length === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {bonos.map((bono, index) => {
            const Icon = bono.icon ? resolveIcon(bono.icon, Gift) : Gift;

            return (
              <motion.div
                key={bono.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              >
                {/* Image or icon */}
                {bono.imageUrl ? (
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                      src={bono.imageUrl}
                      alt={bono.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10">
                    <Icon className="h-6 w-6 text-coral" />
                  </div>
                )}

                {/* Content */}
                <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-gray-dark">
                  {bono.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-carbon">
                  {bono.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
