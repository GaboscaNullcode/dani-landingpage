'use client';

import { Users, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { freeResources } from '@/data/tienda-data';
import { SectionHeader, ServiceCard } from './TiendaSections';

export default function SeccionServicios() {
  // La comunidad
  const comunidad = freeResources.find((r) => r.category === 'comunidad');

  if (!comunidad) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-lavender/5 to-pink/5 py-16 md:py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-20 top-24 h-36 w-36 rounded-full bg-lavender/20"
          animate={{ scale: [1, 1.15, 1], x: [-10, 10, -10] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-16 bottom-20 h-28 w-28 rounded-full bg-pink/15"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute left-[15%] top-[20%] text-lavender/20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="h-8 w-8" fill="currentColor" />
        </motion.div>
      </div>

      <div className="container-custom relative">
        <SectionHeader
          icon={<Users className="h-4 w-4" />}
          badge="Servicios"
          badgeColor="lavender"
          title="Comunidad y Acompañamiento"
          description="No tienes que hacer este camino sola. Conecta con personas que entienden tu proceso."
        />

        {/* Community Card */}
        <div className="mx-auto max-w-3xl">
          <ServiceCard product={comunidad} />
        </div>

        {/* Asesoría CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg"
        >
          <motion.div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-pink shadow-md"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="h-7 w-7 text-white" />
          </motion.div>

          <h3 className="mb-2 font-[var(--font-headline)] text-xl font-bold text-black-deep">
            ¿Necesitas orientación personalizada?
          </h3>

          <p className="mb-5 text-gray-carbon">
            Agenda una llamada gratuita de 15 minutos para encontrar el recurso perfecto para ti.
          </p>

          <Link
            href="/asesoria"
            className="inline-flex items-center gap-2 rounded-full border-2 border-coral bg-white px-6 py-3 font-bold text-coral transition-all duration-200 hover:bg-coral hover:text-white"
          >
            Agendar llamada gratuita
            <Sparkles className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
