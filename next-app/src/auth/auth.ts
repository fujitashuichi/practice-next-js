import { prisma } from "@/lib";
import { logger } from "@/tools/log";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"


const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [GitHub],
  basePath: "/api/auth",
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
      }
      return session;
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
