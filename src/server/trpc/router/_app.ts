import { router } from "../trpc";
import { productRouter } from "./product.router";

export const appRouter = router({
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
