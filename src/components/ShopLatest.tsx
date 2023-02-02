import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";
import ProductItem from "./ProductItem";

const ShopLatest = () => {
  const { data: products, isLoading } = trpc.product.getAllProducts.useQuery();
  if (isLoading) return <p>Loading...</p>;

  console.log("WOHO:", products);

  return (
    <div className="mt-6">
      {/* Title */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-h5 text-[20px]">Shop The Latest</h1>
        <Link href="/products" className="text-h5 text-[18px] text-main">
          View all
        </Link>
      </div>
      {/* Products */}
      <div className="flex flex-wrap justify-around gap-4 ">
        {products?.map((product, i) => {
          return <ProductItem key={i} product={product} />;
        })}

        {/* <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem /> */}
      </div>
    </div>
  );
};

export default ShopLatest;
