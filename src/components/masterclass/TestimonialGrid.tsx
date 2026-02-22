'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, Instagram, Quote } from 'lucide-react';
import type { TestimonioMasterclass } from '@/types/masterclass';

interface TestimonialGridProps {
  testimonials: TestimonioMasterclass[];
}

const cardGradients = [
  { from: '#ff6b6b', to: '#e056a0' },
  { from: '#e056a0', to: '#a78bfa' },
  { from: '#a78bfa', to: '#6ee7b7' },
  { from: '#6ee7b7', to: '#fcd34d' },
  { from: '#fcd34d', to: '#ff6b6b' },
];

function TestimonialCard({
  testimonial,
  index,
  isInView,
}: {
  testimonial: TestimonioMasterclass;
  index: number;
  isInView: boolean;
}) {
  const gradient = cardGradients[index % cardGradients.length];

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
          background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        }}
      />

      {/* Inner card */}
      <div className="relative z-10 rounded-[26px] bg-white p-6">
        {/* Decorative quote */}
        <motion.div
          className="absolute -right-2 -top-2 opacity-[0.07]"
          style={{ color: gradient.from }}
        >
          <Quote className="h-24 w-24" strokeWidth={1} />
        </motion.div>

        {/* Header: Emoji avatar + Social badge */}
        <div className="mb-5 flex items-start justify-between">
          {/* Emoji avatar with gradient ring */}
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full opacity-80"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-white text-2xl shadow-lg">
              {testimonial.icon}
            </div>
            {/* Pulse indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Social badge */}
          {testimonial.socialNetwork && testimonial.socialUsername && (
            <motion.div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}12 0%, ${gradient.to}12 100%)`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Instagram
                className="h-3.5 w-3.5"
                style={{ color: gradient.from }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: gradient.from }}
              >
                Instagram
              </span>
            </motion.div>
          )}
        </div>

        {/* Quote text */}
        <p className="relative z-10 mb-5 line-clamp-4 font-[var(--font-dm-sans)] text-[15px] leading-relaxed text-gray-carbon">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Footer: Name + Stars */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <h4
              className="font-[var(--font-headline)] text-sm font-bold"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
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
                <Star
                  className={`h-3.5 w-3.5 ${star <= testimonial.stars ? 'fill-current' : 'text-gray-light'}`}
                />
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialGrid({
  testimonials,
}: TestimonialGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Duplicate for seamless infinite carousel
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div ref={ref} className="relative">
      {/* Gradient fade left */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent md:w-48" />
      {/* Gradient fade right */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent md:w-48" />

      {/* Carousel track */}
      <div className="overflow-hidden py-4">
        <div
          className="flex gap-6 animate-carousel"
          style={{ width: 'max-content' }}
        >
          {duplicated.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
              index={index % testimonials.length}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
