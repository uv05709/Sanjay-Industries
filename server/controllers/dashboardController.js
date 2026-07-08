import Product from '../models/Product.js';
import BulkOrder from '../models/BulkOrder.js';
import Dealer from '../models/Dealer.js';
import ContactMessage from '../models/ContactMessage.js';
import Blog from '../models/Blog.js';
import Newsletter from '../models/Newsletter.js';
import Testimonial from '../models/Testimonial.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts,
      activeProducts,
      totalBulkOrders,
      pendingBulkOrders,
      totalDealers,
      pendingDealers,
      approvedDealers,
      unreadMessages,
      totalMessages,
      totalBlogs,
      publishedBlogs,
      totalSubscribers,
      totalTestimonials,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      BulkOrder.countDocuments(),
      BulkOrder.countDocuments({ status: 'pending' }),
      Dealer.countDocuments(),
      Dealer.countDocuments({ status: 'pending' }),
      Dealer.countDocuments({ status: 'approved' }),
      ContactMessage.countDocuments({ isRead: false }),
      ContactMessage.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Newsletter.countDocuments({ isSubscribed: true }),
      Testimonial.countDocuments(),
    ]);

    // Recent activity
    const recentBulkOrders = await BulkOrder.find()
      .sort('-createdAt')
      .limit(5)
      .select('name companyName products status createdAt');

    const recentDealers = await Dealer.find()
      .sort('-createdAt')
      .limit(5)
      .select('name companyName city status createdAt');

    const recentMessages = await ContactMessage.find()
      .sort('-createdAt')
      .limit(5)
      .select('name subject isRead createdAt');

    res.status(200).json({
      success: true,
      stats: {
        products: { total: totalProducts, active: activeProducts },
        bulkOrders: { total: totalBulkOrders, pending: pendingBulkOrders },
        dealers: { total: totalDealers, pending: pendingDealers, approved: approvedDealers },
        messages: { total: totalMessages, unread: unreadMessages },
        blogs: { total: totalBlogs, published: publishedBlogs },
        subscribers: totalSubscribers,
        testimonials: totalTestimonials,
      },
      recent: {
        bulkOrders: recentBulkOrders,
        dealers: recentDealers,
        messages: recentMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};
