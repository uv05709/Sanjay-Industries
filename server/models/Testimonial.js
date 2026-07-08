import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    company: {
      type: String,
      default: '',
    },
    designation: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
