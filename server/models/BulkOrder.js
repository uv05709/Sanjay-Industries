import mongoose from 'mongoose';

const bulkOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      default: '',
      trim: true,
    },
    gstNumber: {
      type: String,
      default: '',
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    country: {
      type: String,
      default: 'India',
    },
    products: {
      type: String,
      required: [true, 'Products information is required'],
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
    },
    expectedBudget: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    attachment: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      filename: { type: String, default: '' },
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'negotiating', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
      default: '',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const BulkOrder = mongoose.model('BulkOrder', bulkOrderSchema);
export default BulkOrder;
