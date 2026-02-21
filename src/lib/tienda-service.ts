import { cache } from 'react';
import { createAnonSupabase, getServiceSupabase } from './supabase/server';
import type { ProductoRecord, Product, AsesoriaPlan } from '@/types/tienda';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';

// Transform Supabase record to Product
function transformProductRecord(record: ProductoRecord): Product {
  return {
    id: record.id,
    name: record.nombre,
    slug: record.slug,
    description: record.descripcion,
    price: record.precio,
    originalPrice: record.precio_original || undefined,
    currency: 'USD',
    image: record.imagen_url || FALLBACK_IMAGE,
    category: record.categoria,
    badge: record.badge || undefined,
    features: record.features || undefined,
    isFeatured: record.es_destacado,
    isFree: record.es_gratis,
    isSubscription: record.es_suscripcion,
    interval: record.intervalo || undefined,
    ctaText: record.cta_texto,
    ctaLink: record.cta_link,
    stripePriceId: record.stripe_price_id || undefined,
    downloadUrl: record.download_url || undefined,
    whatsappLink: record.whatsapp_link || undefined,
    order: record.orden || 0,
    duracionMinutos: record.duracion_minutos || undefined,
    subtitle: record.subtitulo || undefined,
    note: record.nota || undefined,
    featuresTitle: record.features_title || undefined,
  };
}

// Helper: format duration in minutes to readable text
function formatDuracion(minutos: number): string {
  if (minutos < 60) return `${minutos} minutos`;
  const hours = minutos / 60;
  if (Number.isInteger(hours)) {
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  return `${hours} horas`;
}

// Transform ProductoRecord to AsesoriaPlan
function transformToAsesoriaPlan(record: ProductoRecord): AsesoriaPlan {
  return {
    id: record.id,
    name: record.nombre,
    subtitle: record.subtitulo || '',
    price: record.precio,
    currency: 'USD',
    duration: formatDuracion(record.duracion_minutos || 0),
    duracionMinutos: record.duracion_minutos || 0,
    description: record.descripcion,
    featuresTitle: record.features_title || undefined,
    features: record.features || [],
    note: record.nota || undefined,
    isPopular: record.es_destacado,
    ctaText: record.cta_texto,
    stripePriceId: record.stripe_price_id || '',
  };
}

// Fetch all products (excludes asesorias)
export const getAllProducts = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .neq('categoria', 'asesoria')
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
});

// Fetch featured products (excludes asesorias)
export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('es_destacado', true)
      .eq('es_gratis', false)
      .neq('categoria', 'asesoria')
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
});

// Fetch additional (non-featured, non-free) products
export const getAdditionalProducts = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('es_destacado', false)
      .eq('es_gratis', false)
      .neq('categoria', 'comunidad')
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching additional products:', error);
    return [];
  }
});

// Fetch free resources
export const getFreeResources = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('es_gratis', true)
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching free resources:', error);
    return [];
  }
});

// Fetch community/subscription products
export const getCommunityProducts = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('categoria', 'comunidad')
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching community products:', error);
    return [];
  }
});

// Fetch a single product by slug
export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data ? transformProductRecord(data) : null;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  },
);

// Get all slugs for static generation (excludes asesorias)
export const getAllProductSlugs = cache(async (): Promise<string[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('slug')
      .neq('categoria', 'asesoria');

    if (error) throw error;
    return (data ?? []).map((r) => r.slug);
  } catch (error) {
    console.error('Error fetching product slugs:', error);
    return [];
  }
});

// ── Asesoria plans ──

// Fetch main asesoria plans (visible on /asesorias page)
export const getAsesoriaPlanes = cache(async (): Promise<AsesoriaPlan[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('categoria', 'asesoria')
      .eq('mostrar_en_planes', true)
      .order('orden', { ascending: true });

    if (error) throw error;
    return (data ?? []).map(transformToAsesoriaPlan);
  } catch (error) {
    console.error('Error fetching asesoria plans:', error);
    return [];
  }
});

// Fetch a single asesoria plan by ID
export const getAsesoriaPlanById = cache(
  async (planId: string): Promise<AsesoriaPlan | null> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', planId)
        .eq('categoria', 'asesoria')
        .single();

      if (error) throw error;
      return data ? transformToAsesoriaPlan(data) : null;
    } catch (error) {
      console.error('Error fetching asesoria plan:', error);
      return null;
    }
  },
);

// Fetch a single product by ID (used by Stripe webhook)
export async function getProductById(
  productId: string,
): Promise<ProductoRecord | null> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}
