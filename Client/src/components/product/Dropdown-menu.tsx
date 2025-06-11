import React from "react";
import { ChevronDown } from "lucide-react";

const DropdownMenu = () => {
  return (
    <div className="btn flex justify-between items-center gap-18">
      <button>Price</button>
      <ChevronDown size={18} strokeWidth={2.5} />
    </div>
  );
};

export default DropdownMenu;
