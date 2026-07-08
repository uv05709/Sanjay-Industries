import SEO from '../models/SEO.js';

// @desc    Get SEO settings for a page
// @route   GET /api/seo/:page
// @access  Public
export const getPageSEO = async (req, res, next) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page });
    res.status(200).json({ success: true, seo: seo || null });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all SEO settings (Admin)
// @route   GET /api/seo
// @access  Private/Admin
export const getAllSEO = async (req, res, next) => {
  try {
    const seoEntries = await SEO.find().sort('page');
    res.status(200).json({ success: true, count: seoEntries.length, seoEntries });
  } catch (error) {
    next(error);
  }
};

// @desc    Update or create SEO settings (Admin)
// @route   PUT /api/seo/:page
// @access  Private/Admin
export const updatePageSEO = async (req, res, next) => {
  try {
    const seo = await SEO.findOneAndUpdate(
      { page: req.params.page },
      { ...req.body, page: req.params.page },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, seo });
  } catch (error) {
    next(error);
  }
};
