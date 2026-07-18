import cloudinary from '../config/cloudinary.js';

/**
 * Delete a single image from Cloudinary by its publicId.
 * Silently fails if publicId is empty/missing (no-op).
 * @param {string} publicId - The Cloudinary public ID of the image
 */
export const destroyCloudinaryImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Cloudinary delete failed for ${publicId}:`, error.message);
  }
};

/**
 * Delete multiple images from Cloudinary.
 * @param {Array<{publicId: string}>} images - Array of objects with publicId
 */
export const destroyCloudinaryImages = async (images) => {
  if (!images || images.length === 0) return;
  const publicIds = images.map((img) => img.publicId).filter(Boolean);
  if (publicIds.length === 0) return;

  const promises = publicIds.map((id) => destroyCloudinaryImage(id));
  await Promise.allSettled(promises);
};
