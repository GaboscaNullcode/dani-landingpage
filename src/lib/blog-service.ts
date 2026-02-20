import { cache } from 'react';
import { getPocketBase } from './pocketbase';
import type {
  BlogRecord,
  BlogArticle,
  CategoriaBlogRecord,
  BlogCategory,
} from '@/types/blog';
import {
  generateSlug,
  estimateReadTime,
  extractDescription,
} from '@/types/blog';

// Transform expanded categoria into frontend shape
function transformCategory(record: CategoriaBlogRecord) {
  return {
    id: record.id,
    name: record.nombre,
    slug: record.slug,
    accentColor: record.color_acento,
  };
}

// Transform PocketBase record to BlogArticle
function transformBlogRecord(record: BlogRecord): BlogArticle {
  const thumbnailUrl =
    record.portada_url ||
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';

  const expandedCategoria = record.expand?.categoria;

  return {
    id: record.id,
    title: record.titulo,
    slug: generateSlug(record.titulo),
    description: record.preview_text || extractDescription(record.contenido),
    thumbnail: thumbnailUrl,
    content: record.contenido,
    publishedAt: record.created,
    updatedAt: record.updated,
    readTime: estimateReadTime(record.contenido),
    category: expandedCategoria ? transformCategory(expandedCategoria) : undefined,
  };
}

// Fetch all blog articles
export const getAllArticles = cache(async (): Promise<BlogArticle[]> => {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('blogs').getFullList<BlogRecord>({
      sort: '-created',
      expand: 'categoria',
    });
    return records.map(transformBlogRecord);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
});

// Fetch latest articles with optional limit
export const getLatestArticles = cache(
  async (limit?: number): Promise<BlogArticle[]> => {
    try {
      const pb = getPocketBase();
      const records = await pb
        .collection('blogs')
        .getList<BlogRecord>(1, limit || 50, {
          sort: '-created',
          expand: 'categoria',
        });
      return records.items.map(transformBlogRecord);
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
      const pb = getPocketBase();
      const records = await pb.collection('blogs').getFullList<BlogRecord>({
        expand: 'categoria',
      });

      const record = records.find((r) => generateSlug(r.titulo) === slug);

      return record ? transformBlogRecord(record) : null;
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
      const pb = getPocketBase();
      const record = await pb.collection('blogs').getOne<BlogRecord>(id, {
        expand: 'categoria',
      });
      return transformBlogRecord(record);
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      return null;
    }
  },
);

// Get all slugs for static generation
export const getAllSlugs = cache(async (): Promise<string[]> => {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('blogs').getFullList<BlogRecord>({
      fields: 'titulo',
    });
    return records.map((r) => generateSlug(r.titulo));
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
      const pb = getPocketBase();

      if (categoryId) {
        // Fetch articles from the same category first
        const sameCategoryRecords = await pb
          .collection('blogs')
          .getList<BlogRecord>(1, limit + 1, {
            sort: '-created',
            filter: `categoria = "${categoryId}" && id != "${currentId}"`,
            expand: 'categoria',
          });

        const sameCategoryArticles = sameCategoryRecords.items.map(transformBlogRecord);

        if (sameCategoryArticles.length >= limit) {
          return sameCategoryArticles.slice(0, limit);
        }

        // Backfill with other articles
        const remaining = limit - sameCategoryArticles.length;
        const sameCategoryIds = sameCategoryArticles.map((a) => a.id);
        const excludeIds = [currentId, ...sameCategoryIds];
        const excludeFilter = excludeIds.map((id) => `id != "${id}"`).join(' && ');

        const otherRecords = await pb
          .collection('blogs')
          .getList<BlogRecord>(1, remaining, {
            sort: '-created',
            filter: excludeFilter,
            expand: 'categoria',
          });

        return [
          ...sameCategoryArticles,
          ...otherRecords.items.map(transformBlogRecord),
        ];
      }

      // No category — just return recent articles excluding current
      const records = await pb
        .collection('blogs')
        .getList<BlogRecord>(1, limit + 1, {
          sort: '-created',
          expand: 'categoria',
        });

      return records.items
        .filter((r) => r.id !== currentId)
        .slice(0, limit)
        .map(transformBlogRecord);
    } catch (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }
  },
);

// ----- Category functions -----

// Fetch all categories with article counts
export const getAllCategories = cache(async (): Promise<BlogCategory[]> => {
  try {
    const pb = getPocketBase();
    const categories = await pb
      .collection('categorias_blog')
      .getFullList<CategoriaBlogRecord>({ sort: 'nombre' });

    // Count articles per category
    const counts = await Promise.all(
      categories.map(async (cat) => {
        const result = await pb
          .collection('blogs')
          .getList(1, 1, { filter: `categoria = "${cat.id}"` });
        return result.totalItems;
      }),
    );

    return categories.map((cat, i) => ({
      id: cat.id,
      name: cat.nombre,
      slug: cat.slug,
      accentColor: cat.color_acento,
      articleCount: counts[i],
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
      const pb = getPocketBase();
      const record = await pb
        .collection('categorias_blog')
        .getFirstListItem<CategoriaBlogRecord>(`slug="${slug}"`);

      const countResult = await pb
        .collection('blogs')
        .getList(1, 1, { filter: `categoria = "${record.id}"` });

      return {
        id: record.id,
        name: record.nombre,
        slug: record.slug,
        accentColor: record.color_acento,
        articleCount: countResult.totalItems,
      };
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
      const pb = getPocketBase();
      const category = await pb
        .collection('categorias_blog')
        .getFirstListItem<CategoriaBlogRecord>(`slug="${categorySlug}"`);

      const records = await pb.collection('blogs').getFullList<BlogRecord>({
        sort: '-created',
        filter: `categoria = "${category.id}"`,
        expand: 'categoria',
      });

      return records.map(transformBlogRecord);
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      return [];
    }
  },
);

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
