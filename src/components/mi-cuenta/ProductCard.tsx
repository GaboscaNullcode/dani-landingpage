import Image from 'next/image';
import Link from 'next/link';
import { Download, ExternalLink, MessageCircle } from 'lucide-react';
import type { Compra } from '@/types/auth';

interface ProductCardProps {
  compra: Compra;
}

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

export default function ProductCard({ compra }: ProductCardProps) {
  const producto = compra.expand?.producto;
  if (!producto) return null;

  const isCancelled = compra.estado === 'cancelada';

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] ${
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

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              categoryColors[producto.categoria] || 'bg-gray-light text-gray-dark'
            }`}
          >
            {categoryLabels[producto.categoria] || producto.categoria}
          </span>
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
          <div>
            {producto.categoria === 'ebook' && (
              <a
                href={`/api/descargas/${compra.id}`}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Download className="h-4 w-4" />
                Descargar
              </a>
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                Ir al grupo
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
