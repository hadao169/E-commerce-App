import express from "express";
import {
  getAllProducts,
  getProductByCategory,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/category/:slug", getProductByCategory);

export default router;
