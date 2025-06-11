"use client";

import { usePathname } from "next/navigation";
import { Logs, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { categories } from "../layouts/home/homeMenuData";

const Sidebar = () => {
  const pathname = usePathname();
  const ratings = [5, 4, 3, 2, 1];
  return (
    <div className="w-full py-4 flex flex-col gap-8 text-[12px] lg:text-[14px]">
      {/* All Categories */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 lg:text-[16px] text-[14px] font-semibold border-b border-gray-200 pb-3">
          <Logs size={16} strokeWidth={3} />
          All Categories
        </div>
        <ul className="flex flex-col gap-4">
          {categories.map((category) => {
            const isActive =
              pathname === `/category/${category.slug.toLowerCase()}`;

            return (
              <Link
                key={category.label}
                href={`/category/${category.slug.toLowerCase()}`}
                className={`lg:text-[14px] text-[12px] font-semibold flex items-center gap-2 ${
                  isActive ? "text-orange-400" : "text-gray-800"
                }`}>
                {isActive && <ChevronRight size={12} strokeWidth={3} />}
                {category.label}
              </Link>
            );
          })}
        </ul>
      </div>

      {/* SEARCH FILTER */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 lg:text-[16px] text-[14px] font-semibold">
          <Star size={18} strokeWidth={3} />
          SEARCH FILTER
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold border-b border-gray-200 pb-2">
            Rating
          </h3>
          <ul className="flex flex-col gap-2">
            {ratings.map((stars) => (
              <li
                key={stars}
                className="flex items-center gap-1 text-gray-700 hover:text-orange-400 cursor-pointer">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    fill={idx < stars ? "#f97316" : "none"}
                    stroke="#f97316"
                  />
                ))}
                <span className="ml-2">& Up</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold border-b border-gray-200 pb-2">
            Price Range
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-20 px-2 py-1 border rounded text-sm"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-20 px-2 py-1 border rounded text-sm"
            />
          </div>
          <button className="w-full mt-1 px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-500">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
