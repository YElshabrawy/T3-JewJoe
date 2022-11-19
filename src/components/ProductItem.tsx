import Image from "next/image";

const ASSETS_DIR = "/assets/products";
const ProductItem = () => {
  return (
    <div className="">
      <button className="relative h-[136px] w-[136px] max-w-[162px] md:h-[380px] md:min-w-[380px]">
        <Image
          src={`${ASSETS_DIR}/productImg_1_1.png`}
          alt=""
          className="rounded"
          layout="fill"
          objectFit="contain"
        />
      </button>
      <h3>Lira Earrings</h3>
      <p className="text-Bs text-[14px] text-main">$ 20,00</p>
    </div>
  );
};

export default ProductItem;
