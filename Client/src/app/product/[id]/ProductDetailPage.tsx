"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layouts/header/Header";
import { Star } from "lucide-react";
import { FaFacebookMessenger, FaFacebook, FaPinterest } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { formatPrice } from "@/lib/utils";
import CountDownTimer from "@/components/common/CountDown";
import { TicketPercent, ShoppingCart } from "lucide-react";
import ProductDetails from "@/components/product/ProductSelection";
import { ProductInput, ReviewInput } from "@/types";
import ProductDescription from "@/components/product/ProductDescription";
import ProductReview from "@/components/product/ProductReview";

interface ProductDetailPageProps {
  product: ProductInput; // Using your Product interface
  reviews: ReviewInput[]; // Add reviews prop
}

const ProductDetailPage = ({ product, reviews }: ProductDetailPageProps) => {
  // const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Main Product Section */}
      <div className="responsive-padding-x py-8">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Image Gallery */}
            <div className="md:w-[450px] space-y-4 flex flex-col">
              {/* Main Image */}
              <div className="relative aspect-square w-full shadow-sm overflow-hidden ">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover h-100 w-100"
                />
              </div>

              {/* Thumbnail Images */}
              {/* <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative w-20 aspect-square cursor-pointer border-2 
                      ${selectedImage === idx ? "border-orange-600" : "border-transparent"}`}
                    onClick={() => setSelectedImage(idx)}>
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div> */}

              <div className="relative w-20 aspect-square cursor-pointer border-2 border-orange-600">
                <Image
                  src={product.image}
                  alt={`Thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-8 pt-4 w-full">
                <button className="flex items-center gap-2">
                  <span className="">Share: </span>
                  <div className="flex items-center gap-2">
                    <Link href={"#"}>
                      <FaFacebookMessenger size={24} color="#1877F2" />
                    </Link>
                    <Link href={"#"}>
                      <FaFacebook size={24} color="#1877F2" />
                    </Link>
                    <Link href={"#"}>
                      <FaPinterest size={24} color="#E60023" />
                    </Link>
                    <Link href={"#"}>
                      <CiTwitter size={24} color="#1DA1F2" />
                    </Link>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 space-y-2 py-2">
              <h1 className="text-xl font-semibold">{product.name}</h1>

              {/* Ratings */}
              <div className="flex items-center md:gap-8 gap-3 py-3">
                <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
                  <span className="border-b border-black">
                    {product.avgRating}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          star <= product.avgRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-gray-500 flex items-center gap-2 border-r border-gray-300 pr-4">
                  <span className="text-black border-b border-black">
                    {product.numReviews}
                  </span>
                  Ratings
                </div>
                <div className="text-gray-500 flex items-center gap-2">
                  <span className="text-black border-b border-black">
                    {product.numSales}
                  </span>
                  Sold
                </div>
              </div>

              {/* Price */}
              <div className="">
                <div className="bg-orange-600 px-6 py-1 text-white flex items-center text-sm gap-3 justify-between">
                  <div className=" flex items-center gap-3">
                    <span className="font-extrabold rounded-sm text-xl text-outline">
                      {new Date().getMonth() + 1}.{new Date().getDate()}
                    </span>
                    LOWEST PRICE
                  </div>
                  <CountDownTimer date={Date.now() + 50 * 60 * 1000} />
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-[#f8e9e9] px-6 py-4 flex items-center gap-2">
                  <span className="text-2xl font-semibold text-orange-600">
                    {formatPrice(
                      (product.price * (100 - product.discount)) / 100
                    )}
                  </span>
                  <TicketPercent size={20} color="red" />
                  <span className="text-[15px] text-gray-400 opacity-70 font-semibold line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {/* Product selection */}
              <div className="w-full md:mt-6 mt-4">
                <ProductDetails
                  productType={product.category}
                  product={product}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8">
                <button className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-3 border border-orange-600 text-orange-600 rounded cursor-pointer bg-red-50 hover:bg-pink-50 text-sm sm:text-base">
                  <ShoppingCart
                    strokeWidth={1.5}
                    size={18}
                    className="w-4 sm:w-5"
                  />
                  Add To Cart
                </button>
                <button className="px-4 sm:px-8 py-2 sm:py-3 bg-orange-600 text-white rounded hover:bg-orange-700 cursor-pointer text-sm sm:text-base">
                  Buy With Voucher
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full">
          <ProductDescription product={product} />
        </div>

        {/* Reviews Section */}
        <div className="w-full">
          <ProductReview product={product} reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
