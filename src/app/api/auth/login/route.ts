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

    const { token, user } = await loginUser(email, password);

    const response = NextResponse.json({ token, user });
    response.cookies.set('pb_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Credenciales invalidas' },
      { status: 401 },
    );
  }
}
