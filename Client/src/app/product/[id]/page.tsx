import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail } from "@/services/api/product";

export default async function Page({
  params,
}: {
  params: { id: string }; // plain object
}) {
  try {
    const product = await getProductDetail(params.id); // fetch data
    return <ProductDetailPage product={product} />; // pass resolved data
  } catch (error) {
    console.error(error);
    notFound(); // fallback 404
  }
}
