import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="flex flex-col items-center outline-[0.5px] outline-gray-200 bg-white hover:scale-102 hover:outline-orange-500 transition duration-200 cursor-pointer">
      <img src="/images/image.png" alt="Product 1" className=" h-2/3 w-full" />
      <div className="px-2 w-full h-full flex flex-col items-start justify-between py-2 mt-1">
        <div>
          <p className="text-[15px] mb-1">Product Title</p>
          <div className="text-[12px] border-1 border-orange-500 px-2 py-0.5 rounded text-orange-500">
            Free Shipping ...
          </div>
        </div>
        <div className="flex w-full items-center justify-between ">
          <span className="text-orange-500 font-semibold text-[15px]">
            $19.99
          </span>
          <span className="text-gray-600 text-[14px]">300k sold</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
