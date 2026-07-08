import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, getAllTestimonialsAdmin } from '../controllers/testimonialController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/admin/all', protect, authorize('admin'), getAllTestimonialsAdmin);
router.post('/', protect, authorize('admin'), createTestimonial);
router.put('/:id', protect, authorize('admin'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

export default router;
