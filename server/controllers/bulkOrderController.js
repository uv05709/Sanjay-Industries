import BulkOrder from '../models/BulkOrder.js';
import { sendBulkOrderNotification } from '../utils/sendEmail.js';

// @desc    Submit bulk order enquiry
// @route   POST /api/bulk-orders
// @access  Public
export const createBulkOrder = async (req, res, next) => {
  try {
    const bulkOrder = await BulkOrder.create(req.body);

    // Send notification email to admin
    sendBulkOrderNotification(bulkOrder).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Your bulk order enquiry has been submitted successfully. We will contact you within 24 hours.',
      bulkOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bulk orders (Admin)
// @route   GET /api/bulk-orders
// @access  Private/Admin
export const getBulkOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const total = await BulkOrder.countDocuments(query);
    const bulkOrders = await BulkOrder.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      count: bulkOrders.length,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limit),
      bulkOrders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single bulk order (Admin)
// @route   GET /api/bulk-orders/:id
// @access  Private/Admin
export const getBulkOrder = async (req, res, next) => {
  try {
    const bulkOrder = await BulkOrder.findById(req.params.id);
    if (!bulkOrder) {
      return res.status(404).json({ success: false, message: 'Bulk order not found' });
    }

    // Mark as read
    if (!bulkOrder.isRead) {
      bulkOrder.isRead = true;
      await bulkOrder.save();
    }

    res.status(200).json({ success: true, bulkOrder });
  } catch (error) {
    next(error);
  }
};

// @desc    Update bulk order status (Admin)
// @route   PUT /api/bulk-orders/:id
// @access  Private/Admin
export const updateBulkOrder = async (req, res, next) => {
  try {
    const bulkOrder = await BulkOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bulkOrder) {
      return res.status(404).json({ success: false, message: 'Bulk order not found' });
    }
    res.status(200).json({ success: true, bulkOrder });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete bulk order (Admin)
// @route   DELETE /api/bulk-orders/:id
// @access  Private/Admin
export const deleteBulkOrder = async (req, res, next) => {
  try {
    const bulkOrder = await BulkOrder.findById(req.params.id);
    if (!bulkOrder) {
      return res.status(404).json({ success: false, message: 'Bulk order not found' });
    }
    await bulkOrder.deleteOne();
    res.status(200).json({ success: true, message: 'Bulk order deleted' });
  } catch (error) {
    next(error);
  }
};
