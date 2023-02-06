import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    cartId?: string;
  }
}
declare module "next-auth" {
  interface User {
    id: string;
    cartId?: string;
  }
  interface Session extends DefaultSession {
    user?: User;
  }
}
