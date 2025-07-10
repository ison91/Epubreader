
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  const domain = 'epubreader.tech';
  const wwwHost = `www.${domain}`;
  
  // Only redirect in production
  if (process.env.NODE_ENV === 'production' && host === wwwHost) {
    const newUrl = new URL(request.url);
    newUrl.host = domain;
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  return NextResponse.next();
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
