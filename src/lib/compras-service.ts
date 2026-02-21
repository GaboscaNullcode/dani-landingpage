import { cache } from 'react';
import { getServiceSupabase } from './supabase/server';
import type { Compra } from '@/types/auth';

function mapCompra(record: Record<string, unknown>): Compra {
  return {
    id: record.id as string,
    usuario: record.usuario as string,
    producto: record.producto as string,
    stripeSessionId: record.stripe_session_id as string,
    stripeSubscriptionId: (record.stripe_subscription_id as string) || undefined,
    estado: record.estado as Compra['estado'],
    created: record.created_at as string,
    productoDetail: record.productoDetail as Compra['productoDetail'],
  };
}

export async function createCompra(
  userId: string,
  productoId: string,
  stripeSessionId: string,
  stripeSubscriptionId?: string,
): Promise<Compra> {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('compras')
    .insert({
      usuario: userId,
      producto: productoId,
      stripe_session_id: stripeSessionId,
      stripe_subscription_id: stripeSubscriptionId || null,
      estado: 'activa',
    })
    .select()
    .single();

  if (error) throw error;
  return mapCompra(data);
}

export async function getCompraById(compraId: string): Promise<Compra | null> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('compras')
      .select('*, productoDetail:productos(*)')
      .eq('id', compraId)
      .single();

    if (error) throw error;
    return data ? mapCompra(data) : null;
  } catch {
    return null;
  }
}

export const getUserCompras = cache(
  async (userId: string): Promise<Compra[]> => {
    try {
      const supabase = getServiceSupabase();
      const { data, error } = await supabase
        .from('compras')
        .select('*, productoDetail:productos(*)')
        .eq('usuario', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []).map(mapCompra);
    } catch {
      return [];
    }
  },
);

export async function cancelCompraBySubscription(
  stripeSubscriptionId: string,
): Promise<void> {
  const supabase = getServiceSupabase();
  try {
    const { data, error: findError } = await supabase
      .from('compras')
      .select('id')
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .single();

    if (findError || !data) {
      console.error(
        'Compra not found for subscription:',
        stripeSubscriptionId,
      );
      return;
    }

    const { error: updateError } = await supabase
      .from('compras')
      .update({ estado: 'cancelada' })
      .eq('id', data.id);

    if (updateError) throw updateError;
  } catch {
    console.error(
      'Compra not found for subscription:',
      stripeSubscriptionId,
    );
  }
}

export async function getUserPurchasedProductIds(
  userId: string,
): Promise<Set<string>> {
  const compras = await getUserCompras(userId);
  return new Set(
    compras.filter((c) => c.estado === 'activa').map((c) => c.producto),
  );
}

export async function getCompraForDownload(
  compraId: string,
  userId: string,
): Promise<Compra | null> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('compras')
      .select('*, productoDetail:productos(*)')
      .eq('id', compraId)
      .eq('usuario', userId)
      .single();

    if (error) throw error;
    return data ? mapCompra(data) : null;
  } catch {
    return null;
  }
}
