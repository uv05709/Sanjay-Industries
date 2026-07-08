import { useState, useEffect } from 'react';
import { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../api';
import { HiPlus, HiPencilAlt, HiTrash, HiX } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [formData, setFormData] = useState({ name: '', company: '', designation: '', location: '', content: '', rating: 5, isActive: true, order: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchTestimonials(); }, []);
  const fetchTestimonials = async () => {
    setLoading(true);
    try { const { data } = await getAdminTestimonials(); setTestimonials(data.testimonials || []); } 
    catch (e) {} finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      try { await deleteTestimonial(id); setTestimonials(testimonials.filter(t => t._id !== id)); } catch (e) {}
    }
  };

  const openModal = (t = null) => {
    if (t) { setCurrentTestimonial(t); setFormData({ name: t.name, company: t.company, designation: t.designation, location: t.location, content: t.content, rating: t.rating, isActive: t.isActive, order: t.order || 0 }); } 
    else { setCurrentTestimonial(null); setFormData({ name: '', company: '', designation: '', location: '', content: '', rating: 5, isActive: true, order: testimonials.length + 1 }); }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (currentTestimonial) await updateTestimonial(currentTestimonial._id, formData);
      else await createTestimonial(formData);
      setIsModalOpen(false); fetchTestimonials();
    } catch (e) { alert('Failed to save'); } finally { setIsSubmitting(false); }
  };

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Manage Testimonials" />
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-primary font-heading">Testimonials</h1><button onClick={() => openModal()} className="btn-primary flex items-center gap-2 !py-2 !px-4"><HiPlus className="w-5 h-5" /> Add Testimonial</button></div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-dark text-text-dark border-b border-cream-darker"><tr><th className="px-6 py-3 font-medium">Name / Company</th><th className="px-6 py-3 font-medium">Rating</th><th className="px-6 py-3 font-medium">Status</th><th className="px-6 py-3 font-medium text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-cream-dark">
              {testimonials.map((t) => (
                <tr key={t._id} className="hover:bg-cream-50 transition-colors bg-white">
                  <td className="px-6 py-4"><div className="font-medium text-primary">{t.name}</div><div className="text-text-light text-xs">{t.company}</div></td>
                  <td className="px-6 py-4 text-accent">{'★'.repeat(t.rating)}</td>
                  <td className="px-6 py-4">{t.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => openModal(t)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><HiPencilAlt className="w-5 h-5" /></button><button onClick={() => handleDelete(t._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><HiTrash className="w-5 h-5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative z-10">
            <div className="px-6 py-4 border-b border-cream-dark flex justify-between items-center"><h2 className="text-xl font-heading font-bold text-primary">{currentTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2><button onClick={() => setIsModalOpen(false)}><HiX className="w-6 h-6" /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4"><div><label className="input-label">Name *</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="input-field" /></div><div><label className="input-label">Company</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} className="input-field" /></div></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="input-label">Location</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} className="input-field" /></div><div><label className="input-label">Rating (1-5)</label><input type="number" min="1" max="5" name="rating" value={formData.rating} onChange={handleInputChange} className="input-field" /></div></div>
              <div><label className="input-label">Testimonial Content *</label><textarea name="content" required rows={4} value={formData.content} onChange={handleInputChange} className="input-field"></textarea></div>
              <div className="flex items-center gap-2"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4" /><label className="text-sm">Active (Show on website)</label></div>
              <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline !py-2 !px-4 text-sm">Cancel</button><button type="submit" disabled={isSubmitting} className="btn-primary !py-2 !px-6 text-sm">{isSubmitting ? 'Saving...' : 'Save'}</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ManageTestimonials;
