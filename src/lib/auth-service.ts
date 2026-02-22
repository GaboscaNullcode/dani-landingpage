import { cache } from 'react';
import { createServerSupabase, getServiceSupabase } from './supabase/server';
import type { User } from '@/types/auth';
import crypto from 'crypto';

const PROFILE_SELECT = 'name, stripe_customer_id, program_intensive_paid_full, program_intensive_paid_1, program_intensive_paid_2' as const;

function profileToUser(
  id: string,
  email: string,
  profile: { name?: string; stripe_customer_id?: string; program_intensive_paid_full?: boolean; program_intensive_paid_1?: boolean; program_intensive_paid_2?: boolean } | null,
  fallbackName = '',
): User {
  return {
    id,
    email,
    name: profile?.name || fallbackName,
    stripeCustomerId: profile?.stripe_customer_id || undefined,
    programIntensivePaidFull: profile?.program_intensive_paid_full ?? false,
    programIntensivePaid1: profile?.program_intensive_paid_1 ?? false,
    programIntensivePaid2: profile?.program_intensive_paid_2 ?? false,
  };
}

function generateTempPassword(): string {
  return crypto.randomBytes(4).toString('hex');
}

/**
 * Get the current authenticated user from the Supabase session.
 * Reads cookies automatically via @supabase/ssr.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select(PROFILE_SELECT)
      .eq('id', authUser.id)
      .single();

    return profileToUser(authUser.id, authUser.email!, profile);
  } catch {
    return null;
  }
});

/**
 * Sign in with email and password.
 * Returns the user data. Session cookies are managed by @supabase/ssr.
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<{ user: User }> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const { data: profile } = await supabase
    .from('profiles')
    .select(PROFILE_SELECT)
    .eq('id', data.user.id)
    .single();

  return { user: profileToUser(data.user.id, data.user.email!, profile) };
}

/**
 * Find or create a user (used by Stripe webhook).
 * Uses service_role client to bypass RLS.
 */
export async function findOrCreateUser(
  email: string,
  name: string,
  stripeCustomerId?: string,
): Promise<{ user: User; isNew: boolean; tempPassword?: string }> {
  const supabase = getServiceSupabase();

  // Try to find existing user by email
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existing = existingUsers?.users?.find((u) => u.email === email);

  if (existing) {
    const { data: profile } = await supabase
      .from('profiles')
      .select(PROFILE_SELECT)
      .eq('id', existing.id)
      .single();

    return {
      user: profileToUser(existing.id, existing.email!, profile, name),
      isNew: false,
    };
  }

  // Create new user
  const tempPassword = generateTempPassword();
  const { data: newUser, error } = await supabase.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { name },
  });

  if (error) throw error;

  // Update profile with stripe_customer_id if provided
  if (stripeCustomerId) {
    await supabase
      .from('profiles')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', newUser.user.id);
  }

  return {
    user: {
      id: newUser.user.id,
      email: newUser.user.email!,
      name,
      stripeCustomerId: stripeCustomerId || undefined,
      programIntensivePaidFull: false,
      programIntensivePaid1: false,
      programIntensivePaid2: false,
    },
    isNew: true,
    tempPassword,
  };
}

/**
 * Change user password. Verifies old password first, then updates.
 */
export async function changeUserPassword(
  userId: string,
  email: string,
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  const supabase = await createServerSupabase();

  // Verify old password by attempting to sign in
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: oldPassword,
  });
  if (authError) throw authError;

  // Update password via admin API
  const adminSupabase = getServiceSupabase();
  const { error: updateError } =
    await adminSupabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });
  if (updateError) throw updateError;
}

/**
 * Request a password reset email via Brevo.
 * Uses admin.generateLink() to create a secure recovery link,
 * then sends it via Brevo for consistent branding.
 */
export async function requestPasswordReset(email: string): Promise<void> {
  const { sendPasswordResetEmail } = await import('./brevo');
  const supabase = getServiceSupabase();

  const redirectTo = `${process.env.NEXT_PUBLIC_DOMAIN}/mi-cuenta/reset-password`;

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo },
  });

  if (error) throw error;

  const actionLink = data.properties.action_link;
  await sendPasswordResetEmail(email, actionLink);
}

/**
 * Update a user's Stripe customer ID in their profile.
 */
export async function updateStripeCustomerId(
  userId: string,
  stripeCustomerId: string,
): Promise<void> {
  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from('profiles')
    .update({ stripe_customer_id: stripeCustomerId })
    .eq('id', userId);
  if (error) throw error;
}

/**
 * Update Programa Intensivo payment flags on a user's profile.
 */
export async function updateProgramIntensivePaymentState(
  userId: string,
  flags: { paidFull?: boolean; paid1?: boolean; paid2?: boolean },
): Promise<void> {
  const supabase = getServiceSupabase();
  const update: Record<string, boolean> = {};
  if (flags.paidFull !== undefined) update.program_intensive_paid_full = flags.paidFull;
  if (flags.paid1 !== undefined) update.program_intensive_paid_1 = flags.paid1;
  if (flags.paid2 !== undefined) update.program_intensive_paid_2 = flags.paid2;

  const { error } = await supabase
    .from('profiles')
    .update(update)
    .eq('id', userId);
  if (error) throw error;
}
