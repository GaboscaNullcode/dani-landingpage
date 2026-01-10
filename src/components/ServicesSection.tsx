'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Check,
  Phone,
} from 'lucide-react';

const services = [
  {
    title: 'Masterclass',
    subtitle: 'Asistente Virtual',
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
    shadowColor: 'rgba(255, 107, 107, 0.3)',
    hoverShadow: 'rgba(255, 107, 107, 0.5)',
    accentColor: '#ff6b6b',
    features: [
      'Genera ingresos desde casa sin experiencia previa',
      'Aprende qué plataformas usar y errores comunes a evitar',
      'Incluye plantilla paso a paso y asesoría 1:1',
      'El camino más directo hacia la libertad laboral',
    ],
    href: '/masterclass',
    badge: 'Más Popular',
  },
  {
    title: 'Ebook',
    subtitle: 'Trabajo Remoto',
    icon: BookOpen,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6ee7b7 100%)',
    shadowColor: 'rgba(167, 139, 250, 0.3)',
    hoverShadow: 'rgba(167, 139, 250, 0.5)',
    accentColor: '#a78bfa',
    features: [
      'Plataformas exactas donde contratan freelancers',
      'Técnicas para destacar tu perfil sin experiencia',
      'Herramientas y plantillas prácticas incluidas',
      'Guía 360° con checklist y hojas de ruta',
    ],
    href: '/ebook',
    badge: null,
  },
  {
    title: 'Asesorías',
    subtitle: 'Personalizadas',
    icon: MessageCircle,
    gradient: 'linear-gradient(135deg, #e056a0 0%, #a78bfa 100%)',
    shadowColor: 'rgba(224, 86, 160, 0.3)',
    hoverShadow: 'rgba(224, 86, 160, 0.5)',
    accentColor: '#e056a0',
    features: [
      'Mentoría 1:1 100% personalizada',
      'CV y perfiles optimizados para plataformas',
      'Resolución efectiva de dudas con confianza total',
      'Feedback personalizado y tareas concretas',
    ],
    href: '/asesoria',
    badge: 'Premium',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-padding) 2rem',
        background: 'linear-gradient(135deg, #fef7f0 0%, #fce7f3 50%, #fef7f0 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="blob absolute -right-40 top-20 h-[500px] w-[500px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(252, 211, 77, 0.2) 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="blob absolute -left-32 bottom-0 h-[400px] w-[400px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 shadow-md backdrop-blur-sm"
          >
            <Sparkles className="h-5 w-5 text-coral" />
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-gray-dark">
              Elige tu camino
            </span>
          </motion.div>

          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
            Mis <span className="gradient-text-playful">Servicios</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
            Recursos diseñados para ayudarte a dar el salto al trabajo remoto,
            sin importar en qué etapa te encuentres.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -12,
                  rotate: index === 1 ? 0 : index === 0 ? -1 : 1,
                }}
                className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
              >
                {/* Badge */}
                {service.badge && (
                  <div
                    className="absolute -right-8 top-6 rotate-45 px-10 py-1 text-xs font-bold uppercase tracking-wider text-white"
                    style={{ background: service.gradient }}
                  >
                    {service.badge}
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] shadow-lg"
                  style={{
                    background: service.gradient,
                    boxShadow: `0 10px 30px ${service.shadowColor}`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <IconComponent className="h-10 w-10 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="mb-1 font-[var(--font-headline)] text-2xl font-bold text-black-deep">
                  {service.title}
                </h3>
                <p
                  className="mb-6 font-[var(--font-headline)] text-lg font-semibold"
                  style={{ color: service.accentColor }}
                >
                  {service.subtitle}
                </p>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3 text-gray-carbon"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.15 + idx * 0.1 }}
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-white"
                        style={{ background: service.gradient }}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={service.href}
                  className="btn-shimmer group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full py-4 font-[var(--font-headline)] text-sm font-bold uppercase tracking-wide text-white transition-all duration-500"
                  style={{
                    background: service.gradient,
                    boxShadow: `0 10px 30px ${service.shadowColor}`,
                  }}
                >
                  <span>Más Información</span>
                  <motion.div
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-gray-carbon">
            ¿No sabes por dónde empezar?{' '}
            <span className="font-semibold text-pink">¡Te ayudo a decidir!</span>
          </p>
          <Link
            href="/empezar"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-black-deep bg-white px-8 py-4 font-[var(--font-headline)] text-base font-bold text-black-deep transition-all duration-500 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-white hover:shadow-[0_15px_40px_rgba(255,107,107,0.3)]"
          >
            <span>Agenda una llamada gratis</span>
            <Phone className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
