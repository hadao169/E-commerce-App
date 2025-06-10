import React from "react";
import { BsCart2 } from "react-icons/bs";

const CartButton = () => {
  return (
    <div className="md:mr-12 relative text-white hover:opacity-60 transition duration-200">
      <span className="font-semibold absolute -right-2 -top-2 bg-white text-red-500 text-[16px] px-2 rounded-xl">
        {0}
      </span>
      <BsCart2 className="text-[30px] cursor-pointer" />
    </div>
  );
};

export default CartButton;
