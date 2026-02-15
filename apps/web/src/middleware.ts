import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/auth", "/auth/callback"];

// Routes that require full authentication (no anonymous users)
const AUTHENTICATED_ONLY_ROUTES = ["/feed", "/portfolio"];

// Routes only for anonymous users
const ANONYMOUS_ONLY_ROUTES = ["/discover"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for public routes (auth pages)
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if route is anonymous-only (like /discover)
  const isAnonymousOnlyRoute = ANONYMOUS_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isAnonymousOnlyRoute) {
    // If user is authenticated (not anonymous), redirect to /feed
    if (user && !user.is_anonymous) {
      const url = request.nextUrl.clone();
      url.pathname = "/feed";
      return NextResponse.redirect(url);
    }
    // Allow anonymous users or no user to access
    return NextResponse.next();
  }

  // No user at all - redirect to auth
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // Check if route requires full authentication (no anonymous users)
  const requiresFullAuth = AUTHENTICATED_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (requiresFullAuth && user.is_anonymous) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
