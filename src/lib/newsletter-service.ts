import { getServiceSupabase } from './supabase/server';
import type { NewsletterSource } from '@/types/newsletter';

/**
 * Creates or updates a newsletter subscriber in Supabase.
 * Returns the record id if successful.
 * Non-critical: callers should catch errors since Brevo is the primary store.
 */
export async function createOrUpdateSubscriber(
  email: string,
  nombre: string,
  brevoContactId: number,
  origen: NewsletterSource,
): Promise<string> {
  const supabase = getServiceSupabase();

  // Use upsert to avoid TOCTOU race condition between SELECT and INSERT
  // when two concurrent requests try to create the same subscriber.
  // onConflict on email ensures atomicity.
  const { data, error } = await supabase
    .from('suscriptores_newsletter')
    .upsert(
      {
        email,
        nombre,
        brevo_contact_id: brevoContactId,
        origen,
        activo: true,
      },
      { onConflict: 'email', ignoreDuplicates: false },
    )
    .select('id')
    .single();

  if (error) throw error;
  return data!.id;
}
