import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/mi-cuenta/login') {
    return NextResponse.next();
  }

  const { supabaseResponse, user } = await updateSession(request);

  if (!user) {
    const loginUrl = new URL('/mi-cuenta/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/mi-cuenta/:path*'],
};
