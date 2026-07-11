import { useState, useEffect } from 'react';
import { getAdminBlogs, createBlog, updateBlog, deleteBlog, uploadImage } from '../../api';
import { HiPlus, HiPencilAlt, HiTrash, HiSearch, HiX, HiPhotograph, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', category: '', readTime: 5, isPublished: true, featuredImage: null });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try { const { data } = await getAdminBlogs(); setBlogs(data.blogs || []); } 
    catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog post?')) {
      try { await deleteBlog(id); setBlogs(blogs.filter(b => b._id !== id)); } 
      catch (error) { alert('Error deleting blog'); }
    }
  };

  const openModal = (blog = null) => {
    if (blog) {
      setCurrentBlog(blog);
      setFormData({ title: blog.title, excerpt: blog.excerpt, content: blog.content, category: blog.category, readTime: blog.readTime, isPublished: blog.isPublished, featuredImage: blog.featuredImage });
    } else {
      setCurrentBlog(null);
      setFormData({ title: '', excerpt: '', content: '', category: 'Manufacturing', readTime: 5, isPublished: true, featuredImage: null });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const imgData = new FormData();
    imgData.append('image', file);
    imgData.append('folder', 'blogs');
    try {
      const { data } = await uploadImage(imgData);
      setFormData(prev => ({ ...prev, featuredImage: { url: data.image.url, publicId: data.image.publicId } }));
    } catch (error) { alert('Image upload failed'); } finally { setUploadingImage(false); e.target.value = null; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (currentBlog) await updateBlog(currentBlog._id, formData);
      else await createBlog(formData);
      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) { alert(error.response?.data?.message || 'Failed to save'); } finally { setIsSubmitting(false); }
  };

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Blogs" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-heading">Blog Posts</h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 !py-2 !px-4"><HiPlus className="w-5 h-5" /> Write Post</button>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-cream-dark flex justify-between bg-white">
          <div className="relative w-full sm:w-72"><HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" /><input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pl-10 !py-2 text-sm" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-dark text-text-dark border-b border-cream-darker"><tr><th className="px-6 py-3 font-medium">Title</th><th className="px-6 py-3 font-medium">Category</th><th className="px-6 py-3 font-medium">Date</th><th className="px-6 py-3 font-medium">Status</th><th className="px-6 py-3 font-medium text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-cream-dark">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-cream-50 transition-colors bg-white">
                  <td className="px-6 py-4 font-medium text-primary line-clamp-1 max-w-xs">{blog.title}</td>
                  <td className="px-6 py-4 text-text">{blog.category}</td>
                  <td className="px-6 py-4 text-text">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{blog.isPublished ? <span className="flex items-center gap-1 text-success text-xs font-medium"><HiCheckCircle /> Published</span> : <span className="flex items-center gap-1 text-text-light text-xs font-medium"><HiXCircle /> Draft</span>}</td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => openModal(blog)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><HiPencilAlt className="w-5 h-5" /></button><button onClick={() => handleDelete(blog._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><HiTrash className="w-5 h-5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center"><h2 className="text-xl font-heading font-bold text-primary">{currentBlog ? 'Edit Post' : 'New Blog Post'}</h2><button onClick={() => !isSubmitting && setIsModalOpen(false)}><HiX className="w-6 h-6 text-text-light hover:text-text" /></button></div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="blogForm" onSubmit={handleSubmit} className="space-y-5">
                <div><label className="input-label">Title *</label><input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="input-field" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="input-label">Category</label><input type="text" name="category" value={formData.category} onChange={handleInputChange} className="input-field" placeholder="e.g. Manufacturing, Gifting" /></div>
                  <div><label className="input-label">Read Time (minutes)</label><input type="number" name="readTime" value={formData.readTime} onChange={handleInputChange} className="input-field" /></div>
                </div>
                <div><label className="input-label">Excerpt *</label><textarea name="excerpt" required rows={2} value={formData.excerpt} onChange={handleInputChange} className="input-field" maxLength={200}></textarea></div>
                <div><label className="input-label">Content (HTML allowed) *</label><textarea name="content" required rows={10} value={formData.content} onChange={handleInputChange} className="input-field font-mono text-sm"></textarea></div>
                
                <div>
                  <label className="input-label">Featured Image</label>
                  <div className="flex items-center gap-4">
                    {formData.featuredImage?.url && <img src={formData.featuredImage.url} alt="" className="w-24 h-16 rounded object-cover border border-cream-dark" />}
                    <div className="relative">
                      <button type="button" disabled={uploadingImage} className="btn-outline !py-2 !px-4 text-sm">{uploadingImage ? 'Uploading...' : 'Upload Image'}</button>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploadingImage} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" /><span className="text-sm font-medium text-text-dark">Publish this post</span></label>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t border-cream-dark bg-cream-50 flex justify-end gap-3"><button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="btn-outline !py-2 !px-4 text-sm">Cancel</button><button type="submit" form="blogForm" disabled={isSubmitting || uploadingImage} className="btn-primary !py-2 !px-6 text-sm">{isSubmitting ? 'Saving...' : 'Save Post'}</button></div>
          </div>
        </div>
      )}
    </>
  );
};
export default ManageBlogs;
