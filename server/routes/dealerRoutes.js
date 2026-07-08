import express from 'express';
import { body } from 'express-validator';
import { registerDealer, getDealers, getDealer, updateDealer, deleteDealer } from '../controllers/dealerController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/register',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('businessType').trim().notEmpty().withMessage('Business type is required'),
  ],
  validate,
  registerDealer
);

router.get('/', protect, authorize('admin'), getDealers);
router.get('/:id', protect, authorize('admin'), getDealer);
router.put('/:id', protect, authorize('admin'), updateDealer);
router.delete('/:id', protect, authorize('admin'), deleteDealer);

export default router;
