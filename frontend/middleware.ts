import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/chats'];
const authRoutes = ['/login', 'signup', 'forgot-password'];
const publicRoutes = ['/'];

export function middleware (request: NextRequest) {
  let cookie = request.cookies.get('token');

  if (protectedRoutes.includes(request.nextUrl.pathname) && cookie && cookie.value) {
    return NextResponse.next()
  } else if (authRoutes.includes(request.nextUrl.pathname) && cookie && cookie.value) {
    return NextResponse.redirect(new URL('/chats', request.url));
  } else {
    return NextResponse.next()
  }

}

export const config = {
  matcher: ['/chats/:path*', '/login', '/signup', '/forgot-password']
};
