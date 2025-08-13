import React, { useState } from "react";
import { Ambulance, ShieldCheck, Plus, Minus } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { ProductDetailsProps } from "@/types";

const now = new Date();
const futureDate = new Date(now);
futureDate.setDate(now.getDate() + 7);

const textClassname = "text-gray-500 text-[15px]";

type ProductInfo = {
  name: string;
  value: (string | React.ReactNode)[];
  details?: string[];
  icon?: React.ReactNode;
  available?: string;
  type?: string | any;
  condition?: boolean;
};

const ProductDetails = ({ productType, product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleQuantityChange = (action: "increase" | "decrease") => {
    setQuantity((prev) =>
      action === "increase" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  const addQuantityDiv = (
    <div className="flex items-center gap-3">
      <div className="flex items-center border rounded">
        <button
          className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleQuantityChange("decrease")}
          disabled={quantity <= 1}>
          <Minus size={16} />
        </button>
        <div className="border-x px-4">{quantity}</div>
        <button
          className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleQuantityChange("increase")}
          disabled={quantity >= 16}>
          <Plus size={16} />
        </button>
      </div>
      <div
        className={
          textClassname
        }>{`${product.countInStock - quantity} items available`}</div>
    </div>
  );

  const baseProductInfos: ProductInfo[] = [
    {
      name: "Shop Vouchers",
      value: [`${product.discount}% OFF`],
    },
    {
      name: "Shipping",
      value: [`Guaranteed to get by ${formatDate(futureDate)}`],
      details: [
        "Free shipping",
        `Get a ${formatPrice(15)} voucher if your order arrives late`,
      ],
      icon: <Ambulance strokeWidth={1.5} size={22} color="#16d4b5" />,
    },
  ];

  const dynamicInfos: ProductInfo[] = [
    ...baseProductInfos,
    {
      name: "Color",
      value: product.colors,
      condition: ["women-dresses", "mens-shirts", "smartphone"].includes(
        productType
      ),
    },
    {
      name: "Size",
      value: product.sizes,
      condition: ["women-dresses", "men-shirts"].includes(productType),
    },
    {
      name: "Shopping Guarantee",
      value: ["Electronics insurance", "100% Authentic"],
      icon: <ShieldCheck strokeWidth={1.5} size={22} color="red" />,
      condition: ["mens-watches", "smartphones"].includes(productType),
    },
    {
      name: "Quantity",
      value: [addQuantityDiv],
    },
  ].filter((info) => !("condition" in info) || info.condition);

  const renderValueContent = (info: any) => {
    if (info.name === "Color") {
      return (
        <div className="flex gap-2 mt-1">
          {info.value?.map((color: string) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded border ${
                selectedColor === color
                  ? "ring-1 ring-offset-2 ring-red-500"
                  : ""
              } cursor-pointer`}
              style={{ backgroundColor: color.toLowerCase() }}
              aria-label={color}
            />
          ))}
        </div>
      );
    }

    if (info.name === "Size") {
      return (
        <div className="flex gap-2 mt-1">
          {info.value?.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-sm border rounded ${
                selectedSize === size ? "bg-gray-400 text-white" : "bg-white"
              } cursor-pointer`}>
              {size}
            </button>
          ))}
        </div>
      );
    }
    return (
      <div className="flex flex-col">
        {info.value?.map((v: string, i: number) => <span key={i}>{v}</span>)}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:gap-6 gap-3">
      {dynamicInfos.map((info, idx) => (
        <div
          key={`${info.name}-${idx}`}
          className="w-full flex flex-col sm:flex-row gap-1 sm:gap-0 text-sm">
          <div className={`${textClassname} w-32 flex-shrink-0`}>
            {info.name}
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              {info.icon && <span>{info.icon}</span>}
              {renderValueContent(info)}
            </div>

            {info.details && (
              <ul className="mt-1 space-y-1">
                {info.details.map((detail, i) => (
                  <li key={i} className="text-[12px] text-gray-600">
                    • {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
