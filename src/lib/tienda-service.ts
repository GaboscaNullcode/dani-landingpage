import { cache } from 'react';
import { createAnonSupabase, getServiceSupabase } from './supabase/server';
import type {
  ProductoRecord,
  Product,
  AsesoriaPlan,
  PaymentPlan,
  CategoriaProductoRecord,
  ProductCategory,
} from '@/types/tienda';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';

// Transform CategoriaProductoRecord to ProductCategory
function transformCategoryRecord(
  record: CategoriaProductoRecord,
): ProductCategory {
  return {
    id: record.id,
    name: record.nombre,
    slug: record.slug,
    subtitle: record.subtitulo,
    description: record.descripcion,
    accentColor: record.color_acento,
    order: record.orden,
  };
}

// Transform Supabase record to Product
// When descuento_activo is true, swaps price/stripePriceId with the discount
// values and sets originalPrice so components can show a strikethrough price.
function transformProductRecord(record: ProductoRecord): Product {
  const hasActiveDiscount =
    record.descuento_activo &&
    record.precio_descuento != null &&
    record.stripe_price_id_descuento != null;

  return {
    id: record.id,
    name: record.nombre,
    slug: record.slug,
    description: record.descripcion,
    price: hasActiveDiscount ? record.precio_descuento! : record.precio,
    originalPrice: hasActiveDiscount
      ? record.precio
      : record.precio_original || undefined,
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
    stripePriceId: hasActiveDiscount
      ? record.stripe_price_id_descuento!
      : record.stripe_price_id || undefined,
    downloadUrl: record.download_url || undefined,
    whatsappLink: record.whatsapp_link || undefined,
    order: record.orden || 0,
    parentProductId: record.producto_padre || undefined,
    levelId: record.nivel || undefined,
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
      .is('producto_padre', null)
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

// Fetch payment plans (child products) for a parent product
export const getPaymentPlans = cache(
  async (parentId: string): Promise<PaymentPlan[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('productos')
        .select('id, nombre, precio, stripe_price_id, badge')
        .eq('producto_padre', parentId)
        .order('orden', { ascending: true });

      if (error) throw error;
      return (data ?? []).map((r) => ({
        id: r.id,
        name: r.nombre,
        price: r.precio,
        stripePriceId: r.stripe_price_id || '',
        label: r.badge || undefined,
      }));
    } catch (error) {
      console.error('Error fetching payment plans:', error);
      return [];
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

// ── Product categories (levels) ──

// Fetch all product categories ordered by `orden`
export const getAllProductCategories = cache(
  async (): Promise<ProductCategory[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('categorias_producto')
        .select('*')
        .order('orden', { ascending: true });

      if (error) throw error;
      return (data ?? []).map(transformCategoryRecord);
    } catch (error) {
      console.error('Error fetching product categories:', error);
      return [];
    }
  },
);

// Fetch all products grouped by level (with category join)
export const getProductsByLevel = cache(
  async (): Promise<
    { category: ProductCategory; products: Product[] }[]
  > => {
    try {
      const supabase = createAnonSupabase();

      const [categoriesRes, productsRes] = await Promise.all([
        supabase
          .from('categorias_producto')
          .select('*')
          .order('orden', { ascending: true }),
        supabase
          .from('productos')
          .select('*, nivel_detail:categorias_producto(*)')
          .not('nivel', 'is', null)
          .order('orden', { ascending: true }),
      ]);

      if (categoriesRes.error) throw categoriesRes.error;
      if (productsRes.error) throw productsRes.error;

      const categories = (categoriesRes.data ?? []).map(
        transformCategoryRecord,
      );

      const products = (productsRes.data ?? []).map(
        (r: ProductoRecord & { nivel_detail: CategoriaProductoRecord | null }) => {
          const product = transformProductRecord(r);
          if (r.nivel_detail) {
            product.level = transformCategoryRecord(r.nivel_detail);
          }
          return product;
        },
      );

      return categories.map((category) => ({
        category,
        products: products.filter((p) => p.levelId === category.id),
      }));
    } catch (error) {
      console.error('Error fetching products by level:', error);
      return [];
    }
  },
);
