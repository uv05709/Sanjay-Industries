import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.isSubscribed) {
        return res.status(400).json({ success: false, message: 'This email is already subscribed' });
      }
      existing.isSubscribed = true;
      await existing.save();
      return res.status(200).json({ success: true, message: 'Successfully re-subscribed to our newsletter' });
    }

    await Newsletter.create({ email });
    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter. You will receive updates about new products and offers.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
export const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Email not found in our newsletter list' });
    }
    subscriber.isSubscribed = false;
    await subscriber.save();
    res.status(200).json({ success: true, message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all subscribers (Admin)
// @route   GET /api/newsletter
// @access  Private/Admin
export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find({ isSubscribed: true }).sort('-createdAt');
    res.status(200).json({ success: true, count: subscribers.length, subscribers });
  } catch (error) {
    next(error);
  }
};
