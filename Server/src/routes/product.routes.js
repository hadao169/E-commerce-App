import express from 'express';
import { auth, adminAuth, checkRole } from '../middleware/auth.middleware.js';
import productController from '../controllers/product.controller.js';

const router = express.Router();

// Public routes (không cần auth)
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

// Protected routes (cần auth)
router.get('/products/user/favorites', auth, productController.getUserFavorites);
router.post('/products/user/favorites/:id', auth, productController.addToFavorites);

// Admin routes (cần admin auth)
router.post('/products', auth, adminAuth, productController.createProduct);
router.put('/products/:id', auth, adminAuth, productController.updateProduct);
router.delete('/products/:id', auth, adminAuth, productController.deleteProduct);

// Seller routes (cần seller role)
router.get('/products/seller/listings', 
  auth, 
  checkRole(['seller', 'admin']), 
  productController.getSellerProducts
);

export default router;
