// Supabase record structure for 'productos' table
export interface ProductoRecord {
  id: string;
  created_at: string;
  updated_at: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precio_original: number | null;
  imagen_url: string | null;
  categoria:
    | 'curso'
    | 'ebook'
    | 'masterclass'
    | 'comunidad'
    | 'gratis'
    | 'asesoria';
  badge: string | null;
  features: string[] | null;
  es_destacado: boolean;
  es_gratis: boolean;
  es_suscripcion: boolean;
  intervalo: 'mensual' | 'trimestral' | 'anual' | '' | null;
  cta_texto: string;
  cta_link: string;
  stripe_price_id: string | null;
  download_url: string | null;
  whatsapp_link: string | null;
  orden: number;
  // Asesoria-specific columns
  duracion_minutos: number | null;
  subtitulo: string | null;
  nota: string | null;
  features_title: string | null;
  mostrar_en_planes: boolean;
  producto_padre: string | null;
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
  category:
    | 'curso'
    | 'ebook'
    | 'masterclass'
    | 'comunidad'
    | 'gratis'
    | 'asesoria';
  badge?: string;
  features?: string[];
  isFeatured: boolean;
  isFree: boolean;
  isSubscription: boolean;
  interval?: 'mensual' | 'trimestral' | 'anual';
  ctaText: string;
  ctaLink: string;
  stripePriceId?: string;
  downloadUrl?: string;
  whatsappLink?: string;
  order: number;
  parentProductId?: string;
  // Asesoria-specific fields
  duracionMinutos?: number;
  subtitle?: string;
  note?: string;
  featuresTitle?: string;
}

// Asesoria plan type (used by /asesorias page)
export interface AsesoriaPlan {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: 'USD';
  duration: string;
  duracionMinutos: number;
  description: string;
  featuresTitle?: string;
  features: string[];
  note?: string;
  isPopular: boolean;
  ctaText: string;
  stripePriceId: string;
}

// Payment plan (child product for split payments)
export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  stripePriceId: string;
  label?: string;
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
