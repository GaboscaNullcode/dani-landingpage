import { getPocketBase } from './pocketbase';
import type { BlogRecord, BlogArticle } from '@/types/blog';
import {
  generateSlug,
  estimateReadTime,
  extractDescription,
} from '@/types/blog';

// Transform PocketBase record to BlogArticle
function transformBlogRecord(record: BlogRecord): BlogArticle {
  // Use portada_url directly, fallback to default image
  const thumbnailUrl = record.portada_url ||
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';

  return {
    id: record.id,
    title: record.titulo,
    slug: generateSlug(record.titulo),
    description: extractDescription(record.contenido),
    thumbnail: thumbnailUrl,
    content: record.contenido,
    publishedAt: record.created,
    updatedAt: record.updated,
    readTime: estimateReadTime(record.contenido),
  };
}

// Fetch all blog articles
export async function getAllArticles(): Promise<BlogArticle[]> {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('blogs').getFullList<BlogRecord>({
      sort: '-created',
    });
    return records.map(transformBlogRecord);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch latest articles with optional limit
export async function getLatestArticles(limit?: number): Promise<BlogArticle[]> {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('blogs').getList<BlogRecord>(1, limit || 50, {
      sort: '-created',
    });
    return records.items.map(transformBlogRecord);
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

// Fetch a single article by slug
export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('blogs').getFullList<BlogRecord>();

    // Find the article that matches the slug
    const record = records.find(
      (r) => generateSlug(r.titulo) === slug
    );

    return record ? transformBlogRecord(record) : null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

// Fetch a single article by ID
export async function getArticleById(id: string): Promise<BlogArticle | null> {
  try {
    const pb = getPocketBase();
    const record = await pb.collection('blogs').getOne<BlogRecord>(id);
    return transformBlogRecord(record);
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    return null;
  }
}

// Get all slugs for static generation
export async function getAllSlugs(): Promise<string[]> {
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
}

// Get featured/popular article (first one for now)
export async function getFeaturedArticle(): Promise<BlogArticle | null> {
  const articles = await getLatestArticles(1);
  return articles[0] || null;
}

// Get related articles (excluding current one)
export async function getRelatedArticles(
  currentId: string,
  limit = 3
): Promise<BlogArticle[]> {
  try {
    const pb = getPocketBase();
    const records = await pb.collection('blogs').getList<BlogRecord>(1, limit + 1, {
      sort: '-created',
    });

    return records.items
      .filter((r) => r.id !== currentId)
      .slice(0, limit)
      .map(transformBlogRecord);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
