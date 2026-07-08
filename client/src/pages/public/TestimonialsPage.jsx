import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getTestimonials } from '../../api';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => { (async () => { try { const { data } = await getTestimonials(); setTestimonials(data.testimonials || []); } catch (e) {} })(); }, []);

  const demo = [
    { name: 'Ramesh Agarwal', company: 'Agarwal Gift House', location: 'Jaipur, Rajasthan', content: 'We have been sourcing Sindhora and kumkum boxes from Sanjay Industries for over 8 years now. The quality is consistently excellent, and the craftsmanship is truly unmatched.', rating: 5 },
    { name: 'Priya Sharma', company: 'Divine Puja Store', location: 'Delhi', content: 'The wooden pooja items from Sanjay Industries are beautifully crafted. Our customers specifically ask for their products because of the fine hand-painting and attention to detail.', rating: 5 },
    { name: 'Kailash Gupta', company: 'Shubh Vivah Wedding Supplies', location: 'Lucknow', content: 'We supply wedding return gifts across UP and have been working with Sanjay Industries for 5 years. Their haldi-kumkum sets are always a hit at weddings.', rating: 5 },
    { name: 'Anita Reddy', company: 'Crafts Emporium', location: 'Hyderabad', content: 'As a retailer of traditional Indian handicrafts, I am very particular about quality and authenticity. Sanjay Industries delivers on both counts.', rating: 4 },
    { name: 'Vijay Patel', company: 'Patel Traders', location: 'Ahmedabad', content: 'Good quality products with reasonable pricing. The dry fruit boxes for Diwali were a huge success. Will definitely place larger orders next season.', rating: 4 },
  ];

  const items = testimonials.length > 0 ? testimonials : demo;

  return (
    <>
      <SEOHead title="Testimonials" description="Read what our dealers, retailers, and wholesale partners say about Sanjay Industries products and services." canonical="/testimonials" />
      <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Testimonials' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">What Our Partners Say</h1></div></section>
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-7 h-full flex flex-col">
                <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, j) => <svg key={j} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>)}</div>
                <p className="text-text text-sm leading-relaxed italic flex-1 mb-5">"{t.content}"</p>
                <div className="border-t border-cream-dark pt-4"><div className="font-semibold text-primary text-sm">{t.name}</div><div className="text-text-light text-xs">{t.company}{t.location ? `, ${t.location}` : ''}</div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default TestimonialsPage;
