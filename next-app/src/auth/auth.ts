import { logger } from "@/tools/log";
import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"

const config: NextAuthConfig = {
  providers: [GitHub],
  basePath: "/api/auth",
  callbacks: {
    authorized({ auth }) {
      try {
        const isLoggedIn = !!auth?.user;
        if (!isLoggedIn) return false;

        return true;
      } catch (err) {
        logger.fatal(err);
        return false;
      }
    },
  }
};


export const { handlers, signIn, signOut, auth } = NextAuth(config);
