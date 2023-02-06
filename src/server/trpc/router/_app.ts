import { router } from "../trpc";
import { cartRouter } from "./cart.router";
import { productRouter } from "./product.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  product: productRouter,
  user: userRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
