import type { RecordModel } from 'pocketbase';

// PocketBase record structure for 'productos' collection
export interface ProductoRecord extends RecordModel {
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precio_original: number;
  imagen_url: string;
  categoria: 'curso' | 'ebook' | 'masterclass' | 'comunidad' | 'gratis';
  badge: string;
  features: string[];
  es_destacado: boolean;
  es_gratis: boolean;
  es_suscripcion: boolean;
  intervalo: 'mensual' | 'trimestral' | 'anual' | '';
  cta_texto: string;
  cta_link: string;
  stripe_price_id: string;
  orden: number;
  created: string;
  updated: string;
}

// Frontend product model
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: 'USD';
  image: string;
  category: 'curso' | 'ebook' | 'masterclass' | 'comunidad' | 'gratis';
  badge?: string;
  features?: string[];
  isFeatured: boolean;
  isFree: boolean;
  isSubscription: boolean;
  interval?: 'mensual' | 'trimestral' | 'anual';
  ctaText: string;
  ctaLink: string;
  stripePriceId?: string;
  order: number;
}

// Format price helper
export function formatPrice(
  price: number,
  currency: string = 'USD',
  interval?: string,
): string {
  if (price === 0) return 'Gratis';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);

  if (interval) {
    const intervalLabels: Record<string, string> = {
      mensual: '/mes',
      trimestral: '/trimestre',
      anual: '/año',
    };
    return `${formatted}${intervalLabels[interval] || ''}`;
  }

  return formatted;
}
