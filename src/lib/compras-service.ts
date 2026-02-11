import { cache } from 'react';
import { getPocketBase } from './pocketbase';
import type { Compra } from '@/types/auth';

const getAdminPb = cache(async () => {
  const pb = getPocketBase();
  await pb.collection('_superusers').authWithPassword(
    process.env.POCKETBASE_ADMIN_EMAIL!,
    process.env.POCKETBASE_ADMIN_PASSWORD!,
  );
  return pb;
});

function mapCompra(record: Record<string, unknown>): Compra {
  return {
    id: record.id as string,
    usuario: record.usuario as string,
    producto: record.producto as string,
    stripeSessionId: record.stripe_session_id as string,
    stripeSubscriptionId: (record.stripe_subscription_id as string) || undefined,
    estado: record.estado as Compra['estado'],
    created: record.created as string,
    expand: record.expand as Compra['expand'],
  };
}

export async function createCompra(
  userId: string,
  productoId: string,
  stripeSessionId: string,
  stripeSubscriptionId?: string,
): Promise<Compra> {
  const pb = await getAdminPb();
  const record = await pb.collection('compras').create({
    usuario: userId,
    producto: productoId,
    stripe_session_id: stripeSessionId,
    stripe_subscription_id: stripeSubscriptionId || '',
    estado: 'activa',
  });
  return mapCompra(record);
}

export async function getCompraById(compraId: string): Promise<Compra | null> {
  try {
    const pb = await getAdminPb();
    const record = await pb.collection('compras').getOne(compraId, {
      expand: 'producto',
    });
    return mapCompra(record);
  } catch {
    return null;
  }
}

export async function getUserCompras(userId: string): Promise<Compra[]> {
  try {
    const pb = await getAdminPb();
    const records = await pb.collection('compras').getFullList({
      filter: `usuario = "${userId}"`,
      expand: 'producto',
      sort: '-created',
    });
    return records.map(mapCompra);
  } catch {
    return [];
  }
}

export async function cancelCompraBySubscription(
  stripeSubscriptionId: string,
): Promise<void> {
  const pb = await getAdminPb();
  try {
    const record = await pb
      .collection('compras')
      .getFirstListItem(`stripe_subscription_id = "${stripeSubscriptionId}"`);
    await pb.collection('compras').update(record.id, {
      estado: 'cancelada',
    });
  } catch {
    console.error(
      'Compra not found for subscription:',
      stripeSubscriptionId,
    );
  }
}

export async function getCompraForDownload(
  compraId: string,
  userId: string,
): Promise<Compra | null> {
  try {
    const pb = await getAdminPb();
    const record = await pb.collection('compras').getOne(compraId, {
      expand: 'producto',
    });
    if (record.usuario !== userId) return null;
    return mapCompra(record);
  } catch {
    return null;
  }
}
