import type { Awaitable, NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Session } from "inspector";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Check if user in db
        const user = await prisma.user.findFirst({
          where: { username: credentials?.username },
        });
        if (!user) return null;
        // Validate password
        const isValidPassword = user.password == credentials?.password;
        if (!isValidPassword) return null;

        const userCart = await prisma.cart.findFirst({
          where: { user_id: user.id },
        });
        return {
          id: user.id,
          cartId: userCart?.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.cartId = token.cartId;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.cartId = token.cartId;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
