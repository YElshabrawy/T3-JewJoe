import type { product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ASSETS_DIR = "/assets/products";
const ProductItem = ({ product }: { product: product }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt={product.name}
          src={
            product.image?.startsWith("http")
              ? product.image
              : `${ASSETS_DIR}/${product.image}.png`
          }
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          style={{ objectFit: "cover" }}
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-40",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="w-fit cursor-pointer">{product.name}</h3>{" "}
      <p className="w-fit cursor-pointer text-Bs text-[14px] text-main">
        $ {product.price.toFixed(2)}{" "}
      </p>
    </Link>
    // <div className="">
    //   <button className="relative h-[136px] w-[136px] max-w-[162px] md:h-[380px] md:min-w-[380px]">
    //     <Image
    //       src={`${ASSETS_DIR}/${product.image}.png`}
    //       alt=""
    //       className="rounded"
    //       layout="fill"
    //       objectFit="contain"
    //       onClick={handleClickImage}
    //     />
    //   </button>
    //   <h3>{product.name}</h3>
    //   <p className="text-Bs text-[14px] text-main">
    //     $ {product.price.toFixed(2)}
    //   </p>
    // </div>
  );
};

export default ProductItem;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
