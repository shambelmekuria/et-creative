Recommended approach (BEST)
✔ Step 1: After successful password reset (Django)

Do this in backend:

Change password
Blacklist / revoke all refresh tokens
Optionally invalidate all sessions
If using SimpleJWT:
Use token blacklist app

👉 Result:

All existing tokens become useless
✔ Step 2: Clear frontend cookies

After reset success response:

res.cookies.delete("access-token");
res.cookies.delete("refresh-token");
✔ Step 3: Redirect to login
return redirect("/login")