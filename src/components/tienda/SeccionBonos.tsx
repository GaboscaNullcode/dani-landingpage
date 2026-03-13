'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Gift, ExternalLink } from 'lucide-react';
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
            Además, recibirás estos beneficios
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {bonos.map((bono, index) => {
            const Icon = bono.icon ? resolveIcon(bono.icon, Gift) : Gift;

            return (
              <motion.div
                key={bono.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              >
                {/* Image or icon */}
                {bono.imageUrl ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={bono.imageUrl}
                      alt={bono.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-coral/10">
                    <Icon className="h-10 w-10 text-coral" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 font-[var(--font-headline)] text-base font-bold text-gray-dark">
                    {bono.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-carbon">
                    {bono.description}
                  </p>
                  {bono.cta && bono.ctaTitle && bono.ctaAction && (
                    <a
                      href={bono.ctaAction}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral/90"
                    >
                      {bono.ctaTitle}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
