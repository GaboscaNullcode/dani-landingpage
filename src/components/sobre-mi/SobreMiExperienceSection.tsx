'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Calendar,
  Briefcase,
  Layers,
  Users,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

const experienceData = [
  {
    icon: Calendar,
    title: 'Soporte Administrativo & Ejecutivo',
    description:
      'Gestion de agendas, comunicacion con clientes, coordinacion de proyectos y operaciones diarias',
    color: 'coral',
    gradient: 'from-coral to-pink',
  },
  {
    icon: Briefcase,
    title: 'Social Media & Branding',
    description:
      'Estrategias de contenido, diseno, gestion de comunidades, storytelling, paginas web y brand kits',
    color: 'pink',
    gradient: 'from-pink to-lavender',
  },
  {
    icon: Layers,
    title: 'Gestion de Proyectos',
    description:
      'Coordinacion de equipos, optimizacion de procesos, flujos de trabajo, reclutamiento, KPIs y SOPs',
    color: 'lavender',
    gradient: 'from-lavender to-mint',
  },
  {
    icon: Users,
    title: 'Atencion al Cliente & Educacion',
    description:
      'Comunicacion clara, empatia y soluciones practicas para resolver problemas de manera efectiva',
    color: 'mint',
    gradient: 'from-mint to-lavender',
  },
  {
    icon: MessageCircle,
    title: 'Interpretacion',
    description:
      '8 anos de experiencia en servicio al cliente y medico para 5+ empresas americanas',
    color: 'coral',
    gradient: 'from-coral to-pink',
  },
];

const achievements = [
  'Trabaje con fundadores, CEOs y emprendedores internacionales',
  'Ascendi de posiciones basicas a lider y manager',
  'Bilingue ingles-espanol con experiencias internacionales',
  'Experiencias en Dinamarca, Estados Unidos, Work & Travel, Au Pair',
];

export default function SobreMiExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="bg-cream"
      style={{ padding: 'var(--section-padding) 2rem' }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-lavender/10 px-5 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="h-5 w-5 text-lavender" />
            <span className="text-sm font-semibold text-lavender">
              +6 anos de trayectoria
            </span>
          </motion.div>

          <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-black text-black-deep">
            Experiencia <span className="text-coral">Profesional</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-carbon">
            Areas en las que me he especializado a lo largo de mi carrera en el
            mundo digital
          </p>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experienceData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-lift group rounded-[24px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
              >
                {/* Icon */}
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent
                    className="h-8 w-8 text-white"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-[var(--font-headline)] text-xl font-extrabold text-black-deep">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-gray-carbon">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <h3 className="mb-8 text-center font-[var(--font-headline)] text-2xl font-bold text-black-deep">
            Logros <span className="text-pink">Destacados</span>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-pink">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="font-medium text-gray-carbon">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
