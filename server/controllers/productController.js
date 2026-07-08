import Product from '../models/Product.js';
import Category from '../models/Category.js';
import APIFeatures from '../utils/apiFeatures.js';
import slugify from 'slugify';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    // Count total for pagination
    const countQuery = Product.find({ isActive: true });
    const features = new APIFeatures(countQuery, req.query).search().filter();
    const total = await features.query.countDocuments();

    // Get products with features
    const productsQuery = Product.find({ isActive: true }).populate('category', 'name slug');
    const apiFeatures = new APIFeatures(productsQuery, req.query)
      .search()
      .filter()
      .sort()
      .paginate();

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: apiFeatures.page,
      pages: Math.ceil(total / apiFeatures.limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug')
      .populate('relatedProducts', 'name slug images price shortDescription');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true })
      .populate('category', 'name slug')
      .limit(8)
      .sort('-createdAt');

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get related products
// @route   GET /api/products/:slug/related
// @access  Public
export const getRelatedProducts = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .limit(4)
      .select('name slug images price shortDescription');

    res.status(200).json({ success: true, products: relatedProducts });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    // Generate slug
    req.body.slug = slugify(req.body.name, { lower: true, strict: true });

    // Generate SKU if not provided
    if (!req.body.sku) {
      const count = await Product.countDocuments();
      req.body.sku = `SI-${String(count + 1001).padStart(5, '0')}`;
    }

    const product = await Product.create(req.body);

    // Update category product count
    if (product.category) {
      await Category.findByIdAndUpdate(product.category, { $inc: { productCount: 1 } });
    }

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Decrement category product count
    if (product.category) {
      await Category.findByIdAndUpdate(product.category, { $inc: { productCount: -1 } });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products for admin (including inactive)
// @route   GET /api/products/admin/all
// @access  Private/Admin
export const getAllProductsAdmin = async (req, res, next) => {
  try {
    const total = await Product.countDocuments();
    const productsQuery = Product.find().populate('category', 'name slug');
    const apiFeatures = new APIFeatures(productsQuery, req.query).search().filter().sort().paginate();

    const products = await apiFeatures.query;
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: apiFeatures.page,
      pages: Math.ceil(total / apiFeatures.limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};
