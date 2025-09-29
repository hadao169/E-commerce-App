import express from "express";
import {
  getAllProducts,
  getProductByCategory,
  searchProducts,
  getProductDetail,
  getProductReviews,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id/reviews", getProductReviews); // Specific route first
router.get("/search", searchProducts);
router.get("/category/:slug", getProductByCategory);
router.get("/:id", getProductDetail); // Dynamic route last

export default router;
