import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
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
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          firstname: user.firstname,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
