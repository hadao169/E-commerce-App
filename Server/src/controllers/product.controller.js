import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import { buildFilter, buildSort } from "../utils/productQueryHelper.js";
// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/products/category/:category
export const getProductByCategory = async (req, res) => {
  const { slug } = req.params;
  const { sortBy, order, avgRating, minPrice, maxPrice } = req.query;

  try {
    const filter = buildFilter({
      category: slug,
      avgRating,
      minPrice,
      maxPrice,
    });
    const sort = buildSort(sortBy, order);

    const products = await Product.find(filter).sort(sort);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Fail to get sorted products" });
  }
};

// GET /api/products/search?keyword=searchTerm

export const searchProducts = async (req, res) => {
  const { keyword, sortBy, order, avgRating, minPrice, maxPrice } = req.query;

  try {
    const filter = buildFilter({
      keyword,
      avgRating,
      minPrice,
      maxPrice,
    });
    const sort = buildSort(sortBy, order);

    const products = await Product.find(filter).sort(sort);

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to search products" });
  }
};

// GET /api/products/:id
export const getProductDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get product" });
  }
};

// GET /api/products/:id/reviews
export const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const reviews = await Review.find({ productId: product._id }).populate(
      "userId",
      "username"
    );
    console.log(reviews);
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get product reviews" });
  }
};

// export const getProductByReview = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const review = await Review.findOne({ _id: id });
//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     const product = await Product.findOne({ _id: review.productId });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     return res.status(200).json({ product });
//   } catch (error) {
//     return res.status(500).json({ message: "Failed to get product by review" });
//   }
// };
