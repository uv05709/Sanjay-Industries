import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { FaEye, FaBullseye, FaHeart, FaHandsHelping, FaLeaf, FaStar } from 'react-icons/fa';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import SectionHeading from '../../components/common/SectionHeading';

const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }} className={className}>
    {children}
  </motion.div>
);

const About = () => {
  const timeline = [
    { year: '2008', title: 'The Beginning', desc: 'Started as a small family workshop in Varanasi, crafting wooden Sindhora for the local market.' },
    { year: '2011', title: 'Growing Demand', desc: 'Expanded production capacity and began supplying to wholesalers in neighbouring cities.' },
    { year: '2014', title: 'Product Diversification', desc: 'Introduced wedding items, religious products, and decorative gift boxes to our catalogue.' },
    { year: '2017', title: 'Pan-India Supply', desc: 'Reached 30+ cities with a reliable dealer network across North and Central India.' },
    { year: '2020', title: 'Modernisation', desc: 'Upgraded workshop with semi-automatic lathes while retaining handcrafted finishing traditions.' },
    { year: '2024', title: 'Digital Presence', desc: 'Launched our online platform to connect directly with retailers and dealers nationwide.' },
  ];

  return (
    <>
      <SEOHead title="About Us — Our Story" description="Learn about Sanjay Industries, a family-owned wooden handicrafts manufacturer based in Varanasi, India. Our story, mission, and commitment to craftsmanship." canonical="/about" />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-20 bg-primary">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.jpg')] bg-cover" />
        <div className="container-custom relative z-10">
          <Breadcrumb items={[{ label: 'About Us' }]} />
          <h1 className="font-heading text-display-sm md:text-display text-white font-bold mt-4">Our Story</h1>
          <p className="text-white/70 text-body-lg mt-4 max-w-xl">A family legacy of craftsmanship, rooted in the traditions of Varanasi.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="bg-cream-dark rounded-lg aspect-[4/3] flex items-center justify-center">
                  <span className="font-heading text-6xl text-primary/10">SI</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-lg -z-10" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">A Family of Craftsmen from the Heart of Varanasi</h2>
              <div className="divider my-4" />
              <div className="space-y-4 text-text leading-relaxed">
                <p>Sanjay Industries was founded with a simple belief: that the traditional wooden crafts of Varanasi deserve to reach every corner of India — without compromising on quality or authenticity.</p>
                <p>What started as a small family workshop has grown into a full-fledged manufacturing facility, but our core process remains the same. We purchase raw wood, shape it on traditional lathes, hand-paint every piece with care, polish and pack each item individually, and supply directly to wholesalers, retailers, and gift shops across the country.</p>
                <p>Every product that leaves our workshop carries the warmth of human hands — the steady grip of a lathe turner, the precise strokes of a Meenakari painter, and the careful wrapping of our packing team. This is not mass production. This is craftsmanship.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaBullseye, title: 'Our Mission', desc: 'To manufacture the highest quality wooden handicrafts using traditional techniques, and to make them accessible to businesses of all sizes across India at fair wholesale prices.' },
              { icon: FaEye, title: 'Our Vision', desc: 'To be recognised as India\'s most trusted manufacturer of wooden Sindhora and traditional handicrafts — known for quality, authenticity, and the artisan heritage of Varanasi.' },
              { icon: FaHeart, title: 'Our Promise', desc: 'Every product we sell is made in our own facility by our own artisans. We never outsource, never compromise on materials, and never skip a quality check.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card p-8 h-full text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading text-heading-3 text-primary mb-3">{item.title}</h3>
                  <p className="text-text text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading label="What Guides Us" title="Our Core Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaHandsHelping, title: 'Integrity', desc: 'Honest business practices — from pricing to delivery commitments.' },
              { icon: FaStar, title: 'Quality First', desc: 'No product leaves our facility without passing our quality standards.' },
              { icon: FaLeaf, title: 'Sustainability', desc: 'We use sustainably sourced wood and non-toxic, lead-free paints.' },
              { icon: FaHeart, title: 'Artisan Welfare', desc: 'Fair wages and good working conditions for every craftsperson.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading text-lg text-primary font-semibold mb-2">{item.title}</h4>
                  <p className="text-text text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <SectionHeading label="Our Journey" title="The Sanjay Industries Timeline" />
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{item.year}</div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-cream-darker mt-2" />}
                  </div>
                  <div className="pt-2 pb-6">
                    <h4 className="font-heading text-lg text-primary font-semibold mb-1">{item.title}</h4>
                    <p className="text-text text-sm">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-heading-1 text-white font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Whether you are a retailer looking for quality products or a wholesaler seeking a reliable manufacturer, we are here to serve.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-accent">Contact Us <HiArrowRight className="ml-2 w-4 h-4" /></Link>
            <Link to="/products" className="btn-outline-light">View Products</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
