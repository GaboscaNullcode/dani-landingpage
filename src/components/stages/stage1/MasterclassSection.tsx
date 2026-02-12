'use client';

import { motion } from 'motion/react';
import {
  Play,
  Clock,
  CheckCircle,
  FileText,
  ClipboardCheck,
} from 'lucide-react';

const learningPoints = [
  'Qué es realmente el trabajo remoto y qué tipos existen',
  'Cómo saber si eres apto para trabajar desde casa',
  'Las plataformas reales donde encontrar trabajo',
  'Errores que comete el 90% de los que empiezan',
  'Cómo preparar tu perfil para aplicar',
  'Los primeros pasos concretos que puedes dar hoy',
];

const bonusItems = [
  {
    icon: FileText,
    title: 'Ruta de inicio 7 dias',
    description: 'Plan dia a dia para dar tu primer paso en el mundo remoto',
  },
  {
    icon: ClipboardCheck,
    title: 'Checklist documentos esenciales',
    description: 'Todo lo que necesitas tener listo antes de aplicar',
  },
];

export default function MasterclassSection() {
  return (
    <section id="masterclass" className="bg-cream py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex justify-center"
          >
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-700">
              GRATIS
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-section-title text-center font-[var(--font-headline)] font-bold text-gray-dark"
          >
            Masterclass{' '}
            <span className="gradient-text">
              &quot;Vive en Modo Remoto&quot;
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 flex items-center justify-center gap-2 text-gray-carbon"
          >
            <Clock className="h-5 w-5 text-coral" />
            <span className="font-medium">2 horas de contenido</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-center text-gray-carbon"
          >
            Una clase completa donde te explico todo lo que necesitas saber para
            entender si el trabajo remoto es para ti y dar tu primer paso con
            confianza.
          </motion.p>

          {/* Learning points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 rounded-2xl bg-white p-8 shadow-sm"
          >
            <h3 className="mb-6 font-[var(--font-headline)] text-lg font-bold text-gray-dark">
              Que vas a aprender
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {learningPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <span className="text-sm text-gray-carbon">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bonus items */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {bonusItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-peach text-coral">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-[var(--font-headline)] font-bold text-gray-dark">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-carbon">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <a
              href="#"
              className="btn-shimmer inline-flex items-center gap-3 rounded-full px-10 py-5 font-[var(--font-headline)] text-lg font-bold text-white"
              style={{ background: 'var(--gradient-coral-pink)' }}
            >
              <Play className="h-6 w-6" />
              Inscribirme Gratis y Ver Ahora
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
