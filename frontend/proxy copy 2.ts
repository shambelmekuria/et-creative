import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type decodeTokenValues = {
  exp: number;
  role?: string;
  username: string;
  is_admin?: boolean;
  is_user?: boolean;
};

export async function proxy(request: NextRequest) {
  const access_token = request.cookies.get("access-token")?.value;
  const { pathname } = request.nextUrl;
  const publicRoutes = ["/login", "/password-reset", "/password-reset-confirm"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 1. Allow public routes (for everyone)
  if (isPublicRoute && !access_token) {
    return NextResponse.next();
  }

  // 2. Protect private routes
  if (!access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decode Token & Handle Invalid Token
  let decoded: decodeTokenValues;
  try {
    decoded = jwtDecode<decodeTokenValues>(access_token);
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3.  Prevent Access to Public Page if User is Logged In
  if (access_token && isPublicRoute) {
    if (decoded.is_admin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  // Expired Token Handling
  if (
    decoded.exp * 1000 < Date.now() &&
    !pathname.startsWith("/api/auth/refresh")
  ) {
    const refreshURL = new URL("/api/auth/refresh", request.url);
    refreshURL.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(refreshURL);
  }

  // Admin Path Handling
  if (pathname.startsWith("/admin")) {
    // If the user is not admin, redirect to home page
    if (decoded.role !== "admin" && !decoded.is_admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login/:path*",
    "/logout/:path*",
    "/password-reset",
    "/password-reset-confirm/:path*",
  ],
};
