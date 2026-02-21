import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contrasena son requeridos' },
        { status: 400 },
      );
    }

    const { user } = await loginUser(email, password);

    // Cookies are managed automatically by @supabase/ssr
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { error: 'Credenciales invalidas' },
      { status: 401 },
    );
  }
}
