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
  'La diferencia real entre Trabajo Remoto y Asistencia Virtual, y cómo elegir el camino que más se ajusta a ti.',
  'Nichos reales y oportunidades actuales, más allá de los roles saturados.',
  'Plataformas de trabajo remoto y cómo usarlas de forma estratégica.',
  'Documentos necesarios para postular y cómo prepararlos correctamente.',
  'Herramientas esenciales (organización, comunicación, diseño y pagos).',
  'Un cambio de enfoque para ver el trabajo remoto con más claridad y realismo.',
];

const bonusItems = [
  {
    icon: FileText,
    title: 'Ruta de inicio 7 días',
    description: 'Plan día a día para dar tu primer paso en el mundo remoto',
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
            className="text-center font-[var(--font-headline)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-gray-dark"
          >
            Masterclass{' '}
            <span className="gradient-text">
              &ldquo;Vive en Modo Remoto&rdquo;
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
            className="mt-6 text-left text-gray-carbon"
          >
            En esta masterclass gratuita de 2 horas, Dani te explica cómo iniciar
            en el trabajo remoto desde cero: qué opciones existen, qué busca el
            mercado, qué necesitas para postular y cómo evitar errores comunes al
            empezar. Es una sesión clara, práctica y honesta para ayudarte a
            decidir tu siguiente paso con más criterio.
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
              Qué vas a aprender
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
              href="/tienda/masterclass-gratuita"
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
