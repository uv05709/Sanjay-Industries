import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { FaIndustry, FaPaintBrush, FaTruck, FaHandshake, FaCertificate, FaBoxes } from 'react-icons/fa';
import SEOHead from '../../components/common/SEOHead';
import SectionHeading from '../../components/common/SectionHeading';
import { getFeaturedProducts, getTestimonials } from '../../api';

/* ——— Fade-In Wrapper ——— */
const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ——— Animated Counter ——— */
const Counter = ({ end, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div className="text-center">
      <div className="font-heading text-display-sm md:text-display text-accent font-bold">
        {count}{suffix}
      </div>
      <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-body">{label}</div>
    </div>
  );
};

/* ——— HOME PAGE ——— */
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, testRes] = await Promise.allSettled([
          getFeaturedProducts(),
          getTestimonials(),
        ]);
        if (prodRes.status === 'fulfilled') setFeaturedProducts(prodRes.value.data.products || []);
        if (testRes.status === 'fulfilled') setTestimonials(testRes.value.data.testimonials || []);
      } catch (e) { /* silently handle — demo mode works with empty data */ }
    };
    fetchData();
  }, []);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sanjay Industries',
    description: 'Manufacturer & Wholesale Supplier of Handcrafted Wooden Sindhora, Wedding Items, Religious Products & Decorative Handicrafts from Varanasi, India.',
    url: 'https://sanjayindustries.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Varanasi',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
  };

  return (
    <>
      <SEOHead
        title="Sanjay Industries — Handcrafted Wooden Sindhora & Handicrafts Manufacturer, Varanasi"
        description="Sanjay Industries is a family-owned manufacturer and wholesale supplier of handcrafted wooden Sindhora, wedding items, religious products, gift items and decorative handicrafts from Varanasi, India."
        canonical="/"
        jsonLd={organizationSchema}
      />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2C2C] via-[#3E1F15]/80 to-[#2C2C2C]" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.jpg')] bg-cover bg-center opacity-20" />

        <div className="container-custom relative z-10 py-32 lg:py-0">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-6 font-body"
            >
              Established Manufacturer — Varanasi, India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.1] mb-6"
            >
              Handcrafted Wooden Sindhora{' '}
              <span className="text-accent">&</span>{' '}
              Traditional Wooden Handicrafts
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed font-body"
            >
              Family-owned manufacturing business from Varanasi, supplying handcrafted
              wooden products to wholesalers, retailers, and dealers across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products" className="btn-accent">
                Explore Collection
                <HiArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/bulk-order" className="btn-outline-light">
                Request Bulk Order
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-accent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══ STATISTICS ═══ */}
      <section className="bg-primary py-14 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={15} suffix="+" label="Years Experience" />
            <Counter end={500} suffix="+" label="Products Manufactured" />
            <Counter end={200} suffix="+" label="Happy Dealers" />
            <Counter end={50} suffix="+" label="Cities Supplied" />
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading
            label="Why Choose Us"
            title="Craftsmanship You Can Trust"
            subtitle="From selecting the finest wood to the final polish, every step of our manufacturing process reflects decades of expertise and an unwavering commitment to quality."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FaIndustry, title: 'Direct from Manufacturer', desc: 'We manufacture every product in-house at our Varanasi facility. No middlemen, no markups — just factory-direct pricing for our wholesale partners.' },
              { icon: FaPaintBrush, title: 'Handcrafted Excellence', desc: 'Each piece is hand-turned, hand-painted, and hand-finished by skilled artisans who have inherited this craft through generations.' },
              { icon: FaBoxes, title: 'Bulk Order Specialists', desc: 'Whether you need 100 pieces or 10,000, our production capacity is built for large-scale orders with consistent quality across every batch.' },
              { icon: FaTruck, title: 'Pan-India Delivery', desc: 'We deliver to all major cities across India. Products are carefully packed with bubble wrap and corrugated boxes for damage-free transit.' },
              { icon: FaCertificate, title: 'Quality Guaranteed', desc: 'Every product undergoes a rigorous quality check before packaging. We use only lead-free, non-toxic paints and sustainably sourced wood.' },
              { icon: FaHandshake, title: 'Trusted by 200+ Dealers', desc: 'Retailers, wholesalers, gift shops, and wedding suppliers across 50+ cities trust Sanjay Industries for consistent quality and reliable supply.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card p-8 h-full group hover:-translate-y-1 transition-transform duration-400">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-heading-4 text-primary mb-3">{item.title}</h3>
                  <p className="text-text text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MANUFACTURING PROCESS ═══ */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <SectionHeading
            label="Our Process"
            title="From Raw Wood to Finished Art"
            subtitle="Every Sanjay Industries product goes through an 8-step manufacturing process, ensuring quality and authenticity at every stage."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Wood Selection', desc: 'We source seasoned Gamhar, Mango, and Sheesham wood from trusted suppliers.' },
              { step: '02', title: 'Cutting & Shaping', desc: 'Raw wood is cut to size and shaped on traditional lathes by experienced turners.' },
              { step: '03', title: 'Drying & Treatment', desc: 'Shaped pieces are dried to optimal moisture levels to prevent warping.' },
              { step: '04', title: 'Hand Painting', desc: 'Artisans apply vibrant lacquer colours and intricate Meenakari designs by hand.' },
              { step: '05', title: 'Detailing', desc: 'Fine brushwork adds patterns, borders, and decorative motifs unique to each piece.' },
              { step: '06', title: 'Polishing', desc: 'Multiple coats of polish give each piece a smooth, durable, and lustrous finish.' },
              { step: '07', title: 'Quality Check', desc: 'Every product is inspected for fit, finish, colour consistency, and structural integrity.' },
              { step: '08', title: 'Packaging', desc: 'Approved items are individually wrapped in bubble wrap and boxed for safe delivery.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="relative p-6 bg-white rounded-lg border border-cream-darker hover:border-accent/30 transition-colors duration-300 h-full">
                  <div className="font-heading text-4xl text-accent/20 font-bold absolute top-4 right-4">{item.step}</div>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mb-4">{item.step}</div>
                  <h4 className="font-heading text-lg text-primary font-semibold mb-2">{item.title}</h4>
                  <p className="text-text text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/manufacturing" className="btn-outline">
              View Full Process
              <HiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading
            label="Our Collection"
            title="Featured Products"
            subtitle="Explore our most popular handcrafted wooden products — each one a testament to the craftsmanship of Varanasi artisans."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredProducts.length > 0 ? featuredProducts.slice(0, 8) : [
              { name: 'Traditional Red Sindhora', shortDescription: 'Classic round Sindhora in traditional red lacquer finish.', price: 25, wholesalePrice: 15, slug: 'traditional-red-sindhora-round', images: [] },
              { name: 'Golden Meenakari Sindhora', shortDescription: 'Premium Sindhora with hand-painted Meenakari work.', price: 65, wholesalePrice: 40, slug: 'golden-meenakari-sindhora-premium', images: [] },
              { name: 'Kumkum Box Set – 4 Compartments', shortDescription: 'Traditional 4-compartment kumkum box in red and gold.', price: 45, wholesalePrice: 28, slug: 'wooden-kumkum-box-set-4-compartments', images: [] },
              { name: 'Haldi Kumkum Wedding Set', shortDescription: 'Complete haldi-kumkum set — perfect for wedding gifts.', price: 85, wholesalePrice: 55, slug: 'wooden-haldi-kumkum-set-wedding', images: [] },
            ]).map((product, i) => (
              <FadeIn key={product.slug || i} delay={i * 0.1}>
                <Link to={`/products/${product.slug}`} className="card overflow-hidden group h-full flex flex-col">
                  <div className="relative h-56 bg-cream-dark overflow-hidden">
                    {product.images?.[0]?.url ? (
                      <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-heading text-2xl text-primary/20">SI</span>
                      </div>
                    )}
                    {product.wholesalePrice && (
                      <div className="absolute top-3 right-3 badge-accent">Wholesale</div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-heading text-lg text-primary font-semibold mb-1.5 group-hover:text-accent transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-text text-sm mb-3 line-clamp-2 flex-1">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-primary font-semibold">₹{product.wholesalePrice || product.price}</span>
                        {product.wholesalePrice && (
                          <span className="text-text-light text-xs ml-2 line-through">₹{product.price}</span>
                        )}
                        <span className="text-text-light text-xs ml-1">/pc</span>
                      </div>
                      <span className="text-accent text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View <HiArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="btn-primary">
              View All Products
              <HiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <SectionHeading
            label="Testimonials"
            title="Trusted by Dealers Across India"
            subtitle="Hear from the retailers, wholesalers, and business owners who rely on Sanjay Industries for quality and consistency."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(testimonials.length > 0 ? testimonials.slice(0, 3) : [
              { name: 'Ramesh Agarwal', company: 'Agarwal Gift House', location: 'Jaipur', content: 'We have been sourcing Sindhora from Sanjay Industries for over 8 years. The quality is consistently excellent.', rating: 5 },
              { name: 'Priya Sharma', company: 'Divine Puja Store', location: 'Delhi', content: 'The wooden pooja items are beautifully crafted. Our customers specifically ask for their products.', rating: 5 },
              { name: 'Kailash Gupta', company: 'Shubh Vivah Wedding Supplies', location: 'Lucknow', content: 'Their haldi-kumkum sets are always a hit at weddings. Great value for our business.', rating: 5 },
            ]).map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="card p-7 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating || 5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                    ))}
                  </div>
                  <p className="text-text text-sm leading-relaxed italic flex-1 mb-5">"{item.content}"</p>
                  <div className="border-t border-cream-dark pt-4">
                    <div className="font-semibold text-primary text-sm">{item.name}</div>
                    <div className="text-text-light text-xs">{item.company}{item.location ? `, ${item.location}` : ''}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/testimonials" className="btn-outline">View All Testimonials</Link>
          </div>
        </div>
      </section>

      {/* ═══ DEALER CTA ═══ */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.jpg')] bg-cover" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4 inline-block font-body">
              Partner With Us
            </span>
            <h2 className="font-heading text-heading-1 md:text-display-sm text-white font-bold mb-5 max-w-2xl mx-auto">
              Become an Authorised Dealer of Sanjay Industries
            </h2>
            <p className="text-white/70 text-body-lg max-w-xl mx-auto mb-10">
              Join our growing network of 200+ dealers across India. Competitive wholesale pricing,
              reliable supply, and a product range your customers will love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/become-dealer" className="btn-accent">
                Apply to Become Dealer
                <HiArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/bulk-order" className="btn-outline-light">
                Request Bulk Pricing
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default Home;
