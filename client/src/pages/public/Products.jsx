import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSearch, HiArrowRight, HiAdjustments } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getProducts, getCategories } from '../../api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '-createdAt';
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: 12, sort: currentSort };
      if (currentCategory) params.category = currentCategory;
      if (keyword) params.keyword = keyword;

      const { data } = await getProducts(params);
      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data.categories || []);
    } catch (error) {
      setCategories([]);
    }
  };

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    setSearchParams(params);
  };

  // Demo products if API returns empty
  const displayProducts = products.length > 0 ? products : [
    { _id: '1', name: 'Traditional Red Sindhora – Round Design', slug: 'traditional-red-sindhora-round', shortDescription: 'Classic round Sindhora in traditional red lacquer finish, hand-turned from Gamhar wood.', price: 25, wholesalePrice: 15, stock: 'in-stock', images: [] },
    { _id: '2', name: 'Golden Meenakari Sindhora – Premium', slug: 'golden-meenakari-sindhora-premium', shortDescription: 'Premium Sindhora with hand-painted Meenakari work and golden finish.', price: 65, wholesalePrice: 40, stock: 'in-stock', images: [] },
    { _id: '3', name: 'Wooden Kumkum Box Set – 4 Compartments', slug: 'wooden-kumkum-box-set-4-compartments', shortDescription: 'Traditional 4-compartment kumkum box in red and gold lacquer finish.', price: 45, wholesalePrice: 28, stock: 'in-stock', images: [] },
    { _id: '4', name: 'Wooden Haldi Kumkum Set – Wedding Special', slug: 'wooden-haldi-kumkum-set-wedding', shortDescription: 'Complete haldi-kumkum set with tray — perfect for wedding return gifts.', price: 85, wholesalePrice: 55, stock: 'in-stock', images: [] },
    { _id: '5', name: 'Wooden Pooja Chowki – Hand-Painted', slug: 'wooden-pooja-chowki-hand-painted', shortDescription: 'Hand-painted wooden pooja chowki with sacred motifs.', price: 120, wholesalePrice: 75, stock: 'in-stock', images: [] },
    { _id: '6', name: 'Dry Fruit Gift Box – Wooden Carved', slug: 'dry-fruit-gift-box-wooden-carved', shortDescription: 'Hand-carved wooden dry fruit box with compartments.', price: 180, wholesalePrice: 110, stock: 'in-stock', images: [] },
  ];

  return (
    <>
      <SEOHead title="Products — Wooden Sindhora & Handicrafts" description="Explore our complete range of handcrafted wooden products — Sindhora, wedding items, religious products, gift boxes, and custom handicrafts. Wholesale prices from manufacturer." canonical="/products" />

      {/* Header */}
      <section className="pt-28 pb-12 bg-primary">
        <div className="container-custom">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <h1 className="font-heading text-display-sm text-white font-bold mt-4">Our Products</h1>
          <p className="text-white/70 mt-2">Handcrafted wooden products — direct from our Varanasi manufacturing facility.</p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-custom">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
              <input
                type="text"
                placeholder="Search products..."
                defaultValue={keyword}
                onKeyDown={(e) => e.key === 'Enter' && updateParam('keyword', e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={currentSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="input-field !w-auto !py-2.5 text-sm"
              >
                <option value="-createdAt">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
              </select>

              {/* Filter toggle (mobile) */}
              <button onClick={() => setShowFilters(!showFilters)} className="md:hidden btn-outline !py-2.5 !px-4">
                <HiAdjustments className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 flex-shrink-0`}>
              <div className="card p-5 sticky top-24">
                <h3 className="font-heading text-lg text-primary font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateParam('category', '')}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${!currentCategory ? 'bg-primary/10 text-primary font-medium' : 'text-text hover:text-primary'}`}
                  >
                    All Products
                  </button>
                  {(categories.length > 0 ? categories : [
                    { name: 'Wooden Sindhora', slug: 'wooden-sindhora' },
                    { name: 'Wedding Items', slug: 'wedding-items' },
                    { name: 'Religious Products', slug: 'religious-products' },
                    { name: 'Gift Items', slug: 'gift-items' },
                    { name: 'Decorative Boxes', slug: 'decorative-boxes' },
                    { name: 'Custom Handicrafts', slug: 'custom-handicrafts' },
                  ]).map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => updateParam('category', cat.slug)}
                      className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${currentCategory === cat.slug ? 'bg-primary/10 text-primary font-medium' : 'text-text hover:text-primary'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* MOQ Info */}
                <div className="mt-6 pt-5 border-t border-cream-dark">
                  <p className="text-xs text-text-light leading-relaxed">
                    All prices shown are per piece at wholesale rates. MOQ varies by product.{' '}
                    <Link to="/bulk-order" className="text-accent font-medium">Request bulk pricing →</Link>
                  </p>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="card overflow-hidden animate-pulse">
                      <div className="h-52 bg-cream-dark" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-cream-dark rounded w-3/4" />
                        <div className="h-3 bg-cream-dark rounded w-full" />
                        <div className="h-3 bg-cream-dark rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProducts.map((product, i) => (
                      <motion.div
                        key={product._id || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                      >
                        <Link to={`/products/${product.slug}`} className="card overflow-hidden group h-full flex flex-col">
                          <div className="relative h-52 bg-cream-dark overflow-hidden">
                            {product.images?.[0]?.url ? (
                              <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><span className="font-heading text-3xl text-primary/10">SI</span></div>
                            )}
                            <div className={`absolute top-3 left-3 badge ${product.stock === 'in-stock' ? 'badge-success' : 'badge-accent'}`}>
                              {product.stock === 'in-stock' ? 'In Stock' : product.stock === 'made-to-order' ? 'Made to Order' : 'Out of Stock'}
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-heading text-lg text-primary font-semibold mb-1.5 group-hover:text-accent transition-colors line-clamp-2">{product.name}</h3>
                            <p className="text-text text-sm mb-3 line-clamp-2 flex-1">{product.shortDescription}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-primary font-semibold">₹{product.wholesalePrice || product.price}</span>
                                {product.wholesalePrice && <span className="text-text-light text-xs ml-1 line-through">₹{product.price}</span>}
                                <span className="text-text-light text-xs ml-1">/pc</span>
                              </div>
                              <span className="text-accent text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                Details <HiArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => updateParam('page', String(i + 1))}
                          className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-text hover:bg-primary/10 border border-cream-darker'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
