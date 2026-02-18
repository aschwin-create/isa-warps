import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[Middleware] pathname:', pathname);

  // Redirect root to default locale
  if (pathname === "/") {
    console.log('[Middleware] Redirecting to /nl');
    const url = request.nextUrl.clone();
    url.pathname = "/nl";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(nl|en|id|de|fr)/:path*",
    "/((?!_next|api|trpc).*)"
  ],
};
