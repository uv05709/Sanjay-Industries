import express from 'express';
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:slug', getProduct);
router.get('/:slug/related', getRelatedProducts);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllProductsAdmin);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
