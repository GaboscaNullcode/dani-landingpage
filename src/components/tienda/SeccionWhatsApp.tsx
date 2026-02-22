'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51950907963'}`;

export default function SeccionWhatsApp() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink/5 via-white to-white py-16 md:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg md:p-10"
        >
          {/* Icon */}
          <motion.div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-pink shadow-md"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="h-7 w-7 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="mb-2 font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
            ¿Necesitas orientación personalizada?
          </h3>

          {/* Subtitle */}
          <p className="mb-5 text-gray-carbon">
            Escríbenos por WhatsApp y te ayudaremos a encontrar la mejor
            ruta para ti.
          </p>

          {/* Schedule */}
          <div className="mb-5 text-sm text-gray-carbon">
            <p className="font-bold text-black-deep">
              Horario de atención:
            </p>
            <p>Lunes a viernes: 10:00 a.m. – 5:00 p.m.</p>
            <p>Sábados y domingos: respuestas limitadas.</p>
            <p>Los mensajes se atienden por orden de llegada.</p>
          </div>

          {/* Weekend note */}
          <p className="mb-6 text-sm italic text-coral">
            Si escribes durante el fin de semana, podrías recibir respuesta
            el lunes.
          </p>

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-coral bg-white px-6 py-3 font-bold text-coral transition-all duration-200 hover:bg-coral hover:text-white"
          >
            Chatear por WhatsApp
            <Sparkles className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
