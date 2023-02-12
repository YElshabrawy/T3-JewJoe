import { GetStaticProps, type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import CartItem from "../../components/CartItem";
import { trpc } from "../../utils/trpc";
import Stripe from "stripe";
import { env } from "../../env/client.mjs";

const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const CartPage: NextPage = () => {
  const { data: session } = useSession();
  const { data: cartItems } = trpc.cart.getCartItems.useQuery({
    cart_id: session?.user?.cartId || "",
  });

  const handleCheckoutSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    // create stripe products
    cartItems?.map(async (item) => {
      const product = await stripe?.products.create({
        name: item.name,
        active: true,
        images: [item.image || ""],
        description: item.description || "Unknown",
      });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: item.price * 100,
        currency: "usd",
      });
      const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        price: price.id,
        quantity: item.quantity,
      };
      lineItems.push(lineItem);
    });
    console.log("lineItems", lineItems);
  };

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
            <button onClick={handleCheckoutSubmit}>Checkout</button>
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
