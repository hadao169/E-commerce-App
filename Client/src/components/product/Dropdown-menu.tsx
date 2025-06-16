import { ChevronDown } from "lucide-react";
import { useState } from "react";

type DropdownMenuProps = {
  onSortChange: (sort: { field: string; order: "asc" | "desc" }) => void;
};

const DropdownMenu = ({ onSortChange }: DropdownMenuProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // const handleSelect = (order: "asc" | "desc") => {
  //   onSortChange({ field: "price", order });
  //   setOpenMenu(false);
  // };

  return (
    <div
      className="relative w-40"
      onClick={() => setOpenMenu((prev) => !prev)}>
      <div className="flex items-center justify-between w-full btn">
        <span>Price</span>
        <ChevronDown size={18} strokeWidth={2.5} />
      </div>
      {openMenu && (
        <div className="absolute top-6 left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          <ul className="py-1">
            <li className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Price: Low to High
            </li>
            <li className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
              Price: High to Low
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
