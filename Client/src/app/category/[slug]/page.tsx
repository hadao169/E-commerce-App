"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductsByCategory } from "@/services/api/product";
import { ProductInput } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import Header from "@/components/layouts/header/Header";
import DropdownMenu from "@/components/product/Dropdown-menu";
import Sidebar from "@/components/product/ProductSidebar";
import useSortProduct from "@/lib/hooks/useSortProduct";

export default function ProductsPage() {
  const params = useParams();
  const category = params.slug as string;
  const [products, setProducts] = useState<ProductInput[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { updateSort, sort } = useSortProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      try {
        const data = await getProductsByCategory(category, sort);
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
  }, [category, sort]);

  // Callback cho DropdownMenu
  const handleSortChange = (sortOption: {
    field: string;
    order: "asc" | "desc";
  }) => {
    // updateSort([sortOption]);
  };

  return (
    <div>
      <Header />
      <div className="responsive-padding-x bg-gray-100 py-10 flex gap-5">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4">
          <Sidebar />
        </div>

        <div className="w-full md:w-3/4">
          <div className="px-4 py-3 bg-[#eaebed] flex items-center gap-3 mb-2">
            <button className="text-custom" disabled>
              Sort by
            </button>
            <div className="hidden md:flex items-center gap-3">
              <button
                className="btn"
                onClick={() => updateSort({ field: "createdAt" })}>
                Latest
              </button>
              <button
                className="btn"
                onClick={() => updateSort({ field: "numSales" })}>
                Top sales
              </button>
              <DropdownMenu onSortChange={handleSortChange} />
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
