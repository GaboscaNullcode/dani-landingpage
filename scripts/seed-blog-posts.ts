/**
 * Seed script to load all blog posts from docs/blog-posts/ into PocketBase.
 * Parses frontmatter, converts markdown to HTML, and assigns categories.
 *
 * Usage: npx tsx --env-file=.env.local scripts/seed-blog-posts.ts
 */

import PocketBase from 'pocketbase';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { Marked } from 'marked';

const POCKETBASE_URL =
  'https://pocketbase-production-a78a.up.railway.app';

const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD!;

// Blog posts directory relative to this script
const BLOG_POSTS_DIR = join(__dirname, '..', '..', 'docs', 'blog-posts');

interface Frontmatter {
  title: string;
  slug: string;
  categoria: string;
  url: string;
  imagen: string;
}

function parseFrontmatter(content: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('Invalid frontmatter format');

  const lines = match[1].split(/\r?\n/);
  const fm: Record<string, string> = {};

  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      fm[key] = value;
    }
  }

  return {
    frontmatter: fm as unknown as Frontmatter,
    body: match[2],
  };
}

function stripRedundantHeader(body: string): string {
  // Remove leading # title line (redundant with titulo field)
  let cleaned = body.replace(/^\s*#\s+[^\n]+\n*/m, '');
  // Remove cover image line (redundant with portada_url field)
  cleaned = cleaned.replace(/^\s*!\[Cover\]\([^)]*\)\s*\n*/m, '');
  return cleaned.trim();
}

function escapeFilter(value: string): string {
  return value.replace(/"/g, '\\"');
}

async function main() {
  const pb = new PocketBase(POCKETBASE_URL);
  pb.autoCancellation(false);

  // 1. Authenticate as admin
  console.log('Authenticating as admin...');
  await pb
    .collection('_superusers')
    .authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log('Authenticated.');

  // 2. Build category name → ID map
  const categories = await pb.collection('categorias_blog').getFullList();
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    categoryMap[cat['nombre'] as string] = cat.id;
  }
  console.log(
    `Loaded ${Object.keys(categoryMap).length} categories:`,
    Object.keys(categoryMap).join(', '),
  );

  // 3. Read markdown files
  const files = readdirSync(BLOG_POSTS_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'INDEX.md')
    .sort();

  console.log(`\nFound ${files.length} blog post files.\n`);

  // 4. Setup marked
  const marked = new Marked();

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = join(BLOG_POSTS_DIR, file);
    const raw = readFileSync(filePath, 'utf-8');

    let frontmatter: Frontmatter;
    let body: string;

    try {
      const parsed = parseFrontmatter(raw);
      frontmatter = parsed.frontmatter;
      body = parsed.body;
    } catch (err) {
      console.error(`  [ERROR] Could not parse ${file}:`, err);
      errors++;
      continue;
    }

    // Check if post already exists by titulo
    try {
      await pb
        .collection('blogs')
        .getFirstListItem(`titulo="${escapeFilter(frontmatter.title)}"`);
      console.log(`  [SKIP] "${frontmatter.title}" already exists.`);
      skipped++;
      continue;
    } catch {
      // Not found — will create
    }

    // Clean body and convert to HTML
    const cleanedBody = stripRedundantHeader(body);
    const htmlContent = await marked.parse(cleanedBody);

    // Look up category ID
    const categoryId = categoryMap[frontmatter.categoria];
    if (!categoryId) {
      console.warn(
        `  [WARN] No category found for "${frontmatter.categoria}" (post: "${frontmatter.title}")`,
      );
    }

    // Create blog record
    try {
      await pb.collection('blogs').create({
        titulo: frontmatter.title,
        contenido: htmlContent,
        portada_url: frontmatter.imagen,
        ...(categoryId ? { categoria: categoryId } : {}),
      });
      console.log(
        `  [OK] "${frontmatter.title}" → ${frontmatter.categoria}`,
      );
      created++;
    } catch (err) {
      console.error(
        `  [ERROR] Failed to create "${frontmatter.title}":`,
        err,
      );
      errors++;
    }
  }

  console.log(
    `\nDone! Created: ${created}, Skipped: ${skipped}, Errors: ${errors}, Total files: ${files.length}`,
  );
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
