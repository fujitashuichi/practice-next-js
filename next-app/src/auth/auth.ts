import { prisma } from "@/server/lib";
import { logger } from "@/tools/log";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"

const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  basePath: "/api/auth",
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`
    },
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
