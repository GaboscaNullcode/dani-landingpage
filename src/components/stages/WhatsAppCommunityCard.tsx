'use client';

import { motion } from 'motion/react';
import { Briefcase, Video, FileCheck, Users, Sparkles } from 'lucide-react';
import CommunityCheckoutButton from './CommunityCheckoutButton';

const communityItems = [
  { icon: Briefcase, text: 'Ofertas laborales 2 veces por semana' },
  { icon: Video, text: 'Zoom mensual de preguntas & respuestas' },
  { icon: FileCheck, text: 'Revisiones de documentos semanales y aleatorias' },
  { icon: Users, text: 'Networking con otros profesionales remotos' },
];

interface WhatsAppCommunityCardProps {
  priceId?: string;
  productId?: string;
}

export default function WhatsAppCommunityCard({
  priceId,
  productId,
}: WhatsAppCommunityCardProps) {
  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/10 via-pink/5 to-coral/10 p-1"
        >
          <div className="rounded-[22px] bg-white p-8 md:p-12">
            <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
              {/* Icon */}
              <div className="mb-5 md:mb-0">
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender to-pink shadow-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Users className="h-10 w-10 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="mb-2 inline-block rounded-full bg-lavender/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-lavender">
                  Comunidad
                </span>

                <h3 className="mb-3 font-[var(--font-headline)] text-2xl font-bold text-black-deep md:text-3xl">
                  Comunidad Privada
                </h3>

                <p className="mb-5 text-gray-carbon">
                  No estás sola en esto. Conecta con personas que están en tu
                  mismo camino y aprende de sus experiencias.
                </p>

                <div className="mb-6 grid gap-3 md:grid-cols-2">
                  {communityItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-carbon"
                      >
                        <Sparkles className="h-4 w-4 shrink-0 text-lavender" />
                        <span>{item.text}</span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  {priceId && productId ? (
                    <CommunityCheckoutButton
                      priceId={priceId}
                      productId={productId}
                    />
                  ) : (
                    <>
                      <span className="font-[var(--font-headline)] text-3xl font-bold text-lavender">
                        $5.99/mes
                      </span>
                      <a
                        href="https://chat.whatsapp.com/HYmBiEU0UXl2VsMMlWatAE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lavender to-pink px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(167,139,250,0.35)]"
                      >
                        Obtener acceso
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
