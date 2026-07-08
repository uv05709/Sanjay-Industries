import express from 'express';
import { body } from 'express-validator';
import { createContactMessage, getContactMessages, getContactMessage, deleteContactMessage } from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validate,
  createContactMessage
);

router.get('/', protect, authorize('admin'), getContactMessages);
router.get('/:id', protect, authorize('admin'), getContactMessage);
router.delete('/:id', protect, authorize('admin'), deleteContactMessage);

export default router;
