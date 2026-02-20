'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Calendar,
  Briefcase,
  Layers,
  Users,
  MessageCircle,
  Heart,
  Sparkles,
} from 'lucide-react';

const experienceData = [
  {
    icon: Calendar,
    title: 'Soporte Administrativo & Ejecutivo',
    description:
      'Gestión de agendas, comunicación con clientes, coordinación de proyectos y operaciones diarias.',
    color: 'coral',
    gradient: 'from-coral to-pink',
  },
  {
    icon: Briefcase,
    title: 'Social Media & Branding',
    description:
      'Estrategias de contenido, diseño, gestión de comunidades, storytelling, páginas web y brand kits.',
    color: 'pink',
    gradient: 'from-pink to-lavender',
  },
  {
    icon: Layers,
    title: 'Gestión de Proyectos & Operaciones',
    description:
      'Coordinación de equipos, optimización de procesos, flujos de trabajo, reclutamiento, KPIs y SOPs.',
    color: 'lavender',
    gradient: 'from-lavender to-mint',
  },
  {
    icon: Users,
    title: 'Atención al Cliente & Educación',
    description:
      'Comunicación clara, empatía y soluciones prácticas para resolver problemas de manera efectiva.',
    color: 'mint',
    gradient: 'from-mint to-lavender',
  },
  {
    icon: MessageCircle,
    title: 'Interpretación',
    description:
      'Más de 8 años de experiencia en interpretación de servicio al cliente y médico para empresas americanas.',
    color: 'coral',
    gradient: 'from-coral to-pink',
  },
  {
    icon: Heart,
    title: 'Coaching & Mentorías',
    description:
      'Acompañamiento consciente enfocado en claridad mental, reprogramación, regulación del sistema nervioso y crecimiento personal para sostener procesos de cambio.',
    color: 'pink',
    gradient: 'from-pink to-lavender',
  },
];

const achievements = [
  'He trabajado con fundadores, CEOs y emprendedores internacionales.',
  'Ascendí desde posiciones básicas como asistente virtual hasta roles de liderazgo y management.',
  'Bilingüe inglés–español con experiencia profesional internacional.',
  'Reclutadora en diversos rubros y equipos multiculturales.',
  'Experiencia en Dinamarca y Estados Unidos (Work & Travel, Au Pair).',
  'Hoy acompaño a personas como coach de trabajo remoto y coach integral.',
];

export default function SobreMiExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="bg-cream"
      style={{ padding: 'var(--section-padding) 0' }}
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
        >
          <h3 className="mb-8 text-center font-[var(--font-headline)] text-2xl font-bold text-black-deep">
            Logros <span className="text-pink">Destacados</span>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-pink">
                  <span className="text-sm font-bold text-white">
                    {index + 1}
                  </span>
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
