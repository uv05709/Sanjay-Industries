import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    gstNumber: {
      type: String,
      default: '',
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
    businessType: {
      type: String,
      enum: ['retailer', 'wholesaler', 'distributor', 'gift-shop', 'wedding-supplier', 'religious-store', 'other'],
      required: [true, 'Business type is required'],
    },
    yearsInBusiness: {
      type: Number,
      default: 0,
    },
    annualTurnover: {
      type: String,
      default: '',
    },
    productInterest: {
      type: String,
      default: '',
    },
    currentBrands: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'under-review', 'approved', 'rejected'],
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

const Dealer = mongoose.model('Dealer', dealerSchema);
export default Dealer;
