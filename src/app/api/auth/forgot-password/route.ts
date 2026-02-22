import { NextRequest, NextResponse } from 'next/server';
import { requestPasswordReset } from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 },
      );
    }

    try {
      await requestPasswordReset(email.trim().toLowerCase());
    } catch (err) {
      // Silently log but don't expose to client (prevents email enumeration)
      console.error('[forgot-password] Error:', err);
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
