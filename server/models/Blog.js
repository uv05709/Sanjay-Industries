import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    featuredImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    category: {
      type: String,
      required: [true, 'Blog category is required'],
    },
    tags: [{ type: String, trim: true }],
    author: {
      name: { type: String, default: 'Sanjay Industries' },
      avatar: { type: String, default: '' },
    },
    comments: [commentSchema],
    seoMeta: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: [{ type: String }],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
