import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from "./lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API routes, internal next files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".") // favicon.ico, robots.txt, etc.
  ) {
    return NextResponse.next();
  }

  // Handle Admin routes without adding /[locale]/
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("edunish_admin_token")?.value;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathnameSegments[0];

  if (!firstSegment || !isValidLocale(firstSegment)) {
    // Detect preferred language from headers or fallback
    const acceptLanguage = request.headers.get("accept-language") || "";
    let detectedLocale = DEFAULT_LOCALE;

    if (acceptLanguage.includes("ta")) {
      detectedLocale = "ta";
    } else if (acceptLanguage.includes("en")) {
      detectedLocale = "en";
    }

    // Redirect to localized URL
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
