"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SortOption } from "@/types";

type DropdownMenuProps = {
  onSortChange: (sort: SortOption) => void;
  sort: SortOption;
};

const DropdownMenu = ({ onSortChange, sort }: DropdownMenuProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // const handleSelect = (order: "asc" | "desc") => {
  //   onSortChange({ field: "price", order });
  //   setOpenMenu(false);
  // };
  return (
    <div
      className="relative w-40 bg-white"
      onClick={() => setOpenMenu((prev) => !prev)}>
      <div className="flex items-center justify-between w-full btn ">
        <span>Price</span>
        <ChevronDown size={18} strokeWidth={2.5} />
      </div>
      {openMenu && (
        <div className="absolute top-6 left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          <ul className="py-1">
            {["asc", "desc"].map((order) => {
              const active = sort.field === "price" && sort.order === order;
              return (
                <li
                  key={order}
                  className={`px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                    active && "bg-orange-500"
                  }`}
                  onClick={() =>
                    onSortChange({
                      field: "price",
                      order: order as "asc" | "desc",
                    })
                  }>
                  Price: {order === "asc" ? "Low to High" : "High to Low"}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
