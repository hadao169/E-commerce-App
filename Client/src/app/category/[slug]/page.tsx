"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductsByCategory } from "@/services/api/product";
import { ProductInput } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import Header from "@/components/layouts/header/Header";

export default function ProductsPage() {
  const params = useParams();
  const category = params.slug as string;
  const [products, setProducts] = useState<ProductInput[]>([]);

  useEffect(() => {
    if (category) {
      getProductsByCategory(category)
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [category]);

  return (
    <div>
      <Header />
      <div className="responsive-padding-x bg-gray-100 py-10">
        <h1 className="text-2xl font-bold mb-4">Products in {category}</h1>
        <div className="grid-layout">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
