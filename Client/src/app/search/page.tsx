"use client";

import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import { ProductInput, SortOption } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import Header from "@/components/layouts/header/Header";
import DropdownMenu from "@/components/product/Dropdown-menu";
import useSortProduct from "@/lib/hooks/useSortProduct";
import useFilter from "@/lib/hooks/useFilter";
import SearchFilter from "@/components/product/SearchFilterBar";
import { searchProducts } from "@/services/api/product";
import { SearchCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const [products, setProducts] = useState<ProductInput[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { sort, updateSort } = useSortProduct();
  const { filter, updateFilter } = useFilter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await searchProducts(searchValue, sort, filter);
      if (response) {
        setProducts(response);
      } else {
        setNotFound(true);
      }
    };
    fetchProducts();
  }, [searchValue, sort, filter]);

  const handleSortChange = (sortOption: SortOption) => {
    updateSort(sortOption);
  };
  return (
    <div>
      <Header />
      <div className="responsive-padding-x bg-gray-100 py-10 flex gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block md:w-1/5">
          {/* <Sidebar onUpdateFilter={updateFilter} /> */}
          <SearchFilter onUpdateFilter={updateFilter} />
        </div>

        <div className="w-full">
          <div className="flex items-center gap-1 py-3 mb-2">
            <SearchCheck strokeWidth={1.25} />
            Search result for &apos;
            <span className="text-custom text-orange-500">{searchValue}</span>
            &apos;
          </div>
          <div className="px-4 py-3 bg-[#eaebed] flex items-center gap-3 mb-2">
            <button className="text-custom" disabled>
              Sort by
            </button>
            <div className="hidden md:flex items-center gap-3">
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
};

export default SearchPage;
