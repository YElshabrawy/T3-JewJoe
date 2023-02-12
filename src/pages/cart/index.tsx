import { GetStaticProps, type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import CartItem from "../../components/CartItem";
import { trpc } from "../../utils/trpc";

const CartPage: NextPage = () => {
  const { data: session } = useSession();
  const { data: cartItems } = trpc.cart.getCartItems.useQuery({
    cart_id: session?.user?.cartId || "",
  });

  return (
    <>
      <Head>
        <title>JoeJew - Cart</title>
      </Head>
      <main className="mt-28">
        <h1 className="w-full text-center text-[28px] font-medium">
          Shopping Cart
        </h1>
        <div className="md:flex">
          {/* cart items */}
          <div className="divide-y-0 md:w-1/2">
            {cartItems?.map((product) => {
              return <CartItem key={product.id} product={product} />;
            })}
          </div>
          {/* checkout details */}
          <form action="/api/checkout_sessions" method="POST">
            <button type="submit" role="link">
              Checkout
            </button>
          </form>
        </div>
        {/* <div className="mx-auto w-full px-4">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {allProducts?.map((product) => {
              return <ProductItem2 key={product.id} product={product} />;
            })}
          </div>
        </div> */}
      </main>
    </>
  );
};

export default CartPage;
