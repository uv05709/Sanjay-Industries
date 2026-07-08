import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../api';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageSettings = () => {
  const [formData, setFormData] = useState({
    siteName: 'Sanjay Industries', tagline: '', contactInfo: { email: '', phone: '', whatsapp: '', address: { street: '', city: '', state: '', pincode: '', country: '' } },
    workingHours: { weekdays: '', weekends: '' }, socialLinks: { facebook: '', instagram: '', youtube: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try { const { data } = await getSettings(); if (data.settings) setFormData(data.settings); } 
      catch (e) {} finally { setLoading(false); }
    })();
  }, []);

  const handleChange = (e, section, nestedSection) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (section && nestedSection) { return { ...prev, [section]: { ...prev[section], [nestedSection]: { ...prev[section][nestedSection], [name]: value } } }; }
      if (section) { return { ...prev, [section]: { ...prev[section], [name]: value } }; }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await updateSettings(formData); alert('Settings updated successfully'); } 
    catch (e) { alert('Failed to update settings'); } finally { setSaving(false); }
  };

  if (loading) return <Loader />;

  return (
    <>
      <SEOHead title="Site Settings" />
      <h1 className="text-2xl font-bold text-primary font-heading mb-6">Site Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-primary mb-4 border-b border-cream-dark pb-2">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="input-label">Site Name</label><input type="text" name="siteName" value={formData.siteName} onChange={(e) => handleChange(e)} className="input-field" /></div>
            <div><label className="input-label">Tagline</label><input type="text" name="tagline" value={formData.tagline} onChange={(e) => handleChange(e)} className="input-field" /></div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-primary mb-4 border-b border-cream-dark pb-2">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><label className="input-label">Email</label><input type="email" name="email" value={formData.contactInfo.email} onChange={(e) => handleChange(e, 'contactInfo')} className="input-field" /></div>
            <div><label className="input-label">Phone</label><input type="text" name="phone" value={formData.contactInfo.phone} onChange={(e) => handleChange(e, 'contactInfo')} className="input-field" /></div>
            <div><label className="input-label">WhatsApp Number</label><input type="text" name="whatsapp" value={formData.contactInfo.whatsapp} onChange={(e) => handleChange(e, 'contactInfo')} className="input-field" placeholder="e.g. 919876543210" /></div>
          </div>
          <h3 className="font-medium text-sm text-primary mt-4 mb-2">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><label className="input-label">Street</label><input type="text" name="street" value={formData.contactInfo.address.street} onChange={(e) => handleChange(e, 'contactInfo', 'address')} className="input-field" /></div>
            <div><label className="input-label">City</label><input type="text" name="city" value={formData.contactInfo.address.city} onChange={(e) => handleChange(e, 'contactInfo', 'address')} className="input-field" /></div>
            <div><label className="input-label">State</label><input type="text" name="state" value={formData.contactInfo.address.state} onChange={(e) => handleChange(e, 'contactInfo', 'address')} className="input-field" /></div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-primary mb-4 border-b border-cream-dark pb-2">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="input-label">Facebook</label><input type="url" name="facebook" value={formData.socialLinks.facebook} onChange={(e) => handleChange(e, 'socialLinks')} className="input-field" /></div>
            <div><label className="input-label">Instagram</label><input type="url" name="instagram" value={formData.socialLinks.instagram} onChange={(e) => handleChange(e, 'socialLinks')} className="input-field" /></div>
            <div><label className="input-label">YouTube</label><input type="url" name="youtube" value={formData.socialLinks.youtube} onChange={(e) => handleChange(e, 'socialLinks')} className="input-field" /></div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save All Settings'}</button>
      </form>
    </>
  );
};
export default ManageSettings;
