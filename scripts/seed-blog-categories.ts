/**
 * Seed script for blog categories in PocketBase.
 * Creates the categorias_blog collection, adds a relation field to blogs,
 * inserts 5 categories, and assigns categories to existing posts.
 *
 * Usage: npx tsx scripts/seed-blog-categories.ts
 */

import PocketBase from 'pocketbase';

const POCKETBASE_URL =
  'https://pocketbase-production-a78a.up.railway.app';

const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD!;

interface CategorySeed {
  nombre: string;
  slug: string;
  color_acento: string;
}

const CATEGORIES: CategorySeed[] = [
  {
    nombre: 'Plataformas de Trabajo Remoto',
    slug: 'plataformas-trabajo-remoto',
    color_acento: '#ff6b6b',
  },
  {
    nombre: 'Mentalidad & Crecimiento',
    slug: 'mentalidad-crecimiento',
    color_acento: '#a78bfa',
  },
  {
    nombre: 'Vida Remota & Balance Personal',
    slug: 'vida-remota-balance',
    color_acento: '#6ee7b7',
  },
  {
    nombre: 'Behind the Laptop',
    slug: 'behind-the-laptop',
    color_acento: '#e056a0',
  },
  {
    nombre: 'Tips & Herramientas',
    slug: 'tips-herramientas',
    color_acento: '#fbbf24',
  },
];

// Mapping: category slug -> array of post title substrings (used to match posts)
const POST_CATEGORY_MAP: Record<string, string[]> = {
  'behind-the-laptop': [
    'Historias reales de mis alumnos',
    'Lo que nadie te cuenta de trabajar para empresas internacionales',
    'Mi primer cliente remoto',
    'Una semana detrás del laptop',
  ],
  'mentalidad-crecimiento': [
    'síndrome del impostor',
    'El mindset que me ayudó',
    'Hábitos mentales para mantenerte motivado',
  ],
  'plataformas-trabajo-remoto': [
    '5 errores que me costaron clientes en Upwork',
    'Cómo destacar tu perfil para clientes internacionales',
    'Cómo elegir la mejor plataforma',
    'Cómo empezar en Upwork sin experiencia',
    'Por qué las plataformas no funcionan',
  ],
  'tips-herramientas': [
    'Asana para principiantes',
    'herramientas digitales para proteger mi foco',
    'Las 7 herramientas que me salvaron',
    'Las extensiones de Chrome',
  ],
  'vida-remota-balance': [
    '5 rutinas para evitar el burnout',
    'Cómo crear rutinas que te devuelvan',
    'Cómo desconectarte sin culpa',
    'La parte silenciosa del trabajo remoto',
    'Viajar y trabajar',
  ],
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  const pb = new PocketBase(POCKETBASE_URL);
  pb.autoCancellation(false);

  // 1. Authenticate as admin
  console.log('Authenticating as admin...');
  await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log('Authenticated successfully.');

  // 2. Create categorias_blog collection if it doesn't exist
  let collectionExists = false;
  try {
    await pb.collections.getOne('categorias_blog');
    collectionExists = true;
    console.log('Collection categorias_blog already exists.');
  } catch {
    console.log('Creating collection categorias_blog...');
    await pb.collections.create({
      name: 'categorias_blog',
      type: 'base',
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'color_acento',
          type: 'text',
          required: false,
        },
      ],
    });
    console.log('Collection categorias_blog created.');
  }

  // 3. Add relation field to blogs collection if it doesn't exist
  try {
    const blogsCollection = await pb.collections.getOne('blogs');
    const hasCategoria = blogsCollection.fields?.some(
      (f: { name: string }) => f.name === 'categoria'
    );

    if (!hasCategoria) {
      console.log('Adding categoria relation field to blogs...');
      const categoriasBlogCollection = await pb.collections.getOne('categorias_blog');
      const existingFields = blogsCollection.fields || [];
      await pb.collections.update('blogs', {
        fields: [
          ...existingFields,
          {
            name: 'categoria',
            type: 'relation',
            required: false,
            collectionId: categoriasBlogCollection.id,
            cascadeDelete: false,
            maxSelect: 1,
          },
        ],
      });
      console.log('Field categoria added to blogs.');
    } else {
      console.log('Field categoria already exists in blogs.');
    }
  } catch (error) {
    console.error('Error updating blogs collection:', error);
    throw error;
  }

  // 4. Insert categories (idempotent — skip existing)
  const categoryIdMap: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    try {
      const existing = await pb
        .collection('categorias_blog')
        .getFirstListItem(`slug="${cat.slug}"`);
      categoryIdMap[cat.slug] = existing.id;
      console.log(`Category "${cat.nombre}" already exists (${existing.id}).`);
    } catch {
      const created = await pb.collection('categorias_blog').create(cat);
      categoryIdMap[cat.slug] = created.id;
      console.log(`Category "${cat.nombre}" created (${created.id}).`);
    }
  }

  // 5. Assign categories to existing posts
  console.log('\nAssigning categories to posts...');
  const allPosts = await pb.collection('blogs').getFullList({ sort: '-created' });
  console.log(`Found ${allPosts.length} posts.`);

  let assigned = 0;
  let skipped = 0;

  for (const post of allPosts) {
    // Skip posts that already have a category
    if (post.categoria) {
      console.log(`  [SKIP] "${post.titulo}" already has a category.`);
      skipped++;
      continue;
    }

    // Find the matching category
    let matchedCategorySlug: string | null = null;

    for (const [catSlug, titlePatterns] of Object.entries(POST_CATEGORY_MAP)) {
      for (const pattern of titlePatterns) {
        if (post.titulo.includes(pattern)) {
          matchedCategorySlug = catSlug;
          break;
        }
      }
      if (matchedCategorySlug) break;
    }

    if (matchedCategorySlug) {
      const categoryId = categoryIdMap[matchedCategorySlug];
      await pb.collection('blogs').update(post.id, { categoria: categoryId });
      console.log(
        `  [OK] "${post.titulo}" -> ${matchedCategorySlug}`
      );
      assigned++;
    } else {
      console.log(
        `  [NO MATCH] "${post.titulo}" — no category pattern matched.`
      );
    }
  }

  console.log(`\nDone! Assigned: ${assigned}, Skipped: ${skipped}, Total: ${allPosts.length}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
