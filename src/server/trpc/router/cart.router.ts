import type { cart_item } from "@prisma/client";
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
        // check if cart already exists and just update its value if so
        const existingCartItem = await ctx.prisma.cart_item.findFirst({
          where: {
            product_id: input.product_id,
            cart_id: input.cart_id,
          },
        });
        // if quantity = 0 remove
        if (!existingCartItem && input.quantity == 0) return;
        if (
          existingCartItem?.quantity == 0 ||
          (existingCartItem && input.quantity == 0)
        ) {
          await ctx.prisma.cart_item.delete({
            where: {
              cart_id_product_id: {
                cart_id: existingCartItem.cart_id,
                product_id: existingCartItem.product_id,
              },
            },
          });
          return;
        }
        let result: cart_item;
        if (existingCartItem) {
          // just update its quantity
          result = await ctx.prisma.cart_item.update({
            where: {
              cart_id_product_id: {
                cart_id: existingCartItem.cart_id,
                product_id: existingCartItem.product_id,
              },
            },
            data: {
              quantity: input.quantity,
            },
          });
        } else {
          //create
          result = await ctx.prisma.cart_item.create({
            data: {
              cart_id: input.cart_id,
              product_id: input.product_id,
              quantity: input.quantity,
            },
          });
        }
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
