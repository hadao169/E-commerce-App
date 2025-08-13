import express from "express";
import {
  getAllProducts,
  getProductByCategory,
  searchProducts,
  getProductDetail,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/category/:slug", getProductByCategory);
router.get("/search", searchProducts);
router.get("/:id", getProductDetail);

export default router;
