import { useState, useEffect } from 'react';
import { getGalleryImages, createGalleryImage, deleteGalleryImage, uploadImage } from '../../api';
import { HiPlus, HiTrash, HiPhotograph, HiX } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'workshop', description: '', image: null });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchGallery(); }, []);
  const fetchGallery = async () => {
    setLoading(true);
    try { const { data } = await getGalleryImages(); setImages(data.images || []); } catch (e) {} finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this image?')) {
      try { await deleteGalleryImage(id); setImages(images.filter(i => i._id !== id)); } catch (e) {}
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const imgData = new FormData();
    imgData.append('image', file);
    imgData.append('folder', 'gallery');
    try {
      const { data } = await uploadImage(imgData);
      setFormData(prev => ({ ...prev, image: { url: data.image.url, publicId: data.image.publicId } }));
    } catch (error) { alert('Image upload failed'); } finally { setUploadingImage(false); e.target.value = null; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert('Please upload an image');
    setIsSubmitting(true);
    try { await createGalleryImage(formData); setIsModalOpen(false); fetchGallery(); } 
    catch (e) { alert('Failed to save'); } finally { setIsSubmitting(false); }
  };

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Gallery" />
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-primary font-heading">Photo Gallery</h1><button onClick={() => { setFormData({ title: '', category: 'workshop', description: '', image: null }); setIsModalOpen(true); }} className="btn-primary flex items-center gap-2 !py-2 !px-4"><HiPlus className="w-5 h-5" /> Add Image</button></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img._id} className="relative group rounded-lg overflow-hidden border border-cream-dark shadow-sm">
            <img src={img.image?.url} alt={img.title} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-white font-medium text-sm truncate">{img.title}</p>
              <button onClick={() => handleDelete(img._id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"><HiTrash className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center"><h2 className="text-xl font-heading font-bold text-primary">Add Gallery Image</h2><button onClick={() => setIsModalOpen(false)}><HiX className="w-6 h-6" /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-cream-dark rounded-md bg-cream-50 relative overflow-hidden">
                  {formData.image ? <img src={formData.image.url} alt="" className="w-full h-full object-cover" /> : uploadingImage ? <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div> : <><HiPhotograph className="w-8 h-8 text-text-light mb-2" /><span className="text-sm text-text-light">Click to upload image</span></>}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploadingImage} />
                </div>
              </div>
              <div><label className="input-label">Title *</label><input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field" /></div>
              <div><label className="input-label">Category</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="input-field"><option value="workshop">Workshop</option><option value="products">Products</option><option value="process">Process</option><option value="team">Team</option></select></div>
              <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline !py-2 !px-4 text-sm">Cancel</button><button type="submit" disabled={isSubmitting || uploadingImage || !formData.image} className="btn-primary !py-2 !px-6 text-sm">{isSubmitting ? 'Saving...' : 'Add Image'}</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ManageGallery;
