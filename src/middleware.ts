
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initAdmin } from './firebase/adminApp';

const app = initAdmin();
const auth = getAuth(app);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Public paths that do not require authentication
  const isPublicPath = path === '/login' || path === '/signup' || path.startsWith('/auth') || path === '/';

  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie?.value;

  if (isPublicPath) {
    // If the user is logged in and tries to access login/signup, redirect to dashboard
    if (token && (path === '/login' || path === '/signup')) {
      try {
        await auth.verifyIdToken(token);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (error) {
        // Invalid token, let them proceed to the public path
      }
    }
    return NextResponse.next();
  }

  // Protected paths logic
  if (!token) {
    // If no token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the token
    await auth.verifyIdToken(token);
    // If token is valid, let the request proceed
    return NextResponse.next();
  } catch (error) {
    // If token is invalid (e.g., expired), redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    // Clear the invalid cookie
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
