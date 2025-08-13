"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductsByCategory } from "@/services/api/product";
import { ProductInput, SortOption } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import Header from "@/components/layouts/header/Header";
import DropdownMenu from "@/components/product/Dropdown-menu";
import Sidebar from "@/components/product/ProductSidebar";
import useSortProduct from "@/lib/hooks/useSortProduct";
import useFilter from "@/lib/hooks/useFilter";
import { ArrowDownNarrowWide, SlidersHorizontal } from "lucide-react";
import DropDown from "@/components/common/Dropdown-sort";
import DropdownFilter from "@/components/common/Dropdown-filter";


export default function ProductsPage() {
  const params = useParams();
  const category = params.slug as string;
  const [products, setProducts] = useState<ProductInput[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { sort, updateSort } = useSortProduct();
  const { filter, updateFilter } = useFilter();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      try {
        const data = await getProductsByCategory(category, sort, filter);
        if (data.length === 0) {
          setNotFound(true);
          setProducts([]);
        } else {
          setNotFound(false);
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
        setNotFound(true);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [category, sort, filter]);

  // Callback cho DropdownMenu
  const handleSortChange = (sortOption: SortOption) => {
    updateSort(sortOption);
  };

  return (
    <div>
      <Header />
      <div className="responsive-padding-x bg-gray-100 py-10 flex gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block md:w-1/5">
          <Sidebar onUpdateFilter={updateFilter} />
        </div>

        <div className="w-full">
          <div className="px-4 py-3 bg-[#eaebed] flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 justify-between sm:w-auto w-full">
              <div className="sm:hidden flex items-center gap-1">
                <div className="cursor-pointer">
                  <DropdownFilter
                    triggerBtn={
                      <SlidersHorizontal className="text-custom" size={20} />
                    }
                    onUpdateFilter={updateFilter}
                  />
                </div>
                <span className="text-custom font-semibold">Filter</span>
              </div>
              <button className="text-custom hidden sm:block" disabled>
                Sort by
              </button>
              <div className="sm:hidden">
                <DropDown
                  triggerBtn={
                    <ArrowDownNarrowWide size={22} strokeWidth={1.5} />
                  }
                  sort={sort}
                  onSortChange={updateSort}
                />
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                className={`btn ${sort.field === "createdAt" ? "bg-orange-500" : "bg-white  "}`}
                onClick={() => updateSort({ field: "createdAt" })}>
                Latest
              </button>
              <button
                className={`btn ${sort.field === "numSales" ? "bg-orange-500" : "bg-white"}`}
                onClick={() => updateSort({ field: "numSales" })}>
                Top sales
              </button>
              <DropdownMenu onSortChange={handleSortChange} sort={sort} />
            </div>
          </div>

          {/* Product Grid */}
          {!notFound ? (
            <div className="grid-layout">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>No items available at the moment. Please check back later.</p>
          )}
        </div>
      </div>
    </div>
  );
}
