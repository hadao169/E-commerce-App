import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail } from "@/services/api/product";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  try {
    const { id } = params;
    const product = await getProductDetail(id); // fetch data
    return <ProductDetailPage product={product} />; // pass resolved data
  } catch (error) {
    console.error(error);
    notFound(); // fallback 404
  }
}
