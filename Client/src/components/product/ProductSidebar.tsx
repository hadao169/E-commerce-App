"use client";

import { usePathname } from "next/navigation";
import { Logs, ChevronRight } from "lucide-react";
import Link from "next/link";
import { categories } from "../layouts/home/homeMenuData";
import { FilterOption } from "@/types";
import SearchFilter from "./SearchFilterBar";

const Sidebar = ({
  onUpdateFilter,
}: {
  onUpdateFilter: (filter: FilterOption) => void;
}) => {
  const pathname = usePathname();

  return (
    <div className=" py-4 flex flex-col gap-8 text-[12px] lg:text-[14px]">
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
                  isActive && "text-orange-400"
                }`}>
                {isActive && <ChevronRight size={12} strokeWidth={3} />}
                {category.label}
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Search Filter */}
      <SearchFilter onUpdateFilter={onUpdateFilter} />
    </div>
  );
};

export default Sidebar;
