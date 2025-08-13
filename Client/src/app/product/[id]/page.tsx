import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail } from "@/services/api/product";
import { use } from "react";

// Next.js App Router page function
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const product = await getProductDetail(id);
    return <ProductDetailPage product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
