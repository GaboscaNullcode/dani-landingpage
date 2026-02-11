import { getPocketBase } from './pocketbase';

async function getAdminPb() {
  const pb = getPocketBase();
  await pb
    .collection('_superusers')
    .authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL!,
      process.env.POCKETBASE_ADMIN_PASSWORD!,
    );
  return pb;
}

/**
 * Creates or updates a newsletter subscriber in PocketBase.
 * Returns the record id if successful.
 * Non-critical: callers should catch errors since Brevo is the primary store.
 */
export async function createOrUpdateSubscriber(
  email: string,
  nombre: string,
  brevoContactId: number,
  origen: 'home' | 'newsletter_page' | 'blog' | 'quiz',
): Promise<string> {
  const pb = await getAdminPb();

  try {
    // Check if subscriber already exists
    const existing = await pb
      .collection('suscriptores_newsletter')
      .getFirstListItem(`email = "${email}"`);

    // Update existing record
    const updated = await pb
      .collection('suscriptores_newsletter')
      .update(existing.id, {
        nombre,
        brevo_contact_id: brevoContactId,
        activo: true,
      });
    return updated.id;
  } catch {
    // Not found — create new record
    const record = await pb.collection('suscriptores_newsletter').create({
      email,
      nombre,
      brevo_contact_id: brevoContactId,
      origen,
      activo: true,
    });
    return record.id;
  }
}
