import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.product.findMany({ orderBy: { id: "asc" } });
    } catch (error) {
      console.log("error", error);
    }
  }),
  getProductByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullish(),
        price: z.number(),
        image: z.string().nullish(),
        category_id: z.number().nullish(),
        discount_id: z.number().nullish(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.prisma.product.create({
          data: {
            ...input,
          },
        });
        return {
          status: 201,
          message: "Product created successfully",
          result,
        };
      } catch (error) {
        console.log("error", error);
      }
    }),
});
