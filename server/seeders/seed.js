import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Testimonial from '../models/Testimonial.js';
import Blog from '../models/Blog.js';
import Gallery from '../models/Gallery.js';
import Settings from '../models/Settings.js';
import SEO from '../models/SEO.js';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding');
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Product.deleteMany(),
      Testimonial.deleteMany(),
      Blog.deleteMany(),
      Gallery.deleteMany(),
      Settings.deleteMany(),
      SEO.deleteMany(),
    ]);

    console.log('Existing data cleared');

    // Create admin user
    const admin = await User.create({
      name: 'Sanjay Admin',
      email: 'admin@sanjayindustries.com',
      password: 'admin123456',
      role: 'admin',
    });
    console.log('Admin user created:', admin.email);

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Wooden Sindhora',
        slug: 'wooden-sindhora',
        description: 'Traditional handcrafted wooden Sindhora (Sindoor boxes) with intricate designs and hand-painted motifs. Available in multiple sizes and patterns.',
        order: 1,
        image: { url: '/images/categories/sindhora.jpg' },
      },
      {
        name: 'Wedding Items',
        slug: 'wedding-items',
        description: 'Complete range of wooden wedding accessories including kumkum boxes, haldi sets, and ceremonial items crafted for the most special day.',
        order: 2,
        image: { url: '/images/categories/wedding.jpg' },
      },
      {
        name: 'Religious Products',
        slug: 'religious-products',
        description: 'Sacred wooden items for puja and religious ceremonies, including temple pieces, chowki sets, and deity stands hand-finished in Varanasi.',
        order: 3,
        image: { url: '/images/categories/religious.jpg' },
      },
      {
        name: 'Gift Items',
        slug: 'gift-items',
        description: 'Exquisite handcrafted wooden gift boxes, decorative items, and unique souvenirs perfect for festivals, weddings, and corporate gifting.',
        order: 4,
        image: { url: '/images/categories/gifts.jpg' },
      },
      {
        name: 'Decorative Boxes',
        slug: 'decorative-boxes',
        description: 'Beautifully carved and painted wooden boxes for jewelry, dry fruits, spices, and keepsakes. Each piece is a work of art.',
        order: 5,
        image: { url: '/images/categories/decorative.jpg' },
      },
      {
        name: 'Custom Handicrafts',
        slug: 'custom-handicrafts',
        description: 'Bespoke wooden handicraft items made to your specifications. Custom designs, sizes, and finishes available for bulk orders.',
        order: 6,
        image: { url: '/images/categories/custom.jpg' },
      },
    ]);
    console.log('Categories created:', categories.length);

    // Create products
    const products = await Product.insertMany([
      {
        name: 'Traditional Red Sindhora – Round Design',
        slug: 'traditional-red-sindhora-round',
        sku: 'SI-01001',
        description: 'Our signature red Sindhora features the traditional round design that has been a staple of Indian households for generations. Hand-turned on a wooden lathe from seasoned Gamhar wood, each piece is carefully shaped, smoothed, and painted by our skilled artisans in Varanasi. The vibrant red lacquer finish symbolises prosperity and marital bliss, while the precisely fitted lid ensures your sindoor stays fresh and protected. This is our best-selling product, trusted by wholesalers across 50+ cities in India.',
        shortDescription: 'Classic round Sindhora in traditional red lacquer finish, hand-turned from Gamhar wood.',
        price: 25,
        wholesalePrice: 15,
        moq: 100,
        category: categories[0]._id,
        tags: ['sindhora', 'sindoor box', 'traditional', 'red', 'wedding', 'handmade'],
        images: [
          { url: '/images/products/sindhora-red-1.jpg', alt: 'Traditional Red Sindhora front view', isPrimary: true },
          { url: '/images/products/sindhora-red-2.jpg', alt: 'Traditional Red Sindhora open view' },
          { url: '/images/products/sindhora-red-3.jpg', alt: 'Traditional Red Sindhora set of twelve' },
        ],
        dimensions: { length: 5, width: 5, height: 4, unit: 'cm' },
        weight: { value: 30, unit: 'g' },
        material: 'Gamhar Wood',
        color: 'Red',
        stock: 'in-stock',
        features: [
          'Hand-turned on traditional wooden lathe',
          'Natural Gamhar wood — lightweight yet durable',
          'Lead-free lacquer paint — safe for daily use',
          'Precisely fitted lid with smooth rotation',
          'Authentic Varanasi craftsmanship',
        ],
        specifications: [
          { label: 'Material', value: 'Gamhar Wood (Gmelina arborea)' },
          { label: 'Finish', value: 'Hand-painted lacquer' },
          { label: 'Diameter', value: '5 cm' },
          { label: 'Height', value: '4 cm' },
          { label: 'Weight', value: '30 g' },
          { label: 'MOQ', value: '100 pieces' },
          { label: 'Packaging', value: 'Bubble wrap + corrugated box' },
        ],
        faqs: [
          { question: 'Is the paint safe?', answer: 'Yes, we use only lead-free, non-toxic lacquer paints that are safe for daily use and prolonged skin contact.' },
          { question: 'Can I get custom colours?', answer: 'Absolutely. We offer custom colour options for bulk orders of 500+ pieces. Share your Pantone code or sample and our artisans will match it.' },
          { question: 'What is the delivery time for bulk orders?', answer: 'Standard production time is 7–15 days depending on quantity. We can expedite for urgent requirements.' },
        ],
        seoMeta: {
          metaTitle: 'Traditional Red Sindhora – Handcrafted Wooden Sindoor Box | Sanjay Industries',
          metaDescription: 'Buy traditional red wooden Sindhora boxes in bulk from Sanjay Industries, Varanasi. Hand-turned, lead-free paint, wholesale prices. MOQ 100 pcs.',
          keywords: ['sindhora', 'sindoor box', 'wooden sindhora', 'red sindhora', 'Varanasi sindhora manufacturer'],
        },
        isFeatured: true,
      },
      {
        name: 'Golden Meenakari Sindhora – Premium',
        slug: 'golden-meenakari-sindhora-premium',
        sku: 'SI-01002',
        description: "The Golden Meenakari Sindhora is our premium offering, featuring intricate Meenakari artwork painted by master artisans trained in the Varanasi tradition. Each piece starts as raw Gamhar wood, turned on a lathe, and then hand-painted with detailed floral and paisley motifs using the Meena technique. The golden base with multi-coloured detailing makes this piece a collector's favourite and a premium gift item. Ideal for upscale retail, wedding return gifts, and export quality packaging.",
        shortDescription: 'Premium Sindhora with hand-painted Meenakari work and golden finish.',
        price: 65,
        wholesalePrice: 40,
        moq: 50,
        category: categories[0]._id,
        tags: ['sindhora', 'meenakari', 'premium', 'golden', 'handpainted', 'gift'],
        images: [
          { url: '/images/products/sindhora-gold-1.jpg', alt: 'Golden Meenakari Sindhora', isPrimary: true },
          { url: '/images/products/sindhora-gold-2.jpg', alt: 'Meenakari detail close-up' },
        ],
        dimensions: { length: 6, width: 6, height: 5, unit: 'cm' },
        weight: { value: 45, unit: 'g' },
        material: 'Gamhar Wood',
        color: 'Golden',
        stock: 'in-stock',
        features: [
          'Authentic Meenakari hand-painting technique',
          'Golden lacquer base with multi-colour detailing',
          'Master artisan craftsmanship — each piece is unique',
          'Export-quality finish and packaging',
          'Ideal for premium retail and gifting',
        ],
        specifications: [
          { label: 'Material', value: 'Gamhar Wood' },
          { label: 'Finish', value: 'Meenakari hand-painted + lacquer' },
          { label: 'Diameter', value: '6 cm' },
          { label: 'Height', value: '5 cm' },
          { label: 'Weight', value: '45 g' },
          { label: 'MOQ', value: '50 pieces' },
        ],
        faqs: [
          { question: 'Is each piece hand-painted?', answer: 'Yes, every single piece is individually hand-painted by our Meenakari artisans. No two pieces are exactly identical.' },
        ],
        seoMeta: {
          metaTitle: 'Golden Meenakari Sindhora – Premium Wooden Sindoor Box | Sanjay Industries',
          metaDescription: 'Premium golden Meenakari Sindhora boxes — hand-painted wooden sindoor boxes from Varanasi. Wholesale & export quality.',
          keywords: ['meenakari sindhora', 'golden sindhora', 'premium sindoor box'],
        },
        isFeatured: true,
      },
      {
        name: 'Wooden Kumkum Box Set – 4 Compartments',
        slug: 'wooden-kumkum-box-set-4-compartments',
        sku: 'SI-02001',
        description: 'A beautifully crafted 4-compartment kumkum box ideal for storing sindoor, kumkum, haldi, and chandan. The round base is turned from a single piece of wood with dividers carved to create four equal sections. Finished in vibrant red and gold lacquer, this piece serves both a functional and decorative purpose in daily puja rituals. Popular with religious stores, wedding suppliers, and gift shops across North India.',
        shortDescription: 'Traditional 4-compartment kumkum box in red and gold lacquer finish.',
        price: 45,
        wholesalePrice: 28,
        moq: 100,
        category: categories[1]._id,
        tags: ['kumkum box', 'wedding', 'puja', '4 compartment', 'red gold'],
        images: [
          { url: '/images/products/kumkum-box-1.jpg', alt: 'Wooden Kumkum Box Set 4 compartments', isPrimary: true },
          { url: '/images/products/kumkum-box-2.jpg', alt: 'Kumkum box open showing compartments' },
        ],
        dimensions: { length: 8, width: 8, height: 4, unit: 'cm' },
        weight: { value: 65, unit: 'g' },
        material: 'Gamhar Wood',
        color: 'Red & Gold',
        stock: 'in-stock',
        features: [
          '4 equal compartments for sindoor, kumkum, haldi, chandan',
          'Single piece wood base with hand-carved dividers',
          'Red and gold lacquer finish',
          'Snug-fitting lid to keep contents fresh',
          'Traditional Varanasi woodwork',
        ],
        specifications: [
          { label: 'Material', value: 'Gamhar Wood' },
          { label: 'Compartments', value: '4' },
          { label: 'Diameter', value: '8 cm' },
          { label: 'Height', value: '4 cm' },
          { label: 'MOQ', value: '100 pieces' },
        ],
        seoMeta: {
          metaTitle: 'Wooden Kumkum Box Set 4 Compartments | Sanjay Industries Varanasi',
          metaDescription: 'Wholesale wooden kumkum box with 4 compartments. Handcrafted in Varanasi. Red and gold lacquer. MOQ 100.',
          keywords: ['kumkum box', 'wooden kumkum box', 'puja items'],
        },
        isFeatured: true,
      },
      {
        name: 'Wooden Haldi Kumkum Set – Wedding Special',
        slug: 'wooden-haldi-kumkum-set-wedding',
        sku: 'SI-02002',
        description: 'A specially designed haldi-kumkum set crafted for wedding ceremonies and return gifts. This elegant set includes a small Sindhora, a kumkum container, and a decorative tray — all hand-turned and painted in coordinating colours. Available in sets of 6, 12, and 24 for bulk wedding orders. Our wedding-special range has been supplied to wedding planners and gift shops in over 30 cities.',
        shortDescription: 'Complete haldi-kumkum set with tray — perfect for wedding return gifts.',
        price: 85,
        wholesalePrice: 55,
        moq: 50,
        category: categories[1]._id,
        tags: ['wedding', 'haldi kumkum', 'return gift', 'set', 'bridal'],
        images: [
          { url: '/images/products/wedding-set-1.jpg', alt: 'Wooden Haldi Kumkum Wedding Set', isPrimary: true },
        ],
        dimensions: { length: 15, width: 10, height: 5, unit: 'cm' },
        weight: { value: 120, unit: 'g' },
        material: 'Gamhar Wood',
        color: 'Red, Gold & Green',
        stock: 'in-stock',
        features: [
          'Complete set: Sindhora + kumkum container + decorative tray',
          'Coordinated colour scheme for elegant presentation',
          'Available in pack sizes of 6, 12, 24',
          'Premium packaging for return gifts',
          'Custom branding available on tray',
        ],
        specifications: [
          { label: 'Set Contents', value: 'Sindhora, Kumkum Box, Tray' },
          { label: 'Tray Dimensions', value: '15 × 10 cm' },
          { label: 'Material', value: 'Gamhar Wood' },
          { label: 'MOQ', value: '50 sets' },
        ],
        seoMeta: {
          metaTitle: 'Wooden Haldi Kumkum Wedding Set – Return Gift | Sanjay Industries',
          metaDescription: 'Premium wooden haldi kumkum set for weddings. Complete set with tray. Wholesale from manufacturer in Varanasi.',
          keywords: ['wedding return gift', 'haldi kumkum set', 'wooden wedding items'],
        },
        isFeatured: true,
      },
      {
        name: 'Wooden Pooja Chowki – Hand-Painted',
        slug: 'wooden-pooja-chowki-hand-painted',
        sku: 'SI-03001',
        description: 'A hand-painted wooden pooja chowki (low ritual table) crafted in the traditional Varanasi style. Each chowki is carved from seasoned wood, shaped with precision, and painted with sacred motifs — lotus patterns, Om symbols, or paisley designs based on the variant. Used in homes, temples, and religious stores across India for placing deity idols, performing aarti, or as a decorative accent. Available in 6", 8", and 10" sizes.',
        shortDescription: 'Hand-painted wooden pooja chowki with sacred motifs in traditional Varanasi style.',
        price: 120,
        wholesalePrice: 75,
        moq: 50,
        category: categories[2]._id,
        tags: ['pooja', 'chowki', 'religious', 'hand-painted', 'temple'],
        images: [
          { url: '/images/products/chowki-1.jpg', alt: 'Wooden Pooja Chowki hand painted', isPrimary: true },
        ],
        dimensions: { length: 20, width: 20, height: 8, unit: 'cm' },
        weight: { value: 250, unit: 'g' },
        material: 'Mango Wood',
        color: 'Multi-colour',
        stock: 'in-stock',
        features: [
          'Solid mango wood construction',
          'Hand-painted sacred motifs',
          'Available in 6", 8", and 10" sizes',
          'Flat, stable base for placing idols',
          'Non-toxic, temple-safe finishes',
        ],
        specifications: [
          { label: 'Material', value: 'Mango Wood' },
          { label: 'Available Sizes', value: '6", 8", 10"' },
          { label: 'Finish', value: 'Hand-painted + lacquer coat' },
          { label: 'MOQ', value: '50 pieces per size' },
        ],
        seoMeta: {
          metaTitle: 'Wooden Pooja Chowki Hand-Painted – Religious Products | Sanjay Industries',
          metaDescription: 'Handcrafted wooden pooja chowki from Varanasi. Sacred motifs, multiple sizes. Wholesale supplier.',
          keywords: ['pooja chowki', 'wooden chowki', 'religious wooden products'],
        },
        isFeatured: true,
      },
      {
        name: 'Dry Fruit Gift Box – Wooden Carved',
        slug: 'dry-fruit-gift-box-wooden-carved',
        sku: 'SI-04001',
        description: 'A premium carved wooden dry fruit box designed for Diwali, wedding, and corporate gifting. The box features intricate hand-carved patterns on the lid and is divided into 4 or 6 compartments depending on the variant. Lined with food-safe paper, it can hold dry fruits, chocolates, or mithai. This product has been one of our fastest-growing segments, supplied to gift companies in Mumbai, Delhi, Jaipur, and Bangalore.',
        shortDescription: 'Hand-carved wooden dry fruit box with compartments — ideal for festive and corporate gifting.',
        price: 180,
        wholesalePrice: 110,
        moq: 25,
        category: categories[3]._id,
        tags: ['dry fruit box', 'gift', 'diwali', 'corporate', 'carved'],
        images: [
          { url: '/images/products/dryfruit-box-1.jpg', alt: 'Wooden Carved Dry Fruit Gift Box', isPrimary: true },
        ],
        dimensions: { length: 25, width: 18, height: 6, unit: 'cm' },
        weight: { value: 400, unit: 'g' },
        material: 'Sheesham Wood',
        color: 'Natural Brown',
        stock: 'in-stock',
        features: [
          'Premium Sheesham wood construction',
          'Hand-carved traditional patterns on lid',
          '4 or 6 compartment options',
          'Food-safe paper lining',
          'Hinged lid with brass latch',
          'Ideal for Diwali, weddings, corporate gifting',
        ],
        specifications: [
          { label: 'Material', value: 'Sheesham (Indian Rosewood)' },
          { label: 'Compartments', value: '4 or 6' },
          { label: 'Dimensions', value: '25 × 18 × 6 cm' },
          { label: 'MOQ', value: '25 pieces' },
        ],
        seoMeta: {
          metaTitle: 'Wooden Dry Fruit Gift Box – Carved & Handcrafted | Sanjay Industries',
          metaDescription: 'Premium carved wooden dry fruit boxes for Diwali & corporate gifting. Handcrafted in Varanasi. Wholesale supplier.',
          keywords: ['dry fruit box wooden', 'gift box', 'wooden gift box manufacturer'],
        },
        isFeatured: true,
      },
      {
        name: 'Decorative Jewellery Box – Floral Meena',
        slug: 'decorative-jewellery-box-floral-meena',
        sku: 'SI-05001',
        description: 'An ornate wooden jewellery box featuring hand-painted floral Meenakari work. Designed with a velvet-lined interior to protect precious jewellery, this box serves as both a functional storage piece and a stunning display item. Popular as a bridal gift, birthday present, and retail product for handicraft stores. The rich golden base with vivid floral motifs in turquoise, red, and green reflects the finest of Varanasi artisan heritage.',
        shortDescription: 'Velvet-lined jewellery box with hand-painted floral Meenakari artwork.',
        price: 250,
        wholesalePrice: 150,
        moq: 25,
        category: categories[4]._id,
        tags: ['jewellery box', 'decorative', 'meenakari', 'gift', 'bridal'],
        images: [
          { url: '/images/products/jewellery-box-1.jpg', alt: 'Decorative Jewellery Box with Floral Meena work', isPrimary: true },
        ],
        dimensions: { length: 15, width: 10, height: 6, unit: 'cm' },
        weight: { value: 200, unit: 'g' },
        material: 'Gamhar Wood',
        color: 'Golden with Multi-colour',
        stock: 'in-stock',
        features: [
          'Hand-painted Meenakari floral motifs',
          'Velvet-lined interior for jewellery protection',
          'Golden lacquer base',
          'Hinged lid with secure closure',
          'Each piece uniquely hand-painted',
        ],
        specifications: [
          { label: 'Material', value: 'Gamhar Wood' },
          { label: 'Interior', value: 'Velvet-lined' },
          { label: 'Dimensions', value: '15 × 10 × 6 cm' },
          { label: 'MOQ', value: '25 pieces' },
        ],
        seoMeta: {
          metaTitle: 'Decorative Wooden Jewellery Box – Floral Meenakari | Sanjay Industries',
          metaDescription: 'Handcrafted wooden jewellery box with Meenakari painting. Velvet-lined, golden finish. Wholesale from Varanasi.',
          keywords: ['wooden jewellery box', 'meenakari box', 'decorative box'],
        },
        isFeatured: true,
      },
      {
        name: 'Custom Branded Sindhora – Corporate',
        slug: 'custom-branded-sindhora-corporate',
        sku: 'SI-06001',
        description: 'Our custom branded Sindhora service allows companies, event planners, and brands to add their logo, text, or specific design to our traditional Sindhora. Ideal for corporate events, promotional items, brand merchandise, and large-scale wedding favours. Our design team works with you to finalize artwork, which our artisans then hand-paint or stamp onto each piece. Available in all sizes with fast turnaround for urgent orders.',
        shortDescription: 'Customisable Sindhora with your branding — ideal for corporate and promotional use.',
        price: 45,
        wholesalePrice: 30,
        moq: 200,
        category: categories[5]._id,
        tags: ['custom', 'corporate', 'branded', 'promotional', 'sindhora'],
        images: [
          { url: '/images/products/custom-sindhora-1.jpg', alt: 'Custom Branded Sindhora for corporate use', isPrimary: true },
        ],
        dimensions: { length: 5, width: 5, height: 4, unit: 'cm' },
        weight: { value: 30, unit: 'g' },
        material: 'Gamhar Wood',
        color: 'Custom',
        stock: 'made-to-order',
        features: [
          'Your logo or design hand-painted on each piece',
          'Design consultation included',
          'Available in all sizes and colours',
          'Fast turnaround — 10 to 20 days',
          'Sample provided before bulk production',
        ],
        specifications: [
          { label: 'Material', value: 'Gamhar Wood' },
          { label: 'Customisation', value: 'Logo, text, artwork' },
          { label: 'MOQ', value: '200 pieces' },
          { label: 'Turnaround', value: '10–20 days' },
        ],
        seoMeta: {
          metaTitle: 'Custom Branded Sindhora – Corporate & Promotional | Sanjay Industries',
          metaDescription: 'Get custom branded Sindhora with your logo. Ideal for corporate gifts and promotions. Manufacturer Varanasi.',
          keywords: ['custom sindhora', 'branded sindhora', 'corporate gifts wooden'],
        },
        isFeatured: false,
      },
    ]);
    console.log('Products created:', products.length);

    // Update category product counts
    for (const cat of categories) {
      const count = await Product.countDocuments({ category: cat._id });
      await Category.findByIdAndUpdate(cat._id, { productCount: count });
    }

    // Create testimonials
    const testimonials = await Testimonial.insertMany([
      {
        name: 'Ramesh Agarwal',
        company: 'Agarwal Gift House',
        designation: 'Owner',
        location: 'Jaipur, Rajasthan',
        content: 'We have been sourcing Sindhora and kumkum boxes from Sanjay Industries for over 8 years now. The quality is consistently excellent, and the craftsmanship is truly unmatched. Their ability to deliver large orders on time makes them our most reliable supplier.',
        rating: 5,
        isActive: true,
        order: 1,
      },
      {
        name: 'Priya Sharma',
        company: 'Divine Puja Store',
        designation: 'Procurement Manager',
        location: 'Delhi',
        content: 'The wooden pooja items from Sanjay Industries are beautifully crafted. Our customers specifically ask for their products because of the fine hand-painting and attention to detail. The wholesale pricing is very competitive for this quality level.',
        rating: 5,
        isActive: true,
        order: 2,
      },
      {
        name: 'Kailash Gupta',
        company: 'Shubh Vivah Wedding Supplies',
        designation: 'Director',
        location: 'Lucknow, Uttar Pradesh',
        content: 'We supply wedding return gifts across UP and have been working with Sanjay Industries for 5 years. Their haldi-kumkum sets are always a hit at weddings. The custom packaging option they provide is a great value addition for our business.',
        rating: 5,
        isActive: true,
        order: 3,
      },
      {
        name: 'Anita Reddy',
        company: 'Crafts Emporium',
        designation: 'Founder',
        location: 'Hyderabad, Telangana',
        content: 'As a retailer of traditional Indian handicrafts, I am very particular about quality and authenticity. Sanjay Industries delivers on both counts. Their Meenakari work is outstanding and our Hyderabad customers love the Varanasi touch in every product.',
        rating: 4,
        isActive: true,
        order: 4,
      },
      {
        name: 'Vijay Patel',
        company: 'Patel Traders',
        designation: 'Proprietor',
        location: 'Ahmedabad, Gujarat',
        content: 'Good quality products with reasonable pricing. The dry fruit boxes for Diwali were a huge success. Will definitely be placing larger orders next season. Communication and delivery were smooth throughout.',
        rating: 4,
        isActive: true,
        order: 5,
      },
    ]);
    console.log('Testimonials created:', testimonials.length);

    // Create blog posts
    const blogs = await Blog.insertMany([
      {
        title: 'The Art of Making Wooden Sindhora: A Varanasi Tradition',
        slug: 'art-of-making-wooden-sindhora-varanasi',
        content: '<p>The <strong>wooden Sindhora</strong> — that small, delicately crafted box that holds sindoor — is more than just a container. It is a symbol of married life in Hindu culture, a piece of art that has been part of Indian households for centuries.</p><p>At Sanjay Industries in <strong>Varanasi</strong>, we have been crafting these boxes for over 15 years, carrying forward a tradition that runs even deeper in the holy city of Kashi. Here is how we make each piece.</p><h2>Selecting the Right Wood</h2><p>We primarily use <strong>Gamhar wood</strong> (Gmelina arborea), known locally for its light weight, fine grain, and ability to hold lacquer paint beautifully. The wood is seasoned for several weeks to reduce moisture content and prevent cracking after the product is made.</p><h2>Turning on the Lathe</h2><p>The seasoned wood is mounted on a traditional hand-operated or semi-automatic <strong>wooden lathe</strong>. Our turners shape the box and lid separately, ensuring a precise fit. This step requires years of experience — the wall thickness must be uniform, and the lid must rotate smoothly.</p><h2>Painting and Lacquer Work</h2><p>Once shaped, each Sindhora is painted using <strong>lac-based colours</strong>. The artisan holds coloured lac sticks against the spinning piece, creating vibrant, even coats. For Meenakari pieces, the base colour is applied first, and then detailed patterns are hand-painted using fine brushes.</p><h2>Quality Check and Packaging</h2><p>Every piece goes through a quality check — we inspect the fit, finish, colour consistency, and structural integrity. Approved pieces are individually wrapped in bubble wrap and packed in corrugated boxes for safe transit.</p><p>From our workshop in Varanasi to your store shelf, every Sindhora carries the warmth of handmade craftsmanship.</p>',
        excerpt: 'Discover how traditional wooden Sindhora boxes are handcrafted in our Varanasi workshop — from selecting Gamhar wood to the final lacquer finish.',
        category: 'Manufacturing',
        tags: ['sindhora', 'manufacturing', 'Varanasi', 'craftsmanship', 'wooden'],
        author: { name: 'Sanjay Industries' },
        seoMeta: {
          metaTitle: 'How Wooden Sindhora is Made – Varanasi Manufacturing Process',
          metaDescription: 'Learn about the traditional art of making wooden Sindhora in Varanasi. From wood selection to hand-painting — the complete process.',
          keywords: ['sindhora making', 'Varanasi handicrafts', 'wooden sindoor box manufacturing'],
        },
        isPublished: true,
        readTime: 5,
      },
      {
        title: 'Why Wooden Handicrafts from Varanasi Make Perfect Wedding Gifts',
        slug: 'wooden-handicrafts-varanasi-wedding-gifts',
        content: '<p>Indian weddings are celebrations of tradition, beauty, and generosity. And when it comes to choosing <strong>return gifts</strong> that embody these values, nothing beats handcrafted wooden items from <strong>Varanasi</strong>.</p><h2>The Cultural Connection</h2><p>Varanasi has been a centre of woodcraft for centuries. Products made here carry a cultural weight that factory-made plastic alternatives simply cannot match. When you gift a hand-painted Sindhora or a carved kumkum box, you are gifting a piece of India\'s artistic heritage.</p><h2>Eco-Friendly and Sustainable</h2><p>With growing awareness about sustainability, wooden gifts are increasingly preferred over plastic and metal. Our products use <strong>sustainably sourced wood</strong> and non-toxic paints, making them environmentally responsible choices.</p><h2>Perfect for Every Budget</h2><p>Whether you are planning a modest ceremony or a grand wedding, we have products at every price point — from ₹15 sindoor boxes for large-scale distribution to premium Meenakari sets for VIP guests.</p><h2>Custom Packaging Available</h2><p>We offer custom packaging with the couple\'s name, wedding date, or a personalised message printed on each box. This adds a personal touch that guests remember long after the wedding.</p><p><strong>Sanjay Industries</strong> has supplied wedding items to planners and families in over 30 cities. Contact us to discuss your wedding requirements.</p>',
        excerpt: 'Handcrafted wooden items from Varanasi make meaningful, eco-friendly, and beautiful wedding return gifts at every price point.',
        category: 'Gifting',
        tags: ['wedding', 'gifts', 'return gifts', 'Varanasi', 'handcrafted'],
        author: { name: 'Sanjay Industries' },
        seoMeta: {
          metaTitle: 'Wooden Wedding Return Gifts from Varanasi | Sanjay Industries Blog',
          metaDescription: 'Why Varanasi wooden handicrafts make the best wedding return gifts. Cultural, eco-friendly, and affordable. Bulk orders available.',
          keywords: ['wedding return gifts', 'wooden gifts', 'Varanasi handicrafts wedding'],
        },
        isPublished: true,
        readTime: 4,
      },
      {
        title: 'Bulk Ordering Wooden Products: A Complete Guide for Retailers',
        slug: 'bulk-ordering-wooden-products-guide-retailers',
        content: '<p>If you run a retail store, gift shop, or religious supplies business, sourcing quality wooden products at the right price is critical to your margins and customer satisfaction. Here is our guide to making bulk orders from a manufacturer like <strong>Sanjay Industries</strong>.</p><h2>Understanding MOQ</h2><p>MOQ stands for <strong>Minimum Order Quantity</strong> — the smallest number of pieces we can produce in a single batch. Our MOQs typically range from 25 to 200 pieces depending on the product. Lower MOQs are available for premium items; basic items have higher MOQs to keep costs down.</p><h2>Requesting Samples</h2><p>We strongly recommend ordering samples before placing a large order. Sample charges are adjusted against your first bulk order. This ensures you are happy with the quality, size, colour, and finish before committing.</p><h2>Pricing Tiers</h2><p>Our pricing follows a tiered structure — the larger your order, the better the per-piece rate. We publish wholesale rates on our website, but for orders above 1,000 pieces, contact us for special project pricing.</p><h2>Delivery and Packaging</h2><p>We ship across India via reliable transport partners. Every product is individually wrapped and packed in corrugated boxes. For fragile items, we use additional thermocol protection. Typical delivery takes 5–7 days after dispatch.</p><h2>Payment Terms</h2><p>For first-time orders, we work on advance payment. For repeat clients, we offer 50% advance and 50% before dispatch terms. We accept bank transfer, UPI, and cheque payments.</p><p>Ready to place your first order? <strong>Contact our wholesale team</strong> or fill the bulk order form on our website.</p>',
        excerpt: 'A step-by-step guide for retailers on how to place bulk orders for wooden products — MOQ, samples, pricing, delivery, and payment.',
        category: 'Business',
        tags: ['wholesale', 'bulk order', 'retailer', 'guide', 'business'],
        author: { name: 'Sanjay Industries' },
        seoMeta: {
          metaTitle: 'Bulk Ordering Guide for Wooden Products | Sanjay Industries',
          metaDescription: 'Complete guide for retailers on bulk ordering wooden handicrafts. MOQ, pricing, delivery, and payment terms from Sanjay Industries, Varanasi.',
          keywords: ['bulk order wooden products', 'wholesale handicrafts', 'wooden products retailer guide'],
        },
        isPublished: true,
        readTime: 6,
      },
    ]);
    console.log('Blogs created:', blogs.length);

    // Create settings
    await Settings.create({
      siteName: 'Sanjay Industries',
      tagline: 'Handcrafted Wooden Sindhora & Traditional Handicrafts',
      contactInfo: {
        email: 'info@sanjayindustries.com',
        phone: '+91-XXXXXXXXXX',
        whatsapp: '+91XXXXXXXXXX',
        address: {
          street: 'Varanasi',
          city: 'Varanasi',
          state: 'Uttar Pradesh',
          pincode: '221001',
          country: 'India',
        },
      },
      workingHours: {
        weekdays: 'Monday – Saturday: 9:00 AM – 7:00 PM',
        weekends: 'Sunday: Closed',
      },
      socialLinks: {
        facebook: 'https://facebook.com/sanjayindustries',
        instagram: 'https://instagram.com/sanjayindustries',
        youtube: 'https://youtube.com/@sanjayindustries',
      },
    });
    console.log('Settings created');

    console.log('\n✅ Database seeded successfully!');
    console.log('Admin login: admin@sanjayindustries.com / admin123456');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
