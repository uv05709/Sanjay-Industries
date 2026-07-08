import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiCalendar, HiClock, HiArrowLeft } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getBlog } from '../../api';

const BlogSingle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBlog(); window.scrollTo(0, 0); }, [slug]);
  const fetchBlog = async () => {
    try { const { data } = await getBlog(slug); setBlog(data.blog); }
    catch (e) { setBlog({ title: 'Blog Post', slug, content: '<p>Content will appear here.</p>', category: 'General', readTime: 5, createdAt: new Date().toISOString(), author: { name: 'Sanjay Industries' } }); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="pt-28 section-padding bg-cream"><div className="container-narrow animate-pulse"><div className="h-8 bg-cream-dark rounded w-3/4 mb-4" /><div className="h-4 bg-cream-dark rounded w-1/2 mb-8" /><div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-cream-dark rounded" />)}</div></div></div>;
  if (!blog) return <div className="pt-28 section-padding text-center"><p>Blog post not found.</p></div>;

  return (
    <>
      <SEOHead title={blog.seoMeta?.metaTitle || blog.title} description={blog.seoMeta?.metaDescription || blog.excerpt} canonical={`/blog/${blog.slug}`} ogType="article" />
      <section className="pt-28 pb-8 bg-primary"><div className="container-custom"><Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: blog.title }]} /></div></section>
      <article className="section-padding bg-cream">
        <div className="container-narrow">
          <span className="badge-accent mb-4">{blog.category}</span>
          <h1 className="font-heading text-heading-1 md:text-display-sm text-primary font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-light mb-8">
            <span>By {blog.author?.name || 'Sanjay Industries'}</span>
            <span className="flex items-center gap-1"><HiCalendar className="w-4 h-4" />{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-1"><HiClock className="w-4 h-4" />{blog.readTime} min read</span>
          </div>
          {blog.featuredImage?.url && <img src={blog.featuredImage.url} alt={blog.title} className="w-full rounded-lg mb-8" />}
          <div className="prose prose-lg max-w-none text-text [&_h2]:font-heading [&_h2]:text-primary [&_h2]:text-heading-2 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:leading-relaxed [&_strong]:text-primary" dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div className="mt-12 pt-8 border-t border-cream-dark">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"><HiArrowLeft className="w-4 h-4" /> Back to all articles</Link>
          </div>
        </div>
      </article>
    </>
  );
};
export default BlogSingle;
