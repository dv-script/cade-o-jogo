import NextAuth, { type DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    roles: string[];
    status: string;
  }

  interface Session {
    user: {
      firstName: string;
      lastName: string;
      roles: string[];
      status: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    firstName: string;
    lastName: string;
    roles: string[];
    status: string;
  }
}
