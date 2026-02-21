'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  BookOpen,
  ExternalLink,
  Lock,
  CircleCheck,
  ArrowRight,
} from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import type { Compra } from '@/types/auth';
import type { Product } from '@/types/tienda';

interface PurchasedProductCardProps {
  compra: Compra;
  variant: 'purchased';
  index?: number;
}

interface LockedProductCardProps {
  product: Product;
  variant: 'locked';
  index?: number;
}

type ProductCardProps = PurchasedProductCardProps | LockedProductCardProps;

const categoryLabels: Record<string, string> = {
  ebook: 'E-book',
  curso: 'Curso',
  masterclass: 'Masterclass',
  comunidad: 'Comunidad',
  gratis: 'Gratis',
};

const categoryColors: Record<string, string> = {
  ebook: 'bg-lavender/15 text-lavender',
  curso: 'bg-coral/15 text-coral',
  masterclass: 'bg-pink/15 text-pink',
  comunidad: 'bg-mint/15 text-teal-dark',
  gratis: 'bg-sunshine/15 text-gray-dark',
};

export default function ProductCard(props: ProductCardProps) {
  const index = props.index ?? 0;

  if (props.variant === 'locked') {
    return <LockedCard product={props.product} index={index} />;
  }
  return <PurchasedCard compra={props.compra} index={index} />;
}

function LockedCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover grayscale-[80%] opacity-60 transition-all duration-300 group-hover:grayscale-[60%] group-hover:opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="h-10 w-10 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              categoryColors[product.category] || 'bg-gray-light text-gray-dark'
            }`}
          >
            {categoryLabels[product.category] || product.category}
          </span>
        </div>

        <h3 className="mb-2 font-[var(--font-headline)] text-lg font-bold text-black-deep">
          {product.name}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-carbon">
          {product.description}
        </p>

        <Link
          href={`/tienda/${product.slug}`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink px-4 py-2.5 text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Obtener acceso
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

function PurchasedCard({ compra, index }: { compra: Compra; index: number }) {
  const producto = compra.productoDetail;
  if (!producto) return null;

  const isCancelled = compra.estado === 'cancelada';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!isCancelled ? { y: -6, transition: { duration: 0.25 } } : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] ${
        isCancelled ? 'opacity-70' : ''
      }`}
    >
      {isCancelled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-[2px]">
          <span className="rounded-full bg-red-100 px-4 py-1.5 text-sm font-bold text-red-600">
            Cancelada
          </span>
        </div>
      )}

      {producto.imagen_url && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={producto.imagen_url}
            alt={producto.nombre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              categoryColors[producto.categoria] || 'bg-gray-light text-gray-dark'
            }`}
          >
            {categoryLabels[producto.categoria] || producto.categoria}
          </span>
          {!isCancelled && (
            <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-teal-dark">
              <CircleCheck className="h-3 w-3" />
              Disponible
            </span>
          )}
          {compra.stripeSubscriptionId && compra.estado === 'activa' && (
            <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-teal-dark">
              Suscripcion activa
            </span>
          )}
        </div>

        <h3 className="mb-4 font-[var(--font-headline)] text-lg font-bold text-black-deep">
          {producto.nombre}
        </h3>

        {!isCancelled && (
          <div className="mt-auto">
            {producto.categoria === 'ebook' && (
              <Link
                href={`/mi-cuenta/viewer/${compra.id}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink px-4 py-2.5 text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <BookOpen className="h-4 w-4" />
                Ver contenido
              </Link>
            )}

            {(producto.categoria === 'curso' ||
              producto.categoria === 'masterclass') && (
              <button
                disabled
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink px-4 py-2.5 text-sm font-bold text-white opacity-75"
              >
                <ExternalLink className="h-4 w-4" />
                Acceder (proximamente)
              </button>
            )}

            {producto.categoria === 'comunidad' && producto.whatsapp_link && (
              <Link
                href={producto.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ir al grupo
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
