import type { RecordModel } from 'pocketbase';

// PocketBase blog record structure
export interface BlogRecord extends RecordModel {
  titulo: string;
  contenido: string;
  portada_url: string;
  created: string;
  updated: string;
}

// Transformed blog article for frontend use
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
}

// Helper to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Estimate read time from content (words per minute: ~200)
export function estimateReadTime(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, ''); // Strip HTML
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// Extract description from content (first paragraph or first 160 chars)
export function extractDescription(content: string): string {
  // Strip HTML and get plain text
  const plainText = content.replace(/<[^>]*>/g, '').trim();

  // Get first paragraph or first 160 characters
  const firstParagraph = plainText.split(/\n\n/)[0];
  if (firstParagraph.length <= 160) {
    return firstParagraph;
  }

  return plainText.slice(0, 157) + '...';
}
