import type { product } from "@prisma/client";
import Image from "next/image";

const ASSETS_DIR = "/assets/products";
const ProductItem = ({ product }: { product: product }) => {
  const handleClickImage = () => {
    console.log("clicked");
  };
  return (
    <div className="">
      <button className="relative h-[136px] w-[136px] max-w-[162px] md:h-[380px] md:min-w-[380px]">
        <Image
          src={`${ASSETS_DIR}/${product.image}.png`}
          alt=""
          className="rounded"
          layout="fill"
          objectFit="contain"
          onClick={handleClickImage}
        />
      </button>
      <h3>{product.name}</h3>
      <p className="text-Bs text-[14px] text-main">
        $ {product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductItem;
