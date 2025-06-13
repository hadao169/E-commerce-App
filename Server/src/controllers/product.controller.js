import Product from "../models/product.model.js";

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

  try {
    const products = await Product.find({ category: slug });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}