import Image from "next/image";
import img1 from "../assets/Carousel/carousel_img1.png";

const Carosel = () => {
  return (
    <div className="relative mt-4">
      <Image
        className="max-h-[40rem] min-h-[385px] w-full rounded-md object-cover object-right-top"
        src={img1}
        alt=""
      />
      {/* Content */}
      <div className="mb:pb-0 absolute inset-y-0 left-0 flex flex-col justify-end px-3 pb-10 text-white md:justify-center md:px-6">
        <h1 className="mb-3 text-h4">Gold big hoops</h1>
        <p className="mb-6 text-Bs">
          $ <span>68,00</span>
        </p>
        <button className="tranition w-fit  rounded-[4px] border-[1.5px] border-white py-[10px] px-[10px] text-Bs duration-200 hover:bg-white hover:text-black md:border-2 md:px-5 md:font-medium">
          View Product
        </button>
      </div>
    </div>
  );
};

export default Carosel;
