import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const cartRouter = router({
  createCartItem: publicProcedure
    .input(
      z.object({
        cart_id: z.string(),
        product_id: z.string(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.prisma.cart_item.create({
          data: {
            cart_id: input.cart_id,
            product_id: input.product_id,
            quantity: input.quantity,
          },
        });
        return {
          status: 201,
          message: "Cart Item created successfully",
          result,
        };
      } catch (error) {
        console.log("error", error);
      }
    }),
});
