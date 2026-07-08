import Testimonial from '../models/Testimonial.js';

// @desc    Get all active testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort('order');
    res.status(200).json({ success: true, count: testimonials.length, testimonials });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial (Admin)
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial (Admin)
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial (Admin)
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    await testimonial.deleteOne();
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all testimonials for admin
// @route   GET /api/testimonials/admin/all
// @access  Private/Admin
export const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort('-createdAt');
    res.status(200).json({ success: true, count: testimonials.length, testimonials });
  } catch (error) {
    next(error);
  }
};
