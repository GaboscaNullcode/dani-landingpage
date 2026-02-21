import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase, getServiceSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, contrasena y nombre son requeridos' },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contrasena debe tener al menos 6 caracteres' },
        { status: 400 },
      );
    }

    const adminSupabase = getServiceSupabase();

    // Check if user already exists
    const { data: existingUsers } = await adminSupabase.auth.admin.listUsers();
    const existing = existingUsers?.users?.find((u) => u.email === email);

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe una cuenta con este email' },
        { status: 409 },
      );
    }

    // Create user via admin API (email_confirm: true to skip verification)
    const { data: newUser, error: createError } =
      await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
      });

    if (createError) throw createError;

    // Sign in to set session cookies
    const supabase = await createServerSupabase();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;

    return NextResponse.json({
      user: {
        id: newUser.user.id,
        email: newUser.user.email!,
        name,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al crear la cuenta' },
      { status: 500 },
    );
  }
}
