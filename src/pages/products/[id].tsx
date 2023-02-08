import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import RatingStarts from "../../components/RatingStarts";
import cn from "../../utils/cn";
import { trpc } from "../../utils/trpc";
import { prisma } from "../../server/db/client";

const ASSETS_DIR = "/assets/products";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const productId = router.query.id as string;
  const [qty, setQty] = useState(1);
  const [imgisLoading, setimgLoading] = useState(true);

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!session) router.push("/api/auth/signin");
    if (!session?.user) return;
    if (!session?.user?.cartId) console.log("No cart"); // [to.do] create cart

    // check if same product exists update its quantity
    const existingCart = await prisma.cart_item.findFirst({
      where: {
        product_id: product?.id,
        cart_id: session?.user.cartId,
      },
    });
    // create new cart item with the current product id and session user id
    const result = await createCartMutation.mutateAsync({
      cart_id: session?.user.cartId as string,
      product_id: product?.id as string,
      quantity: qty,
    });
    console.log(result);
  };

  const incrementQty = () => {
    if (product?.quantity && qty + 1 <= product?.quantity) setQty(qty + 1);
  };
  const decrementQty = () => {
    if (qty - 1 >= 0) setQty(qty - 1);
  };
  // trpc
  const createCartMutation = trpc.cart.createCartItem.useMutation();
  const { data: product, isLoading } = trpc.product.getProductByID.useQuery({
    id: productId,
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>JoeJew - {product?.name}</title>
      </Head>
      <main className="mt-6">
        {/* Content */}
        <div className="flex">
          {/* Image */}
          <div className="w-2/6">
            <div className="aspect-w-1 aspect-h-1 relative w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <Image
                alt={product?.name || "Product Image"}
                src={
                  product?.image?.startsWith("http")
                    ? product.image
                    : `${ASSETS_DIR}/${product?.image}.png`
                }
                fill
                style={{ objectFit: "cover" }}
                className={cn(
                  "duration-700 ease-in-out",
                  imgisLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                )}
                onLoadingComplete={() => setimgLoading(false)}
              />
            </div>
          </div>
          {/* Details */}
          <div>
            <h3 className="">{product?.name}</h3>
            <p className=" text-Bs text-[14px] text-main">
              $ {product?.price.toFixed(2)}
            </p>
            <RatingStarts />
            <p className="text-h5 text-my_darkGray">{product?.description}</p>
            <div className="flex">
              {/* Counter */}
              <div className=" relative mt-1 flex h-12 w-full flex-row rounded-lg bg-transparent">
                <button
                  onClick={decrementQty}
                  className="h-full w-6 cursor-pointer rounded-l bg-my_lightGray text-my_darkGray outline-none"
                >
                  <span className="m-auto text-sm font-thin">−</span>
                </button>
                <input
                  type="number"
                  className="w-6 items-center bg-my_lightGray text-center text-sm text-my_darkGray"
                  value={qty}
                  min="1"
                />
                <button
                  onClick={incrementQty}
                  className="h-full w-6 cursor-pointer rounded-r bg-my_lightGray text-my_darkGray "
                >
                  <span className="m-auto text-sm font-thin">+</span>
                </button>
              </div>
              {/* Add to cart */}
              <button onClick={handleAddToCart} className="prym-btn px-20">
                ADD TO CART
              </button>
            </div>
            {/* Icons */}
            <div className="group flex w-fit text-my_darkGray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer group-hover:fill-my_darkGray"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <h3 className="w-fit cursor-pointer">Add to favourites</h3>
            </div>
            <div>
              <h4>
                <span className="font-semibold">Stock:</span>{" "}
                {product?.quantity}
              </h4>
              <h4>
                <span className="font-semibold">Categories:</span>{" "}
                {product?.category_id}
              </h4>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
