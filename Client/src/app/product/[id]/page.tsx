// src/app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail } from "@/services/api/product";

export default async function Page({ params }: { params: { id: string } }) {
  // No need to explicitly await params, but ensure the function is async
  // Destructure after the async context is established

  try {
    const product = await getProductDetail(params.id);

    return <ProductDetailPage product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
