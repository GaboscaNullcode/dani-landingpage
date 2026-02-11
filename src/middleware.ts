import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/mi-cuenta/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('pb_auth')?.value;

  if (!token) {
    const loginUrl = new URL('/mi-cuenta/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mi-cuenta/:path*'],
};
