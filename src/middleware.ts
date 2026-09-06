import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Cookie se token nikaalein
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 2. Define karein kaunse pages login/register ke hain
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  // 3. AGAR USER LOGGED IN HAI aur wo login/register page par jana chahta hai
  // Toh usay wapas dashboard par bhej do
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. AGAR USER LOGGED IN NAHI HAI aur wo dashboard par jana chahta hai
  // Toh usay login page par bhej do (Security)
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Ye middleware kin pages par chalna chahiye
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};