import { cache } from 'react';
import { getPocketBase } from './pocketbase';
import type { ProductoRecord, Product } from '@/types/tienda';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';

// Transform PocketBase record to Product
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
    const pb = getPocketBase();
    const records = await pb
      .collection('productos')
      .getFullList<ProductoRecord>({
        sort: 'orden,-created',
      });
    return records.map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
});

// Fetch featured products
export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  try {
    const pb = getPocketBase();
    const records = await pb
      .collection('productos')
      .getFullList<ProductoRecord>({
        filter: 'es_destacado = true && es_gratis = false',
        sort: 'orden,-created',
      });
    return records.map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
});

// Fetch additional (non-featured, non-free) products
export const getAdditionalProducts = cache(async (): Promise<Product[]> => {
  try {
    const pb = getPocketBase();
    const records = await pb
      .collection('productos')
      .getFullList<ProductoRecord>({
        filter:
          'es_destacado = false && es_gratis = false && categoria != "comunidad"',
        sort: 'orden,-created',
      });
    return records.map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching additional products:', error);
    return [];
  }
});

// Fetch free resources
export const getFreeResources = cache(async (): Promise<Product[]> => {
  try {
    const pb = getPocketBase();
    const records = await pb
      .collection('productos')
      .getFullList<ProductoRecord>({
        filter: 'es_gratis = true',
        sort: 'orden,-created',
      });
    return records.map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching free resources:', error);
    return [];
  }
});

// Fetch community/subscription products
export const getCommunityProducts = cache(async (): Promise<Product[]> => {
  try {
    const pb = getPocketBase();
    const records = await pb
      .collection('productos')
      .getFullList<ProductoRecord>({
        filter: 'categoria = "comunidad"',
        sort: 'orden,-created',
      });
    return records.map(transformProductRecord);
  } catch (error) {
    console.error('Error fetching community products:', error);
    return [];
  }
});

// Fetch a single product by slug
export const getProductBySlug = cache(async (
  slug: string,
): Promise<Product | null> => {
  try {
    const pb = getPocketBase();
    const record = await pb
      .collection('productos')
      .getFirstListItem<ProductoRecord>(`slug = "${slug}"`);
    return transformProductRecord(record);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
});

// Get all slugs for static generation
export const getAllProductSlugs = cache(async (): Promise<string[]> => {
  try {
    const pb = getPocketBase();
    const records = await pb
      .collection('productos')
      .getFullList<ProductoRecord>({
        fields: 'slug',
      });
    return records.map((r) => r.slug);
  } catch (error) {
    console.error('Error fetching product slugs:', error);
    return [];
  }
});
