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

// Regex for path validation
const admin_paths_regex = /^\/admin(\/|$)/;

export async function proxy(request: NextRequest) {
  const access_token = request.cookies.get("access-token")?.value;
  const { pathname } = request.nextUrl;

  // Allow login page if no token
  if (
    (pathname.startsWith("/login") ||
      pathname.startsWith("/password-reset") ||
      pathname.startsWith("/password-reset-confirm")) &&
    !access_token
  ) {
    return NextResponse.next();
  }

  // if there is no token , redirect to login
  if (!access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (access_token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // *******************************
  // Password Reset Related        |
  // ******************************
  if (access_token && pathname.startsWith("/password-reset")) {
    // /password-reset include /password-reset-confirm and its token
    const res = NextResponse.next();
    res.cookies.delete("access-token");
    res.cookies.delete("refresh-token");
    return res;
  }

  // Token exists  decode/translate/
  let decoded: decodeTokenValues;
  try {
    decoded = jwtDecode<decodeTokenValues>(access_token);
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Expired token , Rewrite to refresh API
  if (decoded.exp * 1000 < Date.now()) {
    return NextResponse.rewrite(new URL("/api/auth/refresh/", request.url));
  }

  if (admin_paths_regex.test(pathname)) {
    // If the user is not admin, redirect to home page
    if (decoded.role !== "admin") {
      return  NextResponse.redirect(new URL("/", request.url));
    }
  }
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
