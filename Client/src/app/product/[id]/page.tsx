import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail } from "@/services/api/product";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: ProductPageProps) {
  try {
    const product = await getProductDetail(params.id);
    return <ProductDetailPage product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
