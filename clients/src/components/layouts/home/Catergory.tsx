import React from "react";
import { categories } from "./homeMenuData";
import Link from "next/link";

const Category = () => {
  return (
    // <div className="bg-white">
    //   <h2 className="text-lg font-semibold px-4 py-2 text-[#0000008A]">
    //     CATEGORIES
    //   </h2>

    //   <div className="w-full flex flex-wrap justify-center ">
    //     {/* Render categories */}
    //     {categories.map((category, id) => (
    //       <Link
    //         key={id}
    //         href="#"
    //         className="flex-1 w-30 h-35 flex flex-col items-center p-4 border border-gray-100 hover:shadow-md transition cursor-pointer">
    //         <img
    //           src={category.icon}
    //           alt={category.label}
    //           className="w-18 h-16 object-contain mb-2 hover:scale-110 transition-transform duration-200"
    //         />
    //         <span className="text-sm text-center">{category.label}</span>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    <div className="border border-gray-100 bg-white px-4 py-2 mt-4 rounded-md">
      <div className="font-semibold mb-2 text-[#0000008A]">CATEGORIES</div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {/* Render categories */}
        {categories.map((category, id) => (
          <Link
            key={id}
            href="#"
            className="flex flex-col items-center p-2 border border-gray-100 hover:shadow-md transition cursor-pointer bg-white rounded">
            <img
              src={category.icon}
              alt={category.label}
              className="w-14 h-14 object-contain mb-2 hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm text-center">{category.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
