import type { NextAuthConfig } from "next-auth";

// Edge-safe base config used by middleware — no Prisma/bcrypt providers here,
// since Vercel Edge middleware can't run Node-only APIs those pull in.
export const authConfig = {
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = request.nextUrl.pathname === "/admin/login";
      if (isLoginPage) return !isLoggedIn || Response.redirect(new URL("/admin", request.nextUrl));
      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
