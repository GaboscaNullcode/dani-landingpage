/**
 * Fix API rules for categorias_blog collection to allow public read access.
 *
 * Usage: npx tsx --env-file=.env.local scripts/fix-collection-rules.ts
 */

import PocketBase from 'pocketbase';

const POCKETBASE_URL =
  'https://pocketbase-production-a78a.up.railway.app';

const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD!;

async function main() {
  const pb = new PocketBase(POCKETBASE_URL);
  pb.autoCancellation(false);

  console.log('Authenticating as admin...');
  await pb
    .collection('_superusers')
    .authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log('Authenticated.');

  // Update categorias_blog: allow public list and view
  console.log('Updating categorias_blog API rules...');
  await pb.collections.update('categorias_blog', {
    listRule: '',
    viewRule: '',
  });
  console.log('categorias_blog: listRule and viewRule set to public.');

  // Verify blogs collection also has public read access
  const blogsCollection = await pb.collections.getOne('blogs');
  console.log(
    `blogs: listRule="${blogsCollection.listRule}", viewRule="${blogsCollection.viewRule}"`,
  );

  if (blogsCollection.listRule === null || blogsCollection.viewRule === null) {
    console.log('Updating blogs API rules to allow public read...');
    await pb.collections.update('blogs', {
      listRule: blogsCollection.listRule ?? '',
      viewRule: blogsCollection.viewRule ?? '',
    });
    console.log('blogs: rules updated.');
  }

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
