import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getProduct, getRelatedProducts } from '../../api';

const SingleProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getProduct(slug);
      setProduct(data.product);
      const relData = await getRelatedProducts(slug);
      setRelated(relData.data.products || []);
    } catch (error) {
      // Use demo data
      setProduct({
        name: 'Traditional Red Sindhora – Round Design', slug, sku: 'SI-01001',
        description: '<p>Our signature red Sindhora features the traditional round design that has been a staple of Indian households for generations. Hand-turned on a wooden lathe from seasoned Gamhar wood.</p>',
        shortDescription: 'Classic round Sindhora in traditional red lacquer finish.',
        price: 25, wholesalePrice: 15, moq: 100, material: 'Gamhar Wood', color: 'Red', stock: 'in-stock',
        images: [], features: ['Hand-turned on traditional wooden lathe', 'Natural Gamhar wood', 'Lead-free lacquer paint', 'Precisely fitted lid', 'Authentic Varanasi craftsmanship'],
        specifications: [{ label: 'Material', value: 'Gamhar Wood' }, { label: 'Finish', value: 'Hand-painted lacquer' }, { label: 'Diameter', value: '5 cm' }, { label: 'Height', value: '4 cm' }, { label: 'Weight', value: '30 g' }, { label: 'MOQ', value: '100 pieces' }],
        faqs: [{ question: 'Is the paint safe?', answer: 'Yes, we use only lead-free, non-toxic lacquer paints.' }, { question: 'Can I get custom colours?', answer: 'Yes, for orders above 500 pieces.' }],
        category: { name: 'Wooden Sindhora', slug: 'wooden-sindhora' },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="pt-28 section-padding bg-cream">
      <div className="container-custom animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-cream-dark rounded-lg" />
          <div className="space-y-4"><div className="h-8 bg-cream-dark rounded w-3/4" /><div className="h-4 bg-cream-dark rounded w-1/2" /><div className="h-24 bg-cream-dark rounded" /></div>
        </div>
      </div>
    </div>
  );

  if (!product) return <div className="pt-28 section-padding text-center"><p>Product not found.</p></div>;

  const whatsappMsg = encodeURIComponent(`Hello Sanjay Industries, I am interested in "${product.name}" (SKU: ${product.sku}). Please share wholesale pricing and availability.`);

  return (
    <>
      <SEOHead
        title={product.seoMeta?.metaTitle || product.name}
        description={product.seoMeta?.metaDescription || product.shortDescription}
        canonical={`/products/${product.slug}`}
        ogType="product"
      />

      <section className="pt-28 pb-4 bg-cream">
        <div className="container-custom">
          <Breadcrumb items={[{ label: 'Products', path: '/products' }, { label: product.category?.name || 'Category', path: `/products?category=${product.category?.slug}` }, { label: product.name }]} />
        </div>
      </section>

      <section className="pb-16 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="aspect-square bg-cream-dark rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                {product.images?.[selectedImage]?.url ? (
                  <img src={product.images[selectedImage].url} alt={product.images[selectedImage].alt || product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-heading text-8xl text-primary/10">SI</span>
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-accent' : 'border-cream-darker'}`}>
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className={`badge mb-3 ${product.stock === 'in-stock' ? 'badge-success' : 'badge-accent'}`}>
                {product.stock === 'in-stock' ? 'In Stock' : product.stock === 'made-to-order' ? 'Made to Order' : 'Out of Stock'}
              </div>

              <h1 className="font-heading text-heading-1 text-primary font-bold mb-2">{product.name}</h1>
              <p className="text-text-light text-sm mb-4">SKU: {product.sku} | Category: {product.category?.name}</p>
              <p className="text-text text-body-lg mb-6">{product.shortDescription}</p>

              {/* Pricing */}
              <div className="bg-cream-dark rounded-lg p-5 mb-6">
                <div className="flex items-end gap-3 mb-2">
                  <span className="font-heading text-3xl text-primary font-bold">₹{product.wholesalePrice || product.price}</span>
                  {product.wholesalePrice && <span className="text-text-light line-through text-lg">₹{product.price}</span>}
                  <span className="text-text-light text-sm">per piece (wholesale)</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-text">
                  <span>MOQ: <strong className="text-primary">{product.moq} pieces</strong></span>
                  <span>Material: <strong className="text-primary">{product.material}</strong></span>
                </div>
              </div>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-heading text-lg text-primary font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text">
                        <HiCheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Link to="/bulk-order" className="btn-primary">
                  Request Bulk Enquiry <HiArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <a href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold text-sm rounded-md hover:bg-[#1DA851] transition-colors">
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp Enquiry
                </a>
              </div>

              <p className="text-xs text-text-light">Prices are for wholesale orders. Retail pricing available on request. Custom colours and designs available for orders of 500+ pieces.</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-14">
            <div className="flex border-b border-cream-darker gap-0">
              {['description', 'specifications', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-light hover:text-primary'}`}
                >
                  {tab === 'faq' ? 'FAQ' : tab}
                </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none text-text" dangerouslySetInnerHTML={{ __html: product.description }} />
              )}

              {activeTab === 'specifications' && product.specifications?.length > 0 && (
                <table className="w-full max-w-xl">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-cream-dark' : ''}>
                        <td className="px-4 py-2.5 text-sm font-medium text-primary w-1/3">{spec.label}</td>
                        <td className="px-4 py-2.5 text-sm text-text">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'faq' && product.faqs?.length > 0 && (
                <div className="space-y-4 max-w-2xl">
                  {product.faqs.map((faq, i) => (
                    <div key={i} className="card p-5">
                      <h4 className="font-semibold text-primary text-sm mb-2">{faq.question}</h4>
                      <p className="text-text text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-heading-2 text-primary font-semibold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <Link key={p._id} to={`/products/${p.slug}`} className="card overflow-hidden group">
                    <div className="h-44 bg-cream-dark flex items-center justify-center">
                      {p.images?.[0]?.url ? <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" /> : <span className="font-heading text-2xl text-primary/10">SI</span>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-base text-primary font-semibold group-hover:text-accent transition-colors line-clamp-1">{p.name}</h3>
                      <p className="text-text text-xs mt-1 line-clamp-1">{p.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
