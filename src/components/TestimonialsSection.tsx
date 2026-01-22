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
} from 'lucide-react';

// Unsplash avatar URLs for testimonials
const avatarImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
];

const testimonials = [
  {
    text: 'Dani!! Quería contarte que las asesorías contigo me cambiaron la vida... me ayudaste muchísimo el apoyo emocional y a sentirme validada en mis capacidades.',
    platform: 'WhatsApp',
    icon: MessageCircle,
    gradientFrom: '#ff6b6b',
    gradientTo: '#e056a0',
  },
  {
    text: 'Completamente feliz con mi asesoría, con el cerebro llenito de información y mil ideas para desarrollar. Gracias Dani',
    platform: 'Instagram',
    icon: Camera,
    gradientFrom: '#e056a0',
    gradientTo: '#a78bfa',
  },
  {
    text: 'Dani holaaaaaaa ¡Aprobaron mi perfil de Workana!',
    platform: 'Instagram',
    icon: PartyPopper,
    gradientFrom: '#a78bfa',
    gradientTo: '#6ee7b7',
  },
  {
    text: 'Dani muchísimas gracias por tu asesoría, me has ayudado mucho con cada pauta, cada tip a realizar en este campo del trabajo remoto, eres toda una experta',
    platform: 'WhatsApp',
    icon: Sparkles,
    gradientFrom: '#6ee7b7',
    gradientTo: '#fcd34d',
  },
  {
    text: 'Ya estoy craneando cómo dar una correcta propuesta de trabajo. Pero ya estoy a nada del primer contrato',
    platform: 'Instagram',
    icon: Zap,
    gradientFrom: '#fcd34d',
    gradientTo: '#ff6b6b',
  },
  {
    text: 'Muchas gracias por la asesoría y el acompañamiento durante todo el inicio',
    platform: 'WhatsApp',
    icon: Heart,
    gradientFrom: '#ff6b6b',
    gradientTo: '#e056a0',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonios"
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ padding: 'var(--section-padding) 2rem' }}
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

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
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
            Ellas ya <span className="gradient-text-playful">confiaron</span> en mí
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-carbon">
            Conoce las experiencias de quienes ya dieron el salto al trabajo remoto
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  rotate: index % 2 === 0 ? 1 : -1,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
              >
                {/* Decorative gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.gradientFrom}20 0%, ${testimonial.gradientTo}20 100%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Platform Badge with icon */}
                  <div className="mb-4 flex items-center gap-2">
                    <motion.span
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                      style={{
                        background: `linear-gradient(135deg, ${testimonial.gradientFrom} 0%, ${testimonial.gradientTo} 100%)`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </motion.span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: `linear-gradient(135deg, ${testimonial.gradientFrom}15 0%, ${testimonial.gradientTo}15 100%)`,
                        color: testimonial.gradientFrom,
                      }}
                    >
                      {testimonial.platform}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="mb-4 font-[var(--font-dm-sans)] leading-relaxed text-gray-carbon">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.span
                        key={star}
                        className="text-sunshine"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + star * 0.05 }}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decoration with Unsplash avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="flex -space-x-3">
            {avatarImages.map((src, i) => (
              <motion.div
                key={i}
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md"
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                <Image
                  src={src}
                  alt={`Cliente ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </motion.div>
            ))}
          </div>
          <p className="text-gray-carbon">
            <span className="font-bold text-black-deep">+500</span> clientas satisfechas
          </p>
        </motion.div>
      </div>
    </section>
  );
}
