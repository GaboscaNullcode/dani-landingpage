'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const trustQuotes = [
  'No te vendo un sueno, te doy las herramientas y la claridad para construirlo.',
  'He trabajado remotamente por anos y se exactamente lo que se necesita para empezar.',
  'Mi objetivo es que salgas con un plan claro, no con mas dudas.',
  'Cada persona es diferente, por eso mis sesiones son 100% personalizadas.',
];

export default function TrustSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-gray-dark">
            ¿Por que confiar en mi?
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {trustQuotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 rounded-2xl border border-gray-light/50 bg-cream p-6"
            >
              <Quote className="mt-1 h-5 w-5 shrink-0 text-coral" />
              <p className="font-[var(--font-headline)] text-sm font-medium text-gray-dark italic">
                &quot;{quote}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
