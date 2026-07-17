import { useState, useEffect } from 'react';
import { getSettings, updateSettings, updatePassword } from '../../api';
import { HiKey, HiCheckCircle, HiEye, HiEyeOff } from 'react-icons/hi';
import SEOHead from '../../components/common/SEOHead';
import Loader from '../../components/common/Loader';

const ManageSettings = () => {
  const [formData, setFormData] = useState({
    siteName: 'Sanjay Industries', tagline: '', contactInfo: { email: '', phone: '', whatsapp: '', address: { street: '', city: '', state: '', pincode: '', country: '' } },
    workingHours: { weekdays: '', weekends: '' }, socialLinks: { facebook: '', instagram: '', youtube: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Password change state
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

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
    setSettingsSaved(false);
    try {
      await updateSettings(formData);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (e) { alert('Failed to update settings'); } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordStatus({ type: '', message: '' });

    if (passwordData.newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'New password must be at least 6 characters' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordStatus({ type: 'error', message: 'New password must be different from current password' });
      return;
    }

    setChangingPassword(true);
    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordStatus({ type: 'success', message: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordStatus({ type: '', message: '' }), 5000);
    } catch (error) {
      setPasswordStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to change password',
      });
    } finally {
      setChangingPassword(false);
    }
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
            <div>
              <label className="input-label">WhatsApp Number</label>
              <input type="text" name="whatsapp" value={formData.contactInfo.whatsapp} onChange={(e) => handleChange(e, 'contactInfo')} className="input-field" placeholder="e.g. 917052409115" />
              <p className="text-xs text-text-light mt-1">Digits only with country code (e.g. 917052409115)</p>
            </div>
          </div>
          <h3 className="font-medium text-sm text-primary mt-4 mb-2">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><label className="input-label">Street</label><input type="text" name="street" value={formData.contactInfo.address.street} onChange={(e) => handleChange(e, 'contactInfo', 'address')} className="input-field" /></div>
            <div><label className="input-label">City</label><input type="text" name="city" value={formData.contactInfo.address.city} onChange={(e) => handleChange(e, 'contactInfo', 'address')} className="input-field" /></div>
            <div><label className="input-label">State</label><input type="text" name="state" value={formData.contactInfo.address.state} onChange={(e) => handleChange(e, 'contactInfo', 'address')} className="input-field" /></div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-primary mb-4 border-b border-cream-dark pb-2">Working Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="input-label">Weekdays</label><input type="text" name="weekdays" value={formData.workingHours?.weekdays || ''} onChange={(e) => handleChange(e, 'workingHours')} className="input-field" placeholder="Mon–Sat: 9:00 AM – 7:00 PM" /></div>
            <div><label className="input-label">Weekends</label><input type="text" name="weekends" value={formData.workingHours?.weekends || ''} onChange={(e) => handleChange(e, 'workingHours')} className="input-field" placeholder="Sunday: Closed" /></div>
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

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save All Settings'}</button>
          {settingsSaved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium animate-fade-in">
              <HiCheckCircle className="w-5 h-5" /> Saved successfully
            </span>
          )}
        </div>
      </form>

      {/* Password Change Section */}
      <div className="max-w-4xl mt-10">
        <div className="card p-6 border-2 border-cream-dark">
          <div className="flex items-center gap-2 mb-4 border-b border-cream-dark pb-2">
            <HiKey className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="input-label">Current Password *</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="input-field pr-10"
                    required
                    placeholder="Enter current password"
                  />
                  <button type="button" onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors">
                    {showPasswords.current ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="input-label">New Password *</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="input-field pr-10"
                    required
                    minLength={6}
                    placeholder="Min 6 characters"
                  />
                  <button type="button" onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors">
                    {showPasswords.new ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="input-label">Confirm New Password *</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="input-field pr-10"
                    required
                    minLength={6}
                    placeholder="Repeat new password"
                  />
                  <button type="button" onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors">
                    {showPasswords.confirm ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {passwordStatus.message && (
              <div className={`text-sm px-4 py-2.5 rounded-md ${passwordStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {passwordStatus.message}
              </div>
            )}

            <button type="submit" disabled={changingPassword} className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50">
              {changingPassword ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ManageSettings;
