import { useState, useEffect } from 'react';
import { getAdminProducts, deleteProduct, getCategories, createProduct, updateProduct, uploadImage } from '../../api';
import { HiPlus, HiPencilAlt, HiTrash, HiSearch, HiX, HiPhotograph } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', sku: '', shortDescription: '', description: '',
    price: '', wholesalePrice: '', moq: '', category: '',
    material: '', color: '', stock: 'in-stock', isFeatured: false,
    images: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        getAdminProducts(),
        getCategories()
      ]);
      setProducts(prodRes.data.products || []);
      setCategories(catRes.data.categories || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name, sku: product.sku, shortDescription: product.shortDescription,
        description: product.description, price: product.price, wholesalePrice: product.wholesalePrice,
        moq: product.moq, category: product.category?._id || '', material: product.material,
        color: product.color, stock: product.stock, isFeatured: product.isFeatured,
        images: product.images || [],
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '', sku: '', shortDescription: '', description: '',
        price: '', wholesalePrice: '', moq: '100', category: '',
        material: 'Gamhar Wood', color: '', stock: 'in-stock', isFeatured: false,
        images: [],
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    const imgData = new FormData();
    imgData.append('image', file);
    imgData.append('folder', 'products');

    try {
      const { data } = await uploadImage(imgData);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, { url: data.url, publicId: data.publicId, alt: prev.name }]
      }));
    } catch (error) {
      alert('Image upload failed');
    } finally {
      setUploadingImage(false);
      e.target.value = null;
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (currentProduct) {
        await updateProduct(currentProduct._id, formData);
      } else {
        await createProduct(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Products" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-heading">Manage Products</h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 !py-2 !px-4">
          <HiPlus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-cream-dark flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="relative w-full sm:w-72">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input 
              type="text" 
              placeholder="Search by name or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 !py-2 text-sm"
            />
          </div>
          <div className="text-sm text-text-light flex items-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-dark text-text-dark border-b border-cream-darker">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">SKU</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">W. Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-cream-50 transition-colors bg-white">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-cream-dark overflow-hidden flex-shrink-0">
                        {product.images?.[0]?.url ? (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-text-light">No img</div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary line-clamp-1 max-w-[200px]">{product.name}</p>
                        {product.isFeatured && <span className="text-[10px] uppercase font-bold text-accent">Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text">{product.sku}</td>
                  <td className="px-6 py-4 text-text">{product.category?.name || '-'}</td>
                  <td className="px-6 py-4 font-medium text-primary">₹{product.wholesalePrice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.stock === 'in-stock' ? 'bg-green-100 text-green-700' :
                      product.stock === 'made-to-order' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                        <HiPencilAlt className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-text-light">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center bg-cream-50">
              <h2 className="text-xl font-heading font-bold text-primary">
                {currentProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => !isSubmitting && setIsModalOpen(false)} className="text-text-light hover:text-text-dark">
                <HiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Product Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">SKU *</label>
                    <input type="text" name="sku" required value={formData.sku} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="input-label">Short Description *</label>
                    <input type="text" name="shortDescription" required value={formData.shortDescription} onChange={handleInputChange} className="input-field" maxLength={150} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="input-label">Full Description</label>
                    <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className="input-field"></textarea>
                  </div>
                </div>

                <hr className="border-cream-dark" />

                {/* Pricing & Inventory */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="input-label">Category *</label>
                    <select name="category" required value={formData.category} onChange={handleInputChange} className="input-field">
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Wholesale Price (₹) *</label>
                    <input type="number" name="wholesalePrice" required min="0" value={formData.wholesalePrice} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">Retail Price (₹) (Optional)</label>
                    <input type="number" name="price" min="0" value={formData.price} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">MOQ *</label>
                    <input type="number" name="moq" required min="1" value={formData.moq} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">Stock Status</label>
                    <select name="stock" value={formData.stock} onChange={handleInputChange} className="input-field">
                      <option value="in-stock">In Stock</option>
                      <option value="made-to-order">Made to Order</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />
                      <span className="text-sm font-medium text-text-dark">Featured Product</span>
                    </label>
                  </div>
                </div>

                <hr className="border-cream-dark" />

                {/* Images */}
                <div>
                  <label className="input-label mb-2">Product Images</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative w-24 h-24 rounded border border-cream-darker overflow-hidden group">
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <HiX className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {formData.images.length < 5 && (
                      <div className="w-24 h-24 rounded border-2 border-dashed border-cream-dark flex flex-col items-center justify-center text-text-light relative hover:border-primary transition-colors hover:text-primary cursor-pointer bg-cream-50">
                        {uploadingImage ? (
                          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <HiPhotograph className="w-6 h-6 mb-1" />
                            <span className="text-xs">Upload</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-text-light">Upload up to 5 images. Recommended size: 800x800px (1:1 ratio).</p>
                </div>

              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-cream-dark bg-cream-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="btn-outline !py-2 !px-4 text-sm">
                Cancel
              </button>
              <button type="submit" form="productForm" disabled={isSubmitting || uploadingImage} className="btn-primary !py-2 !px-6 text-sm">
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProducts;
