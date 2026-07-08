import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const specificationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    sku: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    wholesalePrice: {
      type: Number,
      min: [0, 'Wholesale price cannot be negative'],
    },
    moq: {
      type: Number,
      default: 50,
      min: [1, 'MOQ must be at least 1'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    subcategory: {
      type: String,
      default: '',
    },
    tags: [{ type: String, trim: true }],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      unit: { type: String, default: 'cm' },
    },
    weight: {
      value: { type: Number },
      unit: { type: String, default: 'g' },
    },
    material: {
      type: String,
      default: 'Wood',
    },
    color: {
      type: String,
      default: '',
    },
    stock: {
      type: String,
      enum: ['in-stock', 'out-of-stock', 'made-to-order'],
      default: 'in-stock',
    },
    features: [{ type: String }],
    faqs: [faqSchema],
    specifications: [specificationSchema],
    seoMeta: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: [{ type: String }],
    },
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for search and filtering
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ createdAt: -1 });

// Calculate average rating
productSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.numReviews = 0;
  } else {
    const approvedReviews = this.reviews.filter((r) => r.isApproved);
    const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0);
    this.averageRating = Math.round((sum / approvedReviews.length) * 10) / 10;
    this.numReviews = approvedReviews.length;
  }
};

const Product = mongoose.model('Product', productSchema);
export default Product;
