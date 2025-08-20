import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail } from "@/services/api/product";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const product = await getProductDetail(id); // fetch data
    return <ProductDetailPage product={product} />; // pass resolved data
  } catch (error) {
    console.error(error);
    notFound(); // fallback 404
  }
}
