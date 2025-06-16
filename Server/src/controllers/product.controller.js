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
  const { sortBy, order = "desc" } = req.query;
  const validSortFields = ["price", "createdAt", "numSales"];

  try {
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const products = await Product.find({ category: slug }).sort({
      [sortField]: order === "asc" ? 1 : -1,
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Fail to get sorted products" });
  }
};

// For admin:
