import Image from "next/image";
import React from "react";
const ASSETS_DIR = "/assets/products";

const ProductPage = () => {
  return (
    <div className="mt-4">
      {/* Img */}
      <Image
        className="mb-6 max-h-[485px] w-full rounded-md object-cover object-center"
        src={`${ASSETS_DIR}/productImg_1_1.png`}
        alt=""
      />
      {/* Title Price */}
      <h3 className="text-h3 mb-4 text-[28px]">Lira Earrings</h3>
      <p className="text-h5 text-main text-[20px]">$ 20,00</p>

      {/* Add to cart */}
      <button className="white-btn mt-6 w-full">ADD TO CART</button>
      <div className="divider"></div>
    </div>
  );
};

export default ProductPage;
