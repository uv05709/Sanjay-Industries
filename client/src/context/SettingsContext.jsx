import { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '../api';

const SettingsContext = createContext(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  // Return safe defaults if context is not available yet
  if (!context) {
    return {
      settings: {
        siteName: 'Sanjay Industries',
        tagline: '',
        contactInfo: {
          email: 'info@sanjayindustries.com',
          phone: '',
          whatsapp: '',
          address: { street: '', city: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001', country: 'India' },
        },
        socialLinks: { facebook: '', instagram: '', youtube: '', linkedin: '', twitter: '', pinterest: '' },
        workingHours: { weekdays: 'Mon–Sat: 9:00 AM – 7:00 PM', weekends: 'Sunday: Closed' },
      },
      loading: true,
    };
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: 'Sanjay Industries',
    tagline: 'Handcrafted Wooden Sindhora & Traditional Handicrafts',
    contactInfo: {
      email: 'info@sanjayindustries.com',
      phone: '',
      whatsapp: '',
      address: { street: '', city: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001', country: 'India' },
    },
    socialLinks: { facebook: '', instagram: '', youtube: '', linkedin: '', twitter: '', pinterest: '' },
    workingHours: { weekdays: 'Mon–Sat: 9:00 AM – 7:00 PM', weekends: 'Sunday: Closed' },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await getSettings();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        // Silently fail — use defaults
        console.error('Failed to load settings:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
