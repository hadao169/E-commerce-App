interface Product {
  rateDistribution: Record<number, number>;
  avgRating: number;
}

interface Props {
  product: Product;
}

const ProductReview = ({ product }: Props) => {
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white mt-4 p-4 shadow-sm flex flex-col gap-1 w-full">
      <h2 className="text-lg font-medium px-2 py-2">Product Reviews</h2>

      <div className="bg-[#f7d6b733] px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-center gap-4 md:gap-10 border-1 border-[#f7d6b733]">
        {/* Average Rating */}
        <div className="text-red-600 text-lg text-center md:text-left">
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
              {star} Star ({product.rateDistribution[star] ?? 0})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
