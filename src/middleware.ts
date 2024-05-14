import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isProtectedRoute = createRouteMatcher(['/account(.*)']);

export default clerkMiddleware((auth, req) => {
  // if (isAdminRoute(req)) auth().protect().has({ role: 'org:admin' });
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
