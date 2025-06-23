import Product from "../models/product.model.js";

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
  const { sortBy, order = "desc", avgRating, priceRange } = req.query;
  const validSortFields = ["price", "createdAt", "numSales", "avgRating"];

  const filter = { category: slug };

  // Apply average rating filter
  if (avgRating) {
    filter.avgRating = { $gte: Number(avgRating) };
  }

  // Apply price range filter
  if (priceRange) {
    const { minPrice, maxPrice } = priceRange;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }
  }

  try {
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const products = await Product.find(filter).sort({
      [sortField]: order === "asc" ? 1 : -1,
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fail to get sorted products" });
  }
};

// For admin:
