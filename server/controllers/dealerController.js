import Dealer from '../models/Dealer.js';
import { sendDealerNotification } from '../utils/sendEmail.js';

// @desc    Register as dealer
// @route   POST /api/dealers/register
// @access  Public
export const registerDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.create(req.body);

    // Send notification email to admin
    sendDealerNotification(dealer).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Your dealer application has been submitted successfully. Our team will review it and contact you within 3-5 business days.',
      dealer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all dealers (Admin)
// @route   GET /api/dealers
// @access  Private/Admin
export const getDealers = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const total = await Dealer.countDocuments(query);
    const dealers = await Dealer.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      count: dealers.length,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limit),
      dealers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single dealer (Admin)
// @route   GET /api/dealers/:id
// @access  Private/Admin
export const getDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }
    if (!dealer.isRead) {
      dealer.isRead = true;
      await dealer.save();
    }
    res.status(200).json({ success: true, dealer });
  } catch (error) {
    next(error);
  }
};

// @desc    Update dealer status (Admin)
// @route   PUT /api/dealers/:id
// @access  Private/Admin
export const updateDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }
    res.status(200).json({ success: true, dealer });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete dealer (Admin)
// @route   DELETE /api/dealers/:id
// @access  Private/Admin
export const deleteDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }
    await dealer.deleteOne();
    res.status(200).json({ success: true, message: 'Dealer deleted' });
  } catch (error) {
    next(error);
  }
};
