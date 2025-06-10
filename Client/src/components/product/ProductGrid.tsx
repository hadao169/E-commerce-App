import ProductCard from "./ProductCard";
import { ProductInput } from "@/types";

type ProductGridProps = {
  products: ProductInput[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 transition-opacity duration-300">
      <div className="grid-layout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button className="py-2 px-4 bg-white rounded-xl cursor-pointer font-medium hover:opacity-75">
        See More...
      </button>
    </div>
  );
};

export default ProductGrid;
