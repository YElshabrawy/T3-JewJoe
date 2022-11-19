import React from "react";
import ProductItem from "./ProductItem";

const ShopLatest = () => {
  return (
    <div className="mt-6">
      {/* Title */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-h5 text-[20px]">Shop The Latest</h1>
        <button className="text-h5 text-main text-[18px]">View all</button>
      </div>
      {/* Products */}
      <div className="flex flex-wrap justify-around gap-4 ">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default ShopLatest;
