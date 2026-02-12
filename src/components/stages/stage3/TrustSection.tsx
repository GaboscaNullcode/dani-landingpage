'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const trustQuotes = [
  'Aquí no eres un número más: las asesorías son directamente conmigo. Me encargo de revisar tu perfil y acompañarte en lo que TÚ necesitas.',
  'Acompañamiento real, sin intermediarios.',
  'No te voy a prometer cifras mágicas ni tiempos irreales. Lo que sí hago es acompañarte para que no te sabotees cuando llegue la oportunidad.',
  'Muchas personas llegan a entrevistas solas. La asesoría existe para que no llegues insegura.',
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
            ¿Por qué confiar en mí?
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
