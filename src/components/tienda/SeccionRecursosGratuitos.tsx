'use client';

import { Gift, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { Product } from '@/types/tienda';
import { SectionHeader, FreeResourceCard } from './TiendaSections';

interface SeccionRecursosGratuitosProps {
  freeResources: Product[];
}

export default function SeccionRecursosGratuitos({
  freeResources,
}: SeccionRecursosGratuitosProps) {
  // Filtrar solo los recursos gratuitos (excluir comunidad)
  const gratuitosOnly = freeResources.filter((r) => r.isFree);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-mint/5 py-16 md:py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-16 top-20 h-32 w-32 rounded-full bg-mint/20"
          animate={{ scale: [1, 1.1, 1], y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-12 bottom-32 h-24 w-24 rounded-full bg-lavender/15"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute right-[20%] top-[15%] text-mint/20"
          animate={{ rotate: [0, 15, 0], y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-10 w-10" />
        </motion.div>
      </div>

      <div className="container-custom relative">
        <SectionHeader
          icon={<Gift className="h-4 w-4" />}
          badge="Empieza Gratis"
          badgeColor="mint"
          title="Recursos Gratuitos"
          description="Descubre si el trabajo remoto es para ti. Sin compromiso, sin costo."
        />

        {/* Grid de recursos gratuitos */}
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {gratuitosOnly.map((resource, index) => (
            <FreeResourceCard key={resource.id} product={resource} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
