import { getServiceSupabase } from './supabase/server';

/**
 * Creates or updates a newsletter subscriber in Supabase.
 * Returns the record id if successful.
 * Non-critical: callers should catch errors since Brevo is the primary store.
 */
export async function createOrUpdateSubscriber(
  email: string,
  nombre: string,
  brevoContactId: number,
  origen:
    | 'home'
    | 'newsletter_page'
    | 'blog'
    | 'quiz'
    | 'recursos_gratuitos'
    | 'guia_gratuita',
): Promise<string> {
  const supabase = getServiceSupabase();

  // Try to find existing subscriber first
  const { data: existing } = await supabase
    .from('suscriptores_newsletter')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    // Update existing — preserve original 'origen'
    const { data, error } = await supabase
      .from('suscriptores_newsletter')
      .update({
        nombre,
        brevo_contact_id: brevoContactId,
        activo: true,
      })
      .eq('id', existing.id)
      .select('id')
      .single();

    if (error) throw error;
    return data!.id;
  }

  // Create new subscriber
  const { data, error } = await supabase
    .from('suscriptores_newsletter')
    .insert({
      email,
      nombre,
      brevo_contact_id: brevoContactId,
      origen,
      activo: true,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data!.id;
}
