'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Star, Instagram, Quote, User, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import type { TestimonioMasterclass } from '@/types/masterclass';

interface TestimonialCarouselProps {
  testimonials: TestimonioMasterclass[];
}

const cardGradients = [
  { from: '#ff6b6b', to: '#e056a0' },
  { from: '#e056a0', to: '#a78bfa' },
  { from: '#a78bfa', to: '#6ee7b7' },
  { from: '#6ee7b7', to: '#fcd34d' },
  { from: '#fcd34d', to: '#ff6b6b' },
];

/* ─── Modal ─── */

function TestimonialModal({
  testimonial,
  gradient,
  onClose,
}: {
  testimonial: TestimonioMasterclass;
  gradient: { from: string; to: string };
  onClose: () => void;
}) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] bg-white p-1"
        style={{
          boxShadow: `0 25px 80px rgba(0,0,0,0.18), 0 0 0 1px ${gradient.from}20`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Testimonio de ${testimonial.name}`}
      >
        {/* Gradient border */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-60"
          style={{
            background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
          }}
        />

        {/* Inner content */}
        <div className="relative z-10 rounded-[26px] bg-white p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Decorative quote */}
          <div
            className="absolute -right-4 -top-4 opacity-[0.05]"
            style={{ color: gradient.from }}
          >
            <Quote className="h-32 w-32" strokeWidth={1} />
          </div>

          {/* Avatar + info header */}
          <div className="mb-6 flex items-center gap-4">
            {/* Avatar with gradient ring */}
            <div className="relative flex-shrink-0">
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
              {testimonial.avatarUrl ? (
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-[3px] border-white shadow-lg">
                  <Image
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-lg">
                  <User
                    className="h-7 w-7"
                    style={{ color: gradient.from }}
                  />
                </div>
              )}
            </div>

            <div>
              <h3
                className="font-[var(--font-headline)] text-lg font-bold"
                style={{
                  background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-medium">{testimonial.role}</p>

              {/* Social badge */}
              {testimonial.socialNetwork && testimonial.socialUsername && (
                <div
                  className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    background: `linear-gradient(135deg, ${gradient.from}12 0%, ${gradient.to}12 100%)`,
                  }}
                >
                  <Instagram
                    className="h-3.5 w-3.5"
                    style={{ color: gradient.from }}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: gradient.from }}
                  >
                    {testimonial.socialNetwork}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Full quote text */}
          <p className="relative z-10 mb-6 font-[var(--font-inter)] text-base leading-relaxed text-gray-carbon">
            &ldquo;{testimonial.text}&rdquo;
          </p>

          {/* Stars */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 text-sunshine ${star <= testimonial.stars ? 'fill-current' : 'text-gray-light'}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ─── Card ─── */

function TestimonialCard({
  testimonial,
  index,
  isInView,
  isSectionVisible,
  onOpenModal,
}: {
  testimonial: TestimonioMasterclass;
  index: number;
  isInView: boolean;
  isSectionVisible: boolean;
  onOpenModal: () => void;
}) {
  const gradient = cardGradients[index % cardGradients.length];
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [testimonial.text]);

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

        {/* Header: Avatar + Social badge */}
        <div className="mb-5 flex items-start justify-between">
          {/* Avatar with gradient ring */}
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full opacity-80"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
              }}
              animate={isSectionVisible ? { rotate: [0, 360] } : false}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            {testimonial.avatarUrl ? (
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-white shadow-lg">
                <Image
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="56px"
                />
              </div>
            ) : (
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-lg">
                <User
                  className="h-6 w-6"
                  style={{ color: gradient.from }}
                />
              </div>
            )}
            {/* Pulse indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
              }}
              animate={isSectionVisible ? { scale: [1, 1.2, 1] } : false}
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
                {testimonial.socialNetwork}
              </span>
            </motion.div>
          )}
        </div>

        {/* Quote text (always truncated) */}
        <div className="relative z-10 mb-5">
          <p
            ref={textRef}
            className="line-clamp-4 font-[var(--font-inter)] text-[15px] leading-relaxed text-gray-carbon"
          >
            &ldquo;{testimonial.text}&rdquo;
          </p>

          {/* Read more → opens modal */}
          {isTruncated && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal();
              }}
              className="mt-2 text-xs font-semibold transition-colors duration-200 hover:underline"
              style={{ color: gradient.from }}
            >
              Leer más
            </button>
          )}
        </div>

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

/* ─── Carousel ─── */

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isSectionVisible = useInView(ref, { margin: '100px' });

  const [modalData, setModalData] = useState<{
    testimonial: TestimonioMasterclass;
    gradientIndex: number;
  } | null>(null);

  const closeModal = useCallback(() => setModalData(null), []);

  // Duplicate for seamless infinite carousel
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div ref={ref} className="relative" role="region" aria-label="Testimonios de estudiantes" aria-roledescription="carousel">
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
          {duplicated.map((testimonial, index) => {
            const originalIndex = index % testimonials.length;
            return (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
                index={originalIndex}
                isInView={isInView}
                isSectionVisible={isSectionVisible}
                onOpenModal={() =>
                  setModalData({
                    testimonial,
                    gradientIndex: originalIndex,
                  })
                }
              />
            );
          })}
        </div>
      </div>

      {/* Modal (portaled to body) */}
      <AnimatePresence>
        {modalData && (
          <TestimonialModal
            testimonial={modalData.testimonial}
            gradient={
              cardGradients[modalData.gradientIndex % cardGradients.length]
            }
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
