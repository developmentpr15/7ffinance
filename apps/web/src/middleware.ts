import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');
  if (!basicAuth) {
    return new NextResponse('Admin only', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
    });
  }

  // Decode base64
  const [user, pass] = atob(basicAuth.split(' ')[1]).split(':');
  if (user === 'admin' && pass === '7f2025') {
    return NextResponse.next();
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export const config = {
  matcher: ['/admin/:path*'],
};