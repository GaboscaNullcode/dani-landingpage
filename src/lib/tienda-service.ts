import { cache } from 'react';
import { createAnonSupabase, getServiceSupabase } from './supabase/server';
import type { ProductoRecord, Product } from '@/types/tienda';

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
  };
}

// Fetch all products
export const getAllProducts = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
});

// Fetch featured products
export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('es_destacado', true)
      .eq('es_gratis', false)
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

// Get all slugs for static generation
export const getAllProductSlugs = cache(async (): Promise<string[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase.from('productos').select('slug');

    if (error) throw error;
    return (data ?? []).map((r) => r.slug);
  } catch (error) {
    console.error('Error fetching product slugs:', error);
    return [];
  }
});

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
