import { cache } from 'react';
import { createAnonSupabase } from './supabase/server';
import type {
  BlogRecord,
  BlogArticle,
  CategoriaBlogRecord,
  BlogCategory,
} from '@/types/blog';
import { estimateReadTime, extractDescription } from '@/types/blog';

// Transform expanded categoria into frontend shape
function transformCategory(record: CategoriaBlogRecord) {
  return {
    id: record.id,
    name: record.nombre,
    slug: record.slug,
    accentColor: record.color_acento,
  };
}

// Transform Supabase record to BlogArticle
function transformBlogRecord(record: BlogRecord): BlogArticle {
  const thumbnailUrl =
    record.portada_url ||
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';

  const joinedCategoria = record.categoria_detail;

  return {
    id: record.id,
    title: record.titulo,
    slug: record.slug,
    description: record.preview_text || extractDescription(record.contenido),
    thumbnail: thumbnailUrl,
    content: record.contenido,
    publishedAt: record.created_at,
    updatedAt: record.updated_at,
    readTime: estimateReadTime(record.contenido),
    category: joinedCategoria ? transformCategory(joinedCategoria) : undefined,
  };
}

// Fetch all blog articles
export const getAllArticles = cache(async (): Promise<BlogArticle[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('blogs')
      .select('*, categoria_detail:categorias_blog(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(transformBlogRecord);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
});

// Fetch latest articles with optional limit
export const getLatestArticles = cache(
  async (limit?: number): Promise<BlogArticle[]> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('blogs')
        .select('*, categoria_detail:categorias_blog(*)')
        .order('created_at', { ascending: false })
        .limit(limit || 50);

      if (error) throw error;
      return (data ?? []).map(transformBlogRecord);
    } catch (error) {
      console.error('Error fetching latest articles:', error);
      return [];
    }
  },
);

// Fetch a single article by slug
export const getArticleBySlug = cache(
  async (slug: string): Promise<BlogArticle | null> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('blogs')
        .select('*, categoria_detail:categorias_blog(*)')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data ? transformBlogRecord(data) : null;
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      return null;
    }
  },
);

// Fetch a single article by ID
export const getArticleById = cache(
  async (id: string): Promise<BlogArticle | null> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('blogs')
        .select('*, categoria_detail:categorias_blog(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? transformBlogRecord(data) : null;
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      return null;
    }
  },
);

// Get all slugs for static generation
export const getAllSlugs = cache(async (): Promise<string[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase.from('blogs').select('slug');

    if (error) throw error;
    return (data ?? []).map((r) => r.slug);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
});

// Get featured/popular article (first one for now)
export async function getFeaturedArticle(): Promise<BlogArticle | null> {
  const articles = await getLatestArticles(1);
  return articles[0] || null;
}

// Get related articles — prioritizes same category, backfills with others
export const getRelatedArticles = cache(
  async (
    currentId: string,
    limit = 3,
    categoryId?: string,
  ): Promise<BlogArticle[]> => {
    try {
      const supabase = createAnonSupabase();

      if (categoryId) {
        // Fetch articles from the same category first
        const { data: sameCategoryData, error: sameCatError } = await supabase
          .from('blogs')
          .select('*, categoria_detail:categorias_blog(*)')
          .eq('categoria', categoryId)
          .neq('id', currentId)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (sameCatError) throw sameCatError;
        const sameCategoryArticles = (sameCategoryData ?? []).map(
          transformBlogRecord,
        );

        if (sameCategoryArticles.length >= limit) {
          return sameCategoryArticles.slice(0, limit);
        }

        // Backfill with other articles
        const remaining = limit - sameCategoryArticles.length;
        const excludeIds = [
          currentId,
          ...sameCategoryArticles.map((a) => a.id),
        ];

        const { data: otherData, error: otherError } = await supabase
          .from('blogs')
          .select('*, categoria_detail:categorias_blog(*)')
          .not('id', 'in', `(${excludeIds.join(',')})`)
          .order('created_at', { ascending: false })
          .limit(remaining);

        if (otherError) throw otherError;

        return [
          ...sameCategoryArticles,
          ...(otherData ?? []).map(transformBlogRecord),
        ];
      }

      // No category — just return recent articles excluding current
      const { data, error } = await supabase
        .from('blogs')
        .select('*, categoria_detail:categorias_blog(*)')
        .neq('id', currentId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data ?? []).map(transformBlogRecord);
    } catch (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }
  },
);

// ----- Category functions -----

// Fetch all categories with article counts (single query instead of N+1)
export const getAllCategories = cache(async (): Promise<BlogCategory[]> => {
  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from('categorias_blog')
      .select('*, blogs(count)')
      .order('nombre');

    if (error) throw error;

    return (data ?? []).map((cat) => ({
      id: cat.id,
      name: cat.nombre,
      slug: cat.slug,
      accentColor: cat.color_acento,
      articleCount: (cat.blogs as unknown as { count: number }[])?.[0]?.count ?? 0,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});

// Fetch a single category by slug
export const getCategoryBySlug = cache(
  async (slug: string): Promise<BlogCategory | null> => {
    try {
      const supabase = createAnonSupabase();
      const { data, error } = await supabase
        .from('categorias_blog')
        .select('*, blogs(count)')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      return data
        ? {
            id: data.id,
            name: data.nombre,
            slug: data.slug,
            accentColor: data.color_acento,
            articleCount:
              (data.blogs as unknown as { count: number }[])?.[0]?.count ?? 0,
          }
        : null;
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      return null;
    }
  },
);

// Fetch articles by category slug
export const getArticlesByCategory = cache(
  async (categorySlug: string): Promise<BlogArticle[]> => {
    try {
      const supabase = createAnonSupabase();

      // First get the category ID
      const { data: category, error: catError } = await supabase
        .from('categorias_blog')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (catError || !category) throw catError || new Error('Category not found');

      const { data, error } = await supabase
        .from('blogs')
        .select('*, categoria_detail:categorias_blog(*)')
        .eq('categoria', category.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []).map(transformBlogRecord);
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      return [];
    }
  },
);

