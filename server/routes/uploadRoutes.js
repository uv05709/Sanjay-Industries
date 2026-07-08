import express from 'express';
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadGeneral } from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, authorize('admin'), uploadGeneral.single('image'), uploadImage);
router.post('/multiple', protect, authorize('admin'), uploadGeneral.array('images', 10), uploadMultipleImages);
router.delete('/:publicId', protect, authorize('admin'), deleteImage);

export default router;
