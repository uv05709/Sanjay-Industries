import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'Sanjay Industries',
    },
    tagline: {
      type: String,
      default: 'Handcrafted Wooden Sindhora & Traditional Handicrafts',
    },
    logo: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    favicon: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    contactInfo: {
      email: { type: String, default: 'info@sanjayindustries.com' },
      phone: { type: String, default: '+91-XXXXXXXXXX' },
      whatsapp: { type: String, default: '+91XXXXXXXXXX' },
      address: {
        street: { type: String, default: '' },
        city: { type: String, default: 'Varanasi' },
        state: { type: String, default: 'Uttar Pradesh' },
        pincode: { type: String, default: '221001' },
        country: { type: String, default: 'India' },
      },
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      pinterest: { type: String, default: '' },
    },
    workingHours: {
      weekdays: { type: String, default: 'Mon–Sat: 9:00 AM – 7:00 PM' },
      weekends: { type: String, default: 'Sunday: Closed' },
    },
    aboutText: {
      type: String,
      default: '',
    },
    googleMapsEmbed: {
      type: String,
      default: '',
    },
    cataloguePdf: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
