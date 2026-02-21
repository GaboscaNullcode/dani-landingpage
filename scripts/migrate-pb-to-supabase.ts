/**
 * Migration script: PocketBase → Supabase
 *
 * Fetches all data from PocketBase REST API, transforms it,
 * and upserts into Supabase tables respecting FK constraints.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/migrate-pb-to-supabase.ts
 *   npx tsx --env-file=.env.local scripts/migrate-pb-to-supabase.ts --dry-run
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// ─── Config ───────────────────────────────────────────────────────────────────

const PB_URL = 'https://pocketbase-production-a78a.up.railway.app';
const PB_ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL!;
const PB_ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD!;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 50;

// ─── PocketBase record types ─────────────────────────────────────────────────

interface PBBaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

interface PBCategoriaBlog extends PBBaseRecord {
  nombre: string;
  slug: string;
  color_acento: string;
}

interface PBBlog extends PBBaseRecord {
  titulo: string;
  contenido: string;
  portada_url: string;
  categoria: string;
  preview_text: string;
}

interface PBProducto extends PBBaseRecord {
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precio_original: number;
  imagen_url: string;
  categoria: string;
  badge: string;
  features: string[];
  es_destacado: boolean;
  es_gratis: boolean;
  es_suscripcion: boolean;
  intervalo: string;
  cta_texto: string;
  cta_link: string;
  stripe_price_id: string;
  download_url: string;
  whatsapp_link: string;
  orden: number;
}

interface PBUser extends PBBaseRecord {
  email: string;
  name: string;
  stripe_customer_id: string;
}

interface PBCompra extends PBBaseRecord {
  usuario: string;
  producto: string;
  stripe_session_id: string;
  stripe_subscription_id: string;
  estado: string;
}

interface PBSuscriptorNewsletter extends PBBaseRecord {
  email: string;
  nombre: string;
  brevo_contact_id: number;
  origen: string;
  activo: boolean;
}

// ─── PocketBase REST helpers ─────────────────────────────────────────────────

let pbToken = '';

async function pbAuth(): Promise<void> {
  const res = await fetch(
    `${PB_URL}/api/collections/_superusers/auth-with-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity: PB_ADMIN_EMAIL,
        password: PB_ADMIN_PASSWORD,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PocketBase auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  pbToken = data.token;
  console.log('[PB] Authenticated as admin');
}

async function pbFetchAll<T extends PBBaseRecord>(
  collection: string,
  sort?: string
): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  const perPage = 200;

  while (true) {
    let url = `${PB_URL}/api/collections/${collection}/records?page=${page}&perPage=${perPage}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${pbToken}` },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `PocketBase fetch ${collection} page ${page} failed (${res.status}): ${text}`
      );
    }

    const data = await res.json();
    all.push(...(data.items as T[]));

    if (page >= data.totalPages || data.items.length === 0) break;
    page++;
  }

  console.log(`[PB] Fetched ${all.length} records from '${collection}'`);
  return all;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emptyToNull(value: string | null | undefined): string | null {
  if (value === '' || value === null || value === undefined) return null;
  return value;
}

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

function deduplicateSlugs(items: { slug: string }[]): void {
  const seen = new Map<string, number>();

  for (const item of items) {
    const baseSlug = item.slug;
    const count = seen.get(baseSlug) ?? 0;
    seen.set(baseSlug, count + 1);
    if (count > 0) {
      item.slug = `${baseSlug}-${count + 1}`;
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Transform functions ──────────────────────────────────────────────────────

function transformCategoriaBlog(pb: PBCategoriaBlog) {
  return {
    id: pb.id,
    created_at: pb.created,
    updated_at: pb.updated,
    nombre: pb.nombre,
    slug: pb.slug,
    color_acento: pb.color_acento || '#666666',
  };
}

function transformBlog(pb: PBBlog) {
  return {
    id: pb.id,
    created_at: pb.created,
    updated_at: pb.updated,
    titulo: pb.titulo,
    slug: '', // will be set after deduplication
    contenido: pb.contenido,
    portada_url: emptyToNull(pb.portada_url),
    categoria: emptyToNull(pb.categoria),
    preview_text: emptyToNull(pb.preview_text),
  };
}

function transformProducto(pb: PBProducto) {
  return {
    id: pb.id,
    created_at: pb.created,
    updated_at: pb.updated,
    nombre: pb.nombre,
    slug: pb.slug,
    descripcion: pb.descripcion || '',
    precio: pb.precio ?? 0,
    precio_original: pb.precio_original || null,
    imagen_url: emptyToNull(pb.imagen_url),
    categoria: pb.categoria || 'curso',
    badge: emptyToNull(pb.badge),
    features: pb.features?.length ? pb.features : null,
    es_destacado: pb.es_destacado ?? false,
    es_gratis: pb.es_gratis ?? false,
    es_suscripcion: pb.es_suscripcion ?? false,
    intervalo: emptyToNull(pb.intervalo),
    cta_texto: pb.cta_texto || 'Ver más',
    cta_link: pb.cta_link || '#',
    stripe_price_id: emptyToNull(pb.stripe_price_id),
    download_url: emptyToNull(pb.download_url),
    whatsapp_link: emptyToNull(pb.whatsapp_link),
    orden: pb.orden ?? 0,
  };
}

function transformSuscriptorNewsletter(pb: PBSuscriptorNewsletter) {
  return {
    id: pb.id,
    created_at: pb.created,
    updated_at: pb.updated,
    email: pb.email,
    nombre: pb.nombre || '',
    brevo_contact_id: pb.brevo_contact_id || null,
    origen: pb.origen || 'home',
    activo: pb.activo ?? true,
  };
}

function transformCompra(
  pb: PBCompra,
  userIdMap: Map<string, string>
): ReturnType<typeof transformCompraInner> | null {
  const supabaseUserId = userIdMap.get(pb.usuario);
  if (!supabaseUserId) {
    console.warn(
      `  [SKIP] Compra ${pb.id}: usuario '${pb.usuario}' not found in user map`
    );
    return null;
  }
  return transformCompraInner(pb, supabaseUserId);
}

function transformCompraInner(pb: PBCompra, supabaseUserId: string) {
  return {
    id: pb.id,
    created_at: pb.created,
    updated_at: pb.updated,
    usuario: supabaseUserId,
    producto: pb.producto,
    stripe_session_id: pb.stripe_session_id,
    stripe_subscription_id: emptyToNull(pb.stripe_subscription_id),
    estado: pb.estado || 'activa',
  };
}

// ─── Batch upsert ─────────────────────────────────────────────────────────────

async function migrateCollection<T extends Record<string, unknown>>(
  supabase: SupabaseClient,
  table: string,
  rows: T[],
  conflictColumn: string = 'id'
): Promise<number> {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would upsert ${rows.length} rows into '${table}'`);
    return rows.length;
  }

  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from(table)
      .upsert(batch, { onConflict: conflictColumn });

    if (error) {
      console.error(
        `  [ERROR] Upsert into '${table}' batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`
      );
      // Log the first failing row for debugging
      console.error('  First row in batch:', JSON.stringify(batch[0], null, 2));
      throw error;
    }

    inserted += batch.length;
  }

  console.log(`  [OK] Upserted ${inserted} rows into '${table}'`);
  return inserted;
}

// ─── Migrate users (special: auth.users + profiles) ──────────────────────────

async function fetchAllSupabaseUsers(
  supabase: SupabaseClient
): Promise<Map<string, string>> {
  // Build email → uuid index by paginating through all auth users
  const emailToUuid = new Map<string, string>();
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      console.warn(`  [WARN] Failed to list auth users page ${page}: ${error.message}`);
      break;
    }

    for (const user of data.users) {
      if (user.email) {
        emailToUuid.set(user.email, user.id);
      }
    }

    // Supabase returns up to perPage users; if fewer, we've reached the end
    if (data.users.length < perPage) break;
    page++;
  }

  return emailToUuid;
}

async function migrateUsers(
  supabase: SupabaseClient,
  pbUsers: PBUser[]
): Promise<Map<string, string>> {
  const userIdMap = new Map<string, string>(); // pb_id → supabase_uuid
  let created = 0;
  let existing = 0;
  let errors = 0;

  // Pre-fetch all existing Supabase auth users (email → uuid)
  console.log('  Fetching existing Supabase auth users...');
  const existingUsersByEmail = await fetchAllSupabaseUsers(supabase);
  console.log(`  Found ${existingUsersByEmail.size} existing auth users`);

  for (const pbUser of pbUsers) {
    try {
      const existingUuid = existingUsersByEmail.get(pbUser.email);

      if (existingUuid) {
        userIdMap.set(pbUser.id, existingUuid);
        existing++;

        if (!DRY_RUN) {
          // Update profile with PB data
          await supabase.from('profiles').upsert(
            {
              id: existingUuid,
              name: pbUser.name || '',
              stripe_customer_id: emptyToNull(pbUser.stripe_customer_id),
              created_at: pbUser.created,
              updated_at: pbUser.updated,
            },
            { onConflict: 'id' }
          );
        }

        console.log(`  [EXISTS] ${pbUser.email} → ${existingUuid}`);
        continue;
      }

      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would create auth user: ${pbUser.email}`);
        userIdMap.set(pbUser.id, `dry-run-uuid-${pbUser.id}`);
        created++;
        continue;
      }

      // Create user in auth.users (no password — users will need to reset)
      const { data: newUser, error: createError } =
        await supabase.auth.admin.createUser({
          email: pbUser.email,
          email_confirm: true,
          user_metadata: { name: pbUser.name || '' },
        });

      if (createError) {
        console.error(
          `  [ERROR] Creating user ${pbUser.email}: ${createError.message}`
        );
        errors++;
        continue;
      }

      userIdMap.set(pbUser.id, newUser.user.id);
      created++;

      // Wait for trigger to create profile, then update it
      await sleep(150);

      await supabase.from('profiles').upsert(
        {
          id: newUser.user.id,
          name: pbUser.name || '',
          stripe_customer_id: emptyToNull(pbUser.stripe_customer_id),
          created_at: pbUser.created,
          updated_at: pbUser.updated,
        },
        { onConflict: 'id' }
      );

      console.log(`  [CREATED] ${pbUser.email} → ${newUser.user.id}`);

      // Rate limit protection
      await sleep(100);
    } catch (err) {
      console.error(
        `  [ERROR] User ${pbUser.email}:`,
        err instanceof Error ? err.message : err
      );
      errors++;
    }
  }

  console.log(
    `  [USERS] Created: ${created}, Existing: ${existing}, Errors: ${errors}`
  );
  return userIdMap;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('='.repeat(60));
  console.log('  PocketBase → Supabase Migration');
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`);
  console.log('='.repeat(60));
  console.log();

  // Validate env
  if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
    throw new Error(
      'Missing POCKETBASE_ADMIN_EMAIL or POCKETBASE_ADMIN_PASSWORD'
    );
  }
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  // Init clients
  await pbAuth();
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const summary: Record<string, number> = {};

  // ── Phase 1: categorias_blog ──────────────────────────────────────────────

  console.log('\n── Phase 1: categorias_blog ──');
  const pbCategorias = await pbFetchAll<PBCategoriaBlog>('categorias_blog'); // no sort — this collection doesn't support it
  const categorias = pbCategorias.map(transformCategoriaBlog);
  summary['categorias_blog'] = await migrateCollection(
    supabase,
    'categorias_blog',
    categorias
  );

  // ── Phase 2: productos ────────────────────────────────────────────────────

  console.log('\n── Phase 2: productos ──');
  const pbProductos = await pbFetchAll<PBProducto>('productos', '-created');
  const productos = pbProductos.map(transformProducto);
  summary['productos'] = await migrateCollection(
    supabase,
    'productos',
    productos
  );

  // ── Phase 3: suscriptores_newsletter ──────────────────────────────────────

  console.log('\n── Phase 3: suscriptores_newsletter ──');
  const pbSuscriptores =
    await pbFetchAll<PBSuscriptorNewsletter>('suscriptores_newsletter', '-created');
  const suscriptores = pbSuscriptores.map(transformSuscriptorNewsletter);
  summary['suscriptores_newsletter'] = await migrateCollection(
    supabase,
    'suscriptores_newsletter',
    suscriptores
  );

  // ── Phase 4: blogs (needs slug generation + deduplication) ────────────────

  console.log('\n── Phase 4: blogs ──');
  const pbBlogs = await pbFetchAll<PBBlog>('blogs', '-created');
  const blogs = pbBlogs.map(transformBlog);

  // Generate slugs from titles
  for (const blog of blogs) {
    blog.slug = generateSlug(blog.titulo);
  }

  // Deduplicate slugs
  deduplicateSlugs(blogs);

  // Show slug mappings
  for (const blog of blogs) {
    console.log(`  slug: "${blog.titulo}" → "${blog.slug}"`);
  }

  summary['blogs'] = await migrateCollection(supabase, 'blogs', blogs);

  // ── Phase 5: users → auth.users + profiles ───────────────────────────────

  console.log('\n── Phase 5: users → auth.users + profiles ──');
  const pbUsers = await pbFetchAll<PBUser>('users', '-created');
  const userIdMap = await migrateUsers(supabase, pbUsers);
  summary['users/profiles'] = userIdMap.size;

  // ── Phase 6: compras ──────────────────────────────────────────────────────

  console.log('\n── Phase 6: compras ──');
  const pbCompras = await pbFetchAll<PBCompra>('compras', '-created');

  // Also build a set of valid producto IDs for validation
  const validProductoIds = new Set(productos.map((p) => p.id));

  const compras = pbCompras
    .map((c) => {
      if (!validProductoIds.has(c.producto)) {
        console.warn(
          `  [SKIP] Compra ${c.id}: producto '${c.producto}' not found`
        );
        return null;
      }
      return transformCompra(c, userIdMap);
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  if (compras.length < pbCompras.length) {
    console.log(
      `  [INFO] Skipped ${pbCompras.length - compras.length} orphaned compras`
    );
  }

  summary['compras'] = await migrateCollection(supabase, 'compras', compras);

  // ── Summary ───────────────────────────────────────────────────────────────

  console.log('\n' + '='.repeat(60));
  console.log('  Migration Summary');
  console.log('='.repeat(60));
  for (const [table, count] of Object.entries(summary)) {
    console.log(`  ${table}: ${count} records`);
  }
  if (DRY_RUN) {
    console.log('\n  ⚠ DRY RUN — no data was written to Supabase');
  } else {
    console.log('\n  ✓ Migration complete!');
  }
  console.log();
}

main().catch((err) => {
  console.error('\nFATAL ERROR:', err);
  process.exit(1);
});
