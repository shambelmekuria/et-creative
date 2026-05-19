export function proxy(request: NextRequest) {
  const token = request.cookies.get("access-token")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/password-reset", "/password-reset-confirm"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 1. Prevent logged-in users from accessing public pages
  if (token && isPublicRoute) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.is_admin) {
        return NextResponse.redirect(
          new URL("/admin/dashboard", request.url)
        );
      }

      return NextResponse.redirect(new URL("/", request.url));
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Allow public routes (for logged-out users)
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 3. Protect private routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decode token
  let decoded: decodeTokenValues;
  try {
    decoded = jwtDecode(token);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Handle expired token (avoid loop)
  if (
    decoded.exp * 1000 < Date.now() &&
    !pathname.startsWith("/api/auth/refresh")
  ) {
    const refreshURL = new URL("/api/auth/refresh/", request.url);
    refreshURL.searchParams.set("next", pathname);
    return NextResponse.redirect(refreshURL);
  }

  // 5. Admin route protection (UX only)
  if (pathname.startsWith("/admin")) {
    if (decoded.role !== "admin" && !decoded.is_admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}