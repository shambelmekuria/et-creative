# Token Expiration Handling Flow

When token expires:
1. Check if token is expired
2. Prevent infinite loop requests:

if (
  decoded.exp * 1000 < Date.now() &&
  !pathname.startsWith("/api/auth/refresh")
)
3. If expired, redirect request to refresh endpoint
4. Refresh token and continue original request flow