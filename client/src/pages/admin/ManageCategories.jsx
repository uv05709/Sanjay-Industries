import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory, uploadImage } from '../../api';
import { HiPlus, HiPencilAlt, HiTrash, HiSearch, HiX, HiPhotograph } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', description: '', order: 0, image: null });
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await getCategories();
      setCategories(data.categories || []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(c => c._id !== id));
      } catch (error) { alert(error.response?.data?.message || 'Error deleting category'); }
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({ name: category.name, description: category.description, order: category.order || 0, image: category.image });
    } else {
      setCurrentCategory(null);
      setFormData({ name: '', description: '', order: categories.length + 1, image: null });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const imgData = new FormData();
    imgData.append('image', file);
    imgData.append('folder', 'categories');
    try {
      const { data } = await uploadImage(imgData);
      setFormData(prev => ({ ...prev, image: { url: data.image.url, publicId: data.image.publicId } }));
    } catch (error) { alert('Image upload failed'); } finally { setUploadingImage(false); e.target.value = null; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (currentCategory) await updateCategory(currentCategory._id, formData);
      else await createCategory(formData);
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) { alert(error.response?.data?.message || 'Failed to save'); } finally { setIsSubmitting(false); }
  };

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Categories" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-heading">Product Categories</h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 !py-2 !px-4"><HiPlus className="w-5 h-5" /> Add Category</button>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-cream-dark flex justify-between bg-white">
          <div className="relative w-full sm:w-72"><HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" /><input type="text" placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pl-10 !py-2 text-sm" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-dark text-text-dark border-b border-cream-darker"><tr><th className="px-6 py-3 font-medium">Category Name</th><th className="px-6 py-3 font-medium">Slug</th><th className="px-6 py-3 font-medium">Products</th><th className="px-6 py-3 font-medium">Order</th><th className="px-6 py-3 font-medium text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-cream-dark">
              {filteredCategories.map((cat) => (
                <tr key={cat._id} className="hover:bg-cream-50 transition-colors bg-white">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-cream-dark overflow-hidden flex-shrink-0">{cat.image?.url ? <img src={cat.image.url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-text-light">No img</div>}</div>
                    <span className="font-medium text-primary">{cat.name}</span>
                  </td>
                  <td className="px-6 py-4 text-text">{cat.slug}</td>
                  <td className="px-6 py-4 text-text">{cat.productCount || 0} items</td>
                  <td className="px-6 py-4 text-text">{cat.order}</td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => openModal(cat)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><HiPencilAlt className="w-5 h-5" /></button><button onClick={() => handleDelete(cat._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><HiTrash className="w-5 h-5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center"><h2 className="text-xl font-heading font-bold text-primary">{currentCategory ? 'Edit Category' : 'Add Category'}</h2><button onClick={() => !isSubmitting && setIsModalOpen(false)}><HiX className="w-6 h-6 text-text-light hover:text-text" /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="input-label">Category Name *</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="input-label">Description</label><textarea name="description" rows={3} value={formData.description} onChange={handleInputChange} className="input-field"></textarea></div>
              <div><label className="input-label">Display Order</label><input type="number" name="order" value={formData.order} onChange={handleInputChange} className="input-field" /></div>
              <div>
                <label className="input-label">Category Image</label>
                <div className="flex items-center gap-4">
                  {formData.image?.url && <img src={formData.image.url} alt="" className="w-16 h-16 rounded object-cover border border-cream-dark" />}
                  <div className="relative">
                    <button type="button" disabled={uploadingImage} className="btn-outline !py-2 !px-4 text-sm">{uploadingImage ? 'Uploading...' : 'Upload Image'}</button>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploadingImage} />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="btn-outline !py-2 !px-4 text-sm">Cancel</button><button type="submit" disabled={isSubmitting || uploadingImage} className="btn-primary !py-2 !px-6 text-sm">{isSubmitting ? 'Saving...' : 'Save'}</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ManageCategories;
