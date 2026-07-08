import express from 'express';
import { getPageSEO, getAllSEO, updatePageSEO } from '../controllers/seoController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllSEO);
router.get('/:page', getPageSEO);
router.put('/:page', protect, authorize('admin'), updatePageSEO);

export default router;
