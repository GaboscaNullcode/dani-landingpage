'use client';

import { motion } from 'motion/react';
import {
  Target,
  User,
  FileText,
  MessageCircle,
  DollarSign,
  CheckCircle,
  Sparkles,
  RefreshCw,
  Shield,
} from 'lucide-react';
import { contenidoAsesoria, politicas } from '@/data/asesorias-data';

const iconMap: Record<string, React.ElementType> = {
  target: Target,
  user: User,
  'file-text': FileText,
  'message-circle': MessageCircle,
  'dollar-sign': DollarSign,
  'check-circle': CheckCircle,
};

export default function ContenidoSection() {
  return (
    <>
      {/* Contenido Section */}
      <section className="relative overflow-hidden py-24" style={{ background: 'var(--cream)' }}>
        {/* Decorative blob */}
        <motion.div
          className="blob absolute -right-40 top-20 h-[400px] w-[400px] opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-coral shadow-sm">
              <Sparkles className="h-4 w-4" />
              Lo que trabajaremos
            </span>
            <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
              Contenido de las Asesorías
            </h2>
            <p className="text-lg text-gray-carbon">
              Cada sesión está diseñada para darte herramientas prácticas y resultados tangibles.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contenidoAsesoria.map((item, index) => {
              const IconComponent = iconMap[item.icon] || CheckCircle;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                    }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-gray-dark">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-carbon">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Políticas Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Reprogramación */}
              <div className="rounded-2xl border border-gray-light p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender/10">
                    <RefreshCw className="h-5 w-5 text-lavender" />
                  </div>
                  <h3 className="font-[var(--font-headline)] font-bold text-gray-dark">
                    {politicas.reprogramacion.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-carbon">
                  {politicas.reprogramacion.content}
                </p>
              </div>

              {/* Reembolso */}
              <div className="rounded-2xl border border-gray-light p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint/10">
                    <Shield className="h-5 w-5 text-mint" />
                  </div>
                  <h3 className="font-[var(--font-headline)] font-bold text-gray-dark">
                    {politicas.reembolso.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-carbon">
                  {politicas.reembolso.content}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
        }}
      >
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-white md:text-4xl">
              ¿Lista para dar el siguiente paso?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
              Agenda tu asesoría hoy y comienza a construir la carrera remota que mereces.
            </p>
            <a
              href="#planes"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[var(--font-headline)] font-bold text-coral shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              Ver Planes Disponibles
            </a>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
      </section>
    </>
  );
}
