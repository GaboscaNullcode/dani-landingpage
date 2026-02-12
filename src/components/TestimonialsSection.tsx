'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import {
  MessageCircle,
  Camera,
  PartyPopper,
  Star,
  Sparkles,
  Zap,
  Heart,
  Quote,
} from 'lucide-react';

const testimonials = [
  {
    text: 'Dani!! Quería contarte que las asesorías contigo me cambiaron la vida... me ayudaste muchísimo el apoyo emocional y a sentirme validada en mis capacidades.',
    name: 'María García',
    role: 'Asistente Virtual',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    platform: 'WhatsApp',
    icon: MessageCircle,
    gradientFrom: '#ff6b6b',
    gradientTo: '#e056a0',
  },
  {
    text: 'Completamente feliz con mi asesoría, con el cerebro llenito de información y mil ideas para desarrollar. Gracias Dani',
    name: 'Ana Rodríguez',
    role: 'Freelancer de Diseño',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    platform: 'Instagram',
    icon: Camera,
    gradientFrom: '#e056a0',
    gradientTo: '#a78bfa',
  },
  {
    text: 'Dani holaaaaaaa ¡Aprobaron mi perfil de Workana!',
    name: 'Lucía Martínez',
    role: 'Community Manager',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    platform: 'Instagram',
    icon: PartyPopper,
    gradientFrom: '#a78bfa',
    gradientTo: '#6ee7b7',
  },
  {
    text: 'Dani muchísimas gracias por tu asesoría, me has ayudado mucho con cada pauta, cada tip a realizar en este campo del trabajo remoto, eres toda una experta',
    name: 'Camila Torres',
    role: 'Virtual Assistant',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    platform: 'WhatsApp',
    icon: Sparkles,
    gradientFrom: '#6ee7b7',
    gradientTo: '#fcd34d',
  },
  {
    text: 'Ya estoy craneando cómo dar una correcta propuesta de trabajo. Pero ya estoy a nada del primer contrato',
    name: 'Valentina Ruiz',
    role: 'Copywriter Freelance',
    avatar:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face',
    platform: 'Instagram',
    icon: Zap,
    gradientFrom: '#fcd34d',
    gradientTo: '#ff6b6b',
  },
  {
    text: 'Muchas gracias por la asesoría y el acompañamiento durante todo el inicio',
    name: 'Isabella López',
    role: 'Social Media Manager',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
    platform: 'WhatsApp',
    icon: Heart,
    gradientFrom: '#ff6b6b',
    gradientTo: '#e056a0',
  },
];

// Duplicate testimonials for seamless infinite loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
  index: number;
  isInView: boolean;
}

function TestimonialCard({
  testimonial,
  index,
  isInView,
}: TestimonialCardProps) {
  const IconComponent = testimonial.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.1, 0.5),
        type: 'spring',
        stiffness: 80,
      }}
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      className="group relative w-[300px] flex-shrink-0 overflow-hidden rounded-[28px] bg-white p-1 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] md:w-[380px]"
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${testimonial.gradientFrom} 0%, ${testimonial.gradientTo} 100%)`,
        }}
      />

      {/* Inner card container */}
      <div className="relative z-10 rounded-[26px] bg-white p-6">
        {/* Quote icon decorative */}
        <motion.div
          className="absolute -right-2 -top-2 opacity-[0.07]"
          style={{ color: testimonial.gradientFrom }}
        >
          <Quote className="h-24 w-24" strokeWidth={1} />
        </motion.div>

        {/* Header: Avatar + Platform */}
        <div className="mb-5 flex items-start justify-between">
          {/* Avatar container with gradient ring */}
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full opacity-80"
              style={{
                background: `linear-gradient(135deg, ${testimonial.gradientFrom} 0%, ${testimonial.gradientTo} 100%)`,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-white shadow-lg">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="56px"
              />
            </div>
            {/* Online indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white"
              style={{
                background: `linear-gradient(135deg, ${testimonial.gradientFrom} 0%, ${testimonial.gradientTo} 100%)`,
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Platform Badge */}
          <motion.div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              background: `linear-gradient(135deg, ${testimonial.gradientFrom}12 0%, ${testimonial.gradientTo}12 100%)`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <IconComponent
              className="h-3.5 w-3.5"
              style={{ color: testimonial.gradientFrom }}
            />
            <span
              className="text-xs font-semibold"
              style={{ color: testimonial.gradientFrom }}
            >
              {testimonial.platform}
            </span>
          </motion.div>
        </div>

        {/* Message */}
        <p className="relative z-10 mb-5 line-clamp-4 font-[var(--font-dm-sans)] text-[15px] leading-relaxed text-gray-carbon">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Footer: Name + Stars */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          {/* User info */}
          <div>
            <h4
              className="font-[var(--font-headline)] text-sm font-bold"
              style={{
                background: `linear-gradient(135deg, ${testimonial.gradientFrom} 0%, ${testimonial.gradientTo} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {testimonial.name}
            </h4>
            <p className="text-xs text-gray-medium">{testimonial.role}</p>
          </div>

          {/* Stars */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.span
                key={star}
                className="text-sunshine"
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  delay: Math.min(index * 0.1, 0.5) + star * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonios"
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 0' }}
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="blob absolute -left-32 top-1/4 h-[350px] w-[350px] opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(224, 86, 160, 0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="blob absolute -right-20 bottom-20 h-[280px] w-[280px] opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(110, 231, 183, 0.2) 100%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating icon decorations */}
        <motion.div
          className="absolute left-[10%] top-[15%] flex h-12 w-12 items-center justify-center rounded-full bg-sunshine/30 opacity-50"
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Star className="h-6 w-6 text-sunshine" />
        </motion.div>
        <motion.div
          className="absolute right-[15%] top-[25%] flex h-10 w-10 items-center justify-center rounded-full bg-pink/30 opacity-40"
          animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Heart className="h-5 w-5 text-pink" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container-custom mb-14 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink/10 px-5 py-2"
          >
            <Sparkles className="h-5 w-5 text-pink" />
            <span className="font-[var(--font-dm-sans)] text-sm font-semibold text-pink">
              Historias reales
            </span>
          </motion.div>

          <h2 className="text-section-title font-[var(--font-headline)] font-bold text-black-deep">
            Ellas ya <span className="gradient-text-playful">confiaron</span> en
            mí
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
            Conoce las experiencias de quienes ya dieron el salto al trabajo
            remoto
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <div className="relative">
          {/* Gradient fade left */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent md:w-48" />
          {/* Gradient fade right */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent md:w-48" />

          {/* Carousel track */}
          <div className="overflow-hidden py-4">
            <div
              className="flex gap-6 animate-carousel"
              style={{
                width: 'max-content',
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.name}-${index}`}
                  testimonial={testimonial}
                  index={index % testimonials.length}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
