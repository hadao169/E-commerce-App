import { ProductInput } from "@/types";
import React from "react";

type Props = {
  product: ProductInput;
};

const formatValue = (value: unknown) => {
  if (value === null || value === undefined) return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const ProductDescription = ({ product }: Props) => {
  const allowedKeys: (keyof ProductInput)[] = [
    "countInStock",
    "category",
    "description",
    "tags",
  ];

  const keyDisplayMap: Record<keyof any, any> = {
    countInStock: "Stock",
    category: "Category",
  };

  return (
    <div className="bg-white mt-4 p-4 shadow-sm flex flex-col gap-4">
      <h2 className="text-lg font-medium px-2 py-2 bg-gray-100 ">
        Product Description
      </h2>
      <div className="space-y-4 px-2">
        <div className="space-y-3 px-2">
          {Object.entries(product)
            .filter(([key]) => allowedKeys.includes(key as keyof ProductInput))
            .map(([key, value]) => (
              <div key={key} className="flex gap-3 items-baseline">
                <span className="text-gray-600 text-sm font-medium w-40 shrink-0 capitalize">
                  {keyDisplayMap[key] ?? key}
                </span>
                <span className="text-gray-900 text-sm break-words flex-1">
                  {formatValue(value)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
