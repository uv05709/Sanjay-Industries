import ContactMessage from '../models/ContactMessage.js';
import { sendContactNotification } from '../utils/sendEmail.js';

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.create(req.body);

    // Send notification email to admin
    sendContactNotification(message).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you shortly.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = async (req, res, next) => {
  try {
    const { isRead, page = 1, limit = 20 } = req.query;
    const query = {};
    if (isRead !== undefined) query.isRead = isRead === 'true';

    const total = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limit),
      messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact message (Admin)
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    if (!message.isRead) {
      message.isRead = true;
      await message.save();
    }
    res.status(200).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await message.deleteOne();
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};
