import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");
      const isPrivateRoute = nextUrl.pathname.startsWith("/admin");

      // if (isPrivateRoute && !isLoggedIn) {
      //   return false;
      // }

      // if (isLoggedIn && isAuthRoutes) {
      //   return Response.redirect(new URL("/", nextUrl));
      // }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.status = user.status;
        token.roles = user.roles;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session({ session, token }) {
      if (token.roles) session.user.roles = token.roles;
      if (token.firstName) session.user.firstName = token.firstName;
      if (token.lastName) session.user.lastName = token.lastName;
      if (token.status) session.user.status = token.status;
      return session;
    },
  },
} as NextAuthConfig;
