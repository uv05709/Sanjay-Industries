import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiCalendar, HiClock } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getBlogs } from '../../api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBlogs(); }, []);
  const fetchBlogs = async () => {
    try { const { data } = await getBlogs(); setBlogs(data.blogs || []); } catch (e) { setBlogs([]); }
    finally { setLoading(false); }
  };

  const demoBlogs = [
    { _id: '1', title: 'The Art of Making Wooden Sindhora: A Varanasi Tradition', slug: 'art-of-making-wooden-sindhora-varanasi', excerpt: 'Discover how traditional wooden Sindhora boxes are handcrafted in our Varanasi workshop.', category: 'Manufacturing', readTime: 5, createdAt: '2024-10-15' },
    { _id: '2', title: 'Why Wooden Handicrafts from Varanasi Make Perfect Wedding Gifts', slug: 'wooden-handicrafts-varanasi-wedding-gifts', excerpt: 'Handcrafted wooden items make meaningful, eco-friendly, and beautiful wedding return gifts.', category: 'Gifting', readTime: 4, createdAt: '2024-09-20' },
    { _id: '3', title: 'Bulk Ordering Wooden Products: A Complete Guide for Retailers', slug: 'bulk-ordering-wooden-products-guide-retailers', excerpt: 'A step-by-step guide for retailers on how to place bulk orders for wooden products.', category: 'Business', readTime: 6, createdAt: '2024-08-10' },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : demoBlogs;

  return (
    <>
      <SEOHead title="Blog — Articles & Insights" description="Read about wooden handicraft manufacturing, Varanasi artisan traditions, wholesale buying guides, and product inspiration from Sanjay Industries." canonical="/blog" />
      <section className="pt-28 pb-12 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Blog' }]} /><h1 className="font-heading text-display-sm text-white font-bold mt-4">Blog & Articles</h1><p className="text-white/70 mt-2">Insights on craftsmanship, wholesale buying, and the art of woodwork.</p></div></section>
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBlogs.map((blog, i) => (
              <motion.div key={blog._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/blog/${blog.slug}`} className="card overflow-hidden group h-full flex flex-col">
                  <div className="h-48 bg-cream-dark flex items-center justify-center">
                    {blog.featuredImage?.url ? <img src={blog.featuredImage.url} alt={blog.title} className="w-full h-full object-cover" /> : <span className="font-heading text-3xl text-primary/10">SI</span>}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="badge-accent mb-3 self-start">{blog.category}</span>
                    <h3 className="font-heading text-heading-4 text-primary font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">{blog.title}</h3>
                    <p className="text-text text-sm mb-4 line-clamp-2 flex-1">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-text-light">
                      <span className="flex items-center gap-1"><HiCalendar className="w-3.5 h-3.5" />{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><HiClock className="w-3.5 h-3.5" />{blog.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default BlogList;
