import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductDetail, getProductReviews } from "@/services/api/product";
import { console } from "inspector";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const product = await getProductDetail(id); // fetch data
    const reviews = await getProductReviews(id);
    return <ProductDetailPage product={product} reviews={reviews} />; // pass resolved data
  } catch (error) {
    console.error(error);
    notFound(); // fallback 404
  }
}
