import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/';

  // Attempt to get the token from cookies
  const token = request.cookies.get('firebase-auth-token')?.value || '';

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  
  if (isPublicPath && token && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/account'
  ],
};
