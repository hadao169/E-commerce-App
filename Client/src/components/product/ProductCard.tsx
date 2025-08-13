import { ProductInput } from "@/types";
import Link from "next/link";
import Image from "next/image";

type ProductProp = {
  product: ProductInput;
};

const ProductCard = ({ product }: ProductProp) => {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="flex flex-col items-center rounded-md shadow-md bg-white hover:scale-102 hover:border-orange-500 border border-gray-100 transition-all duration-200 cursor-pointer overflow-hidden">
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="object-contain group-hover:scale-110 transition-transform duration-200 h-4/5 w-full"
          />
        </div>
        <div className="px-3 py-3 w-full flex flex-col gap-2">
          <p className="text-base font-medium truncate">{product.name}</p>
          <div className="text-xs border border-orange-500 px-2 py-0.5 rounded text-orange-500 w-max">
            Free Shipping
          </div>
          <p className="text-[13px] w-full truncate">{product.description}</p>
          <div className="flex w-full items-center justify-between mt-2">
            <span className="text-orange-500 font-bold text-lg">
              <span className="text-[14px] mr-[1px]">$</span>
              {product.price.toLocaleString()}
            </span>
            <span className="text-sm">{product.numSales} sold</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
