# searchParams is used to add data into URL.

refreshURL.searchParams.set("next", request.nextUrl.pathname);

# Adds current page path as next in URL
Example:

/api/auth/refresh/?next=/dashboard

# Backend reads next to redirect user after refresh/login.