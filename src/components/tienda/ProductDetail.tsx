'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  Star,
  Shield,
  Clock,
  Download,
  Play,
  Users,
  ArrowLeft,
  Sparkles,
  Gift,
} from 'lucide-react';
import type { Product } from '@/types/tienda';
import { formatPrice } from '@/types/tienda';
import CheckoutButton from './CheckoutButton';

interface ProductDetailProps {
  product: Product;
}

const categoryIcons: Record<string, React.ElementType> = {
  curso: Play,
  ebook: Download,
  masterclass: Play,
  comunidad: Users,
  gratis: Gift,
};

const categoryLabels: Record<string, string> = {
  curso: 'Curso Online',
  ebook: 'eBook Digital',
  masterclass: 'Masterclass',
  comunidad: 'Comunidad',
  gratis: 'Recurso Gratuito',
};

// Testimonios de ejemplo (se podrían mover a un archivo de datos)
const testimonials = [
  {
    name: 'María González',
    role: 'Asistente Virtual',
    content:
      'Este recurso cambió completamente mi perspectiva. Las estrategias son claras y prácticas.',
    avatar: '/images/testimonials/avatar-1.jpg',
  },
  {
    name: 'Laura Mendez',
    role: 'Freelancer',
    content:
      'Gracias a esto conseguí mis primeros 3 clientes en menos de un mes. Totalmente recomendado.',
    avatar: '/images/testimonials/avatar-2.jpg',
  },
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const CategoryIcon = categoryIcons[product.category] || Download;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background: 'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
        }}
      >
        {/* Decorative blobs */}
        <motion.div
          className="blob absolute -right-40 -top-40 h-[500px] w-[500px] opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container-custom relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 text-gray-carbon transition-colors hover:text-coral"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a la tienda</span>
            </Link>
          </motion.div>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.badge && (
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-xs font-bold text-white">
                    <Star className="h-3 w-3 fill-white" />
                    {product.badge}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Category badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <CategoryIcon className="h-4 w-4 text-coral" />
                <span className="text-sm font-semibold text-gray-dark">
                  {categoryLabels[product.category]}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-4 font-[var(--font-headline)] text-3xl font-bold text-gray-dark md:text-4xl">
                {product.name}
              </h1>

              {/* Description */}
              <p className="mb-6 text-lg leading-relaxed text-gray-carbon">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8 flex items-baseline gap-3">
                <span className="font-[var(--font-headline)] text-4xl font-bold text-gray-dark">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-medium line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="rounded-full bg-mint/20 px-3 py-1 text-sm font-semibold text-green-700">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
                    Lo que incluye:
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-coral">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-carbon">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              {product.stripePriceId ? (
                <CheckoutButton
                  priceId={product.stripePriceId}
                  className="btn-shimmer mb-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 font-[var(--font-headline)] text-lg font-bold text-white transition-all hover:-translate-y-1 md:w-auto md:px-10"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                    boxShadow: '0 10px 40px rgba(255, 107, 107, 0.3)',
                  }}
                >
                  {product.ctaText}
                </CheckoutButton>
              ) : (
                <a
                  href={product.ctaLink}
                  className="btn-shimmer mb-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 font-[var(--font-headline)] text-lg font-bold text-white transition-all hover:-translate-y-1 md:w-auto md:px-10"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
                    boxShadow: '0 10px 40px rgba(255, 107, 107, 0.3)',
                  }}
                >
                  {product.ctaText}
                </a>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-mint" />
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-lavender" />
                  <span>Acceso inmediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-coral" />
                  <span>Descarga ilimitada</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,125.67,82.39,321.39,56.44Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
              <Sparkles className="h-4 w-4" />
              Testimonios
            </span>
            <h2 className="text-section-title mb-4 font-[var(--font-headline)] font-bold text-gray-dark">
              Lo que dicen quienes lo han probado
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-cream p-6"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sunshine text-sunshine" />
                  ))}
                </div>
                <p className="mb-4 italic text-gray-carbon">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-coral to-pink" />
                  <div>
                    <p className="font-semibold text-gray-dark">{testimonial.name}</p>
                    <p className="text-sm text-gray-medium">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              ¿Lista para empezar?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
              Da el primer paso hacia tu carrera remota hoy.
            </p>
            {product.stripePriceId ? (
              <CheckoutButton
                priceId={product.stripePriceId}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[var(--font-headline)] font-bold text-coral shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {product.ctaText}
              </CheckoutButton>
            ) : (
              <a
                href={product.ctaLink}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[var(--font-headline)] font-bold text-coral shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {product.ctaText}
              </a>
            )}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
      </section>
    </>
  );
}
