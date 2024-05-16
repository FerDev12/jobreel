import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/app(.*)', '/welcome(.*)']);
const isAuthRoute = createRouteMatcher(['/log-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  console.log('middleware', req.nextUrl.pathname);
  if (isProtectedRoute(req)) auth().protect();
  if (isAuthRoute(req)) {
    const { userId } = auth();

    if (userId) {
      return NextResponse.redirect(new URL('/app', req.url));
    }
  }

  const requestHeaders = req.headers;

  const ip =
    requestHeaders.get('x-forwarded-for')?.split(',')[0] ??
    requestHeaders.get('x-ip');
  const origin = req.nextUrl.origin;
  const pathname = req.nextUrl.pathname;

  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);

  if (ip) {
    requestHeaders.set('x-ip', ip);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('x-origin', origin);
  response.headers.set('x-pathname', pathname);

  if (ip) {
    response.headers.set('x-ip', ip);
  }

  return response;
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
