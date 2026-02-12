'use client';

import { motion } from 'motion/react';
import { MessageCircle, Briefcase, Video, Users, Globe } from 'lucide-react';

const communityItems = [
  { icon: Briefcase, text: 'Ofertas laborales 2x/semana' },
  { icon: Video, text: 'Zoom mensual Q&A' },
  { icon: Users, text: 'Comunidad privada' },
  { icon: Globe, text: 'Networking' },
];

export default function WhatsAppCommunityCard() {
  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:p-12"
        >
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              COMUNIDAD
            </span>
          </div>

          <h3 className="mt-4 font-[var(--font-headline)] text-2xl font-bold text-gray-dark md:text-3xl">
            ¿Quieres explorar acompañado/a?
          </h3>

          <p className="mt-4 text-gray-carbon">
            Si prefieres no hacerlo solo, la Comunidad{' '}
            <strong>&quot;Vive en Modo Remoto&quot;</strong> es un espacio de
            apoyo continuo con acceso a ofertas laborales, preguntas directas y
            encuentros en vivo.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {communityItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-dark">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 font-[var(--font-headline)] font-bold text-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(34,197,94,0.3)]"
          >
            <MessageCircle className="h-5 w-5" />
            Unirme al grupo de WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
