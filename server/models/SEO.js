import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    metaTitle: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: '',
    },
    keywords: [{ type: String }],
    canonicalUrl: {
      type: String,
      default: '',
    },
    ogImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    jsonLd: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const SEO = mongoose.model('SEO', seoSchema);
export default SEO;
