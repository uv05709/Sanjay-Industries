import express from 'express';
import { body } from 'express-validator';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/newsletterController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/subscribe',
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  subscribe
);

router.post(
  '/unsubscribe',
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  unsubscribe
);

router.get('/', protect, authorize('admin'), getSubscribers);

export default router;
