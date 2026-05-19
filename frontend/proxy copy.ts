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

  const pubicRoutes = ["/login", "/password-reset", "/password-reset-confirm"];

  const isPublicRoute = pubicRoutes.some((route) => pathname.startsWith(route));
  if (isPublicRoute && !access_token) {
    return NextResponse.next();
  }

  // Allow login page if no token
  if (
    (pathname.startsWith("/login") ||
      pathname.startsWith("/password-reset") ||
      pathname.startsWith("/password-reset-confirm")) &&
    !access_token
  ) {
    return NextResponse.next();
  }

  // ********************* No Token Handling  **********************|
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

  // Expired Token Handling
  if (decoded.exp * 1000 < Date.now()) {
    return NextResponse.rewrite(new URL("/api/auth/refresh/", request.url));
  }

  /***************** Prevent Access to Login Page if User is Logged In  ***/
  if (pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /***************** Handle Password Reset Access and Token Clearance  *****************/
  if (pathname.startsWith("/password-reset-confirm")) {
    const res = NextResponse.next();
    res.cookies.delete("access-token");
    res.cookies.delete("refresh-token");
    return res;
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
