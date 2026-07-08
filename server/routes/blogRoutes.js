import express from 'express';
import { getBlogs, getBlog, getRelatedBlogs, addComment, createBlog, updateBlog, deleteBlog, getAllBlogsAdmin } from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/admin/all', protect, authorize('admin'), getAllBlogsAdmin);
router.get('/:slug', getBlog);
router.get('/:slug/related', getRelatedBlogs);
router.post('/:slug/comments', addComment);

// Admin routes
router.post('/', protect, authorize('admin'), createBlog);
router.put('/:id', protect, authorize('admin'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

export default router;
