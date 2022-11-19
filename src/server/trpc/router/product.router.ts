// import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.product.findMany({ orderBy: { id: "asc" } });
    } catch (error) {
      console.log("error", error);
    }
  }),
});
