'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Calendar,
  Briefcase,
  Layers,
  Users,
  MessageCircle,
} from 'lucide-react';

const experienceData = [
  {
    icon: Calendar,
    title: 'Soporte Administrativo',
  },
  {
    icon: Briefcase,
    title: 'Redes Sociales',
  },
  {
    icon: Layers,
    title: 'Gestión de Proyectos',
  },
  {
    icon: Users,
    title: 'Atención al Cliente',
  },
  {
    icon: MessageCircle,
    title: 'Interpretación',
  },
];

export default function ExperienceSection() {
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
          <h2 className="text-section-title font-[var(--font-headline)] font-black text-black-deep">
            Áreas donde puedo <span className="text-coral">guiarte</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {experienceData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-lift group rounded-[20px] bg-white p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
              >
                {/* Icon */}
                <div className="icon-gradient mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="h-8 w-8 text-white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="font-[var(--font-headline)] text-lg font-extrabold text-black-deep">
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
