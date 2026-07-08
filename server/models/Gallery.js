import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery title is required'],
      trim: true,
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, default: '' },
    },
    category: {
      type: String,
      enum: ['products', 'workshop', 'process', 'team', 'events', 'packaging'],
      default: 'products',
    },
    description: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
