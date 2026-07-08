import express from 'express';
import { body } from 'express-validator';
import { createBulkOrder, getBulkOrders, getBulkOrder, updateBulkOrder, deleteBulkOrder } from '../controllers/bulkOrderController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('products').trim().notEmpty().withMessage('Products information is required'),
    body('quantity').trim().notEmpty().withMessage('Quantity is required'),
  ],
  validate,
  createBulkOrder
);

router.get('/', protect, authorize('admin'), getBulkOrders);
router.get('/:id', protect, authorize('admin'), getBulkOrder);
router.put('/:id', protect, authorize('admin'), updateBulkOrder);
router.delete('/:id', protect, authorize('admin'), deleteBulkOrder);

export default router;
