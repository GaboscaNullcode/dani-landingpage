import { NextRequest, NextResponse } from 'next/server';
import {
  getCurrentUser,
  changeUserPassword,
  loginUser,
} from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('pb_auth')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const user = await getCurrentUser(token);

    if (!user) {
      return NextResponse.json({ error: 'Token invalido' }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Ambas contrasenas son requeridas' },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'La nueva contrasena debe tener al menos 8 caracteres' },
        { status: 400 },
      );
    }

    await changeUserPassword(user.id, user.email, oldPassword, newPassword);

    const { token: newToken } = await loginUser(user.email, newPassword);

    const response = NextResponse.json({ success: true });
    response.cookies.set('pb_auth', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Contrasena actual incorrecta' },
      { status: 400 },
    );
  }
}
