import cloudinary from '../config/cloudinary.js';

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    res.status(200).json({
      success: true,
      image: {
        url: req.file.path,
        publicId: req.file.filename,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private/Admin
export const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one file' });
    }

    const images = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    res.status(200).json({ success: true, images });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private/Admin
export const deleteImage = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};
