import { router } from "../trpc";
import { productRouter } from "./product.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  product: productRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
