"use client";

import { Fragment, useState } from "react";
import { Logs, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { categories } from "../layouts/home/homeMenuData";
import SearchFilter from "../product/SearchFilterBar";
import { usePathname } from "next/navigation";
import { Transition } from "@headlessui/react";
import { FilterOption } from "@/types";

interface DropdownMenuProps {
  triggerBtn: React.ReactNode;
	onUpdateFilter: (filter: FilterOption) => void;
}

const DropdownFilter = ({ triggerBtn, onUpdateFilter }: DropdownMenuProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
	  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 py-2 cursor-pointer outline-none">
        {triggerBtn}
      </button>

      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <div className="fixed inset-0 z-50 bg-white w-1/2">
          <div className="flex flex-col h-full overflow-y-auto p-4">
            {/* Title */}
            <div className="mb-4 border-b border-gray-200 pb-2 font-semibold text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logs size={16} />
                All Categories
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X size={22} strokeWidth={2} className="cursor-pointer" />
              </button>
            </div>

            {/* Category List */}
            <ul className="flex flex-col gap-2">
              {categories.map((category) => {
                const isActive =
                  pathname === `/category/${category.slug.toLowerCase()}`;
                return (
                  <Link
                    key={category.label}
                    href={`/category/${category.slug.toLowerCase()}`}
                    className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                      isActive
                        ? "bg-orange-100 text-orange-500 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}>
                    {isActive && <ChevronRight size={12} strokeWidth={3} />}
                    {category.label}
                  </Link>
                );
              })}
            </ul>

            {/* Search Filter */}
            <div className="mt-6">
              <SearchFilter onUpdateFilter={onUpdateFilter} />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default DropdownFilter;
