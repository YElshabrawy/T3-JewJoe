import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        phone: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, email, password, firstname, lastname, phone } = input;
      // check if email or username exists
      const emailExists = await ctx.prisma.user.findFirst({
        where: { email },
      });
      const usernameExists = await ctx.prisma.user.findFirst({
        where: { username },
      });
      if (emailExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists.",
        });
      }
      if (usernameExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists.",
        });
      }

      // Create user
      const user = await ctx.prisma.user.create({
        data: {
          username,
          email,
          password,
          firstname,
          lastname,
          phone,
          cart: { create: {} },
        },
      });
      return {
        status: 201,
        message: "Account created successfully",
        result: user,
      };
    }),
});
