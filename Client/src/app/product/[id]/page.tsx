import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail } from "@/services/api/product";

// Next.js App Router page function
export default async function Page({ params }: { params: { id: string } }) {
  try {
    const product = await getProductDetail(params.id);
    return <ProductDetailPage product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
