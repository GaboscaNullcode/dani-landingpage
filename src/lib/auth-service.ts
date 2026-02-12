import { cache } from 'react';
import PocketBase from 'pocketbase';
import { getPocketBase, POCKETBASE_URL } from './pocketbase';
import type { User } from '@/types/auth';
import crypto from 'crypto';

function generateTempPassword(): string {
  return crypto.randomBytes(4).toString('hex');
}

const getAdminPb = cache(async (): Promise<PocketBase> => {
  const pb = getPocketBase();
  await pb.collection('_superusers').authWithPassword(
    process.env.POCKETBASE_ADMIN_EMAIL!,
    process.env.POCKETBASE_ADMIN_PASSWORD!,
  );
  return pb;
});

interface UserRecord {
  id: string;
  email: string;
  name: string;
  stripe_customer_id?: string;
}

function mapUser(record: UserRecord): User {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    stripeCustomerId: record.stripe_customer_id || undefined,
  };
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ token: string; user: User }> {
  const pb = getPocketBase();
  const result = await pb.collection('users').authWithPassword(email, password);
  return {
    token: result.token,
    user: mapUser(result.record as unknown as UserRecord),
  };
}

export async function findOrCreateUser(
  email: string,
  name: string,
  stripeCustomerId?: string,
): Promise<{ user: User; isNew: boolean; tempPassword?: string }> {
  const pb = await getAdminPb();

  try {
    const existing = await pb
      .collection('users')
      .getFirstListItem(`email = "${email}"`);
    return { user: mapUser(existing as unknown as UserRecord), isNew: false };
  } catch {
    const tempPassword = generateTempPassword();
    const created = await pb.collection('users').create({
      email,
      name,
      password: tempPassword,
      passwordConfirm: tempPassword,
      stripe_customer_id: stripeCustomerId || '',
    });
    return {
      user: mapUser(created as unknown as UserRecord),
      isNew: true,
      tempPassword,
    };
  }
}

export async function getCurrentUser(token: string): Promise<User | null> {
  try {
    const pb = new PocketBase(POCKETBASE_URL);
    pb.authStore.save(token, null);
    const result = await pb.collection('users').authRefresh();
    return mapUser(result.record as unknown as UserRecord);
  } catch {
    return null;
  }
}

export async function changeUserPassword(
  userId: string,
  email: string,
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  const pb = getPocketBase();
  await pb.collection('users').authWithPassword(email, oldPassword);

  const adminPb = await getAdminPb();
  await adminPb.collection('users').update(userId, {
    password: newPassword,
    passwordConfirm: newPassword,
  });
}

export async function requestPasswordReset(email: string): Promise<void> {
  const pb = getPocketBase();
  await pb.collection('users').requestPasswordReset(email);
}

export async function updateStripeCustomerId(
  userId: string,
  stripeCustomerId: string,
): Promise<void> {
  const pb = await getAdminPb();
  await pb.collection('users').update(userId, {
    stripe_customer_id: stripeCustomerId,
  });
}
