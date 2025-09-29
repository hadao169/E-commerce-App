import { ProductInput, ReviewInput } from "@/types";
import { CiUser } from "react-icons/ci";
import { Star } from "lucide-react";
// interface Product {
//   rateDistribution: Record<number, number>;
//   avgRating: number;
// }

interface Props {
  product: ProductInput;
  reviews: ReviewInput[];
}

const ProductReview = ({ product, reviews }: Props) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white mt-4 p-4 shadow-sm flex flex-col gap-1 w-full">
      <h2 className="text-lg font-medium px-2 py-2">Product Ratings</h2>

      <div className="bg-[#f7d6b733] px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-center gap-4 md:gap-10 border-1 border-[#f7d6b733]">
        {/* Average Rating */}
        <div className="text-red-400 text-lg text-center md:text-left">
          <span className="text-2xl font-bold">
            {product.avgRating.toFixed(1)}
          </span>{" "}
          out of 5
        </div>

        {/* Rating distribution */}
        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
          {stars.map((star) => (
            <button
              key={star}
              className="px-2 py-1 md:px-3 md:py-1 border border-gray-300 bg-white hover:bg-gray-50 text-xs md:text-sm cursor-pointer rounded">
              {star} Star (
              {typeof product.rateDistribution[star] === "number"
                ? product.rateDistribution[star]
                : 0}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Reviews summary */}
      <div className="mt-4 px-2 py-2 text-gray-600 text-sm">
        {reviews.map((review, index) => (
          <div key={index} className="flex mb-4 border-b border-gray-200 pb-2">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <CiUser className=" size-7" />
            </div>
            <div className="space-y-1.5">
              <div className="text-black">{review.userId.username}</div>
              <div className="flex items-center gap-0.5">
                {stars.map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={`${
                      star <= review.rating
                        ? "fill-red-400  text-red-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-500 text-sm">
                <div className="text-gray-500 text-sm align-middle">
                  {new Date(review.createdAt)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, "-")}
                </div>
              </div>
              <div>{review.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
