"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SortOption } from "@/types";

interface DropdownMenuProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  triggerBtn?: React.ReactNode;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Latest", value: { field: "createdAt" } },
  { label: "Top sales", value: { field: "numSales" } },
  { label: "Price: Low to High", value: { field: "price", order: "asc" } },
  { label: "Price: High to Low", value: { field: "price", order: "desc" } },
];

const DropDown = ({ sort, onSortChange, triggerBtn }: DropdownMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="px-2 py-2 cursor-pointer outline-none">
        {triggerBtn}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
          <div className="py-1">
            {sortOptions.map((option) => {
              const isSelected =
                sort.field === option.value.field &&
                (sort.order ?? "desc") === (option.value.order ?? "desc");

              return (
                <Menu.Item key={option.label}>
                  {({ active }) => (
                    <button
                      onClick={() => onSortChange(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm cursor-pointer rounded-sm
                        ${active ? "bg-gray-100" : ""}
                        ${isSelected ? "bg-orange-500 text-white font-medium" : "text-gray-800"}`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
