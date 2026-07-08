import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Cloudinary storage for product/gallery images
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'sanjay-industries/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
  },
});

// Cloudinary storage for blog images
const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'sanjay-industries/blogs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

// Cloudinary storage for gallery images
const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'sanjay-industries/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1600, height: 1200, crop: 'limit', quality: 'auto' }],
  },
});

// Cloudinary storage for general uploads
const generalStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'sanjay-industries/general',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
  },
});

// Local storage fallback for attachments (bulk order files)
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP and PDF are allowed.'), false);
  }
};

export const uploadProduct = multer({ storage: productStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export const uploadBlog = multer({ storage: blogStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export const uploadGallery = multer({ storage: galleryStorage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
export const uploadGeneral = multer({ storage: generalStorage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
export const uploadLocal = multer({ storage: localStorage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
