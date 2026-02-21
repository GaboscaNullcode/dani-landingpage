// Supabase categorias_blog record
export interface CategoriaBlogRecord {
  id: string;
  created_at: string;
  updated_at: string;
  nombre: string;
  slug: string;
  color_acento: string;
}

// Supabase blog record structure
export interface BlogRecord {
  id: string;
  created_at: string;
  updated_at: string;
  titulo: string;
  slug: string;
  contenido: string;
  portada_url: string | null;
  categoria: string | null;
  preview_text: string | null;
  // Joined via `.select('*, categoria_detail:categorias_blog(*)')`
  categoria_detail?: CategoriaBlogRecord | null;
}

// Frontend blog category
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  accentColor: string;
  articleCount: number;
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
  category?: {
    id: string;
    name: string;
    slug: string;
    accentColor: string;
  };
}

// Helper to generate slug from title (kept for backward compatibility)
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

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
