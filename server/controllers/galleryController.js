import Gallery from '../models/Gallery.js';
import { destroyCloudinaryImage } from '../utils/cloudinaryCleanup.js';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    if (category) query.category = category;

    const images = await Gallery.find(query).sort('order');
    res.status(200).json({ success: true, count: images.length, images });
  } catch (error) {
    next(error);
  }
};

// @desc    Create gallery image (Admin)
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.create(req.body);
    res.status(201).json({ success: true, image });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery image (Admin)
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery image not found' });
    }
    res.status(200).json({ success: true, image });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image (Admin)
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery image not found' });
    }
    // Delete image from Cloudinary
    await destroyCloudinaryImage(image.image?.publicId);

    await image.deleteOne();
    res.status(200).json({ success: true, message: 'Gallery image deleted' });
  } catch (error) {
    next(error);
  }
};
