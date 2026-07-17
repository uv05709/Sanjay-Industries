import { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '../api';

const WHATSAPP_NUMBER = '917052409115';
const PHONE_NUMBER = '+91-7052409115';

const defaultSettings = {
  siteName: 'Sanjay Industries',
  tagline: 'Handcrafted Wooden Sindhora & Traditional Handicrafts',
  contactInfo: {
    email: 'info@sanjayindustries.com',
    phone: PHONE_NUMBER,
    whatsapp: WHATSAPP_NUMBER,
    address: { street: '', city: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001', country: 'India' },
  },
  socialLinks: { facebook: '', instagram: '', youtube: '', linkedin: '', twitter: '', pinterest: '' },
  workingHours: { weekdays: 'Mon–Sat: 9:00 AM – 7:00 PM', weekends: 'Sunday: Closed' },
};

const SettingsContext = createContext(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    return { settings: defaultSettings, loading: true };
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await getSettings();
        if (data.success && data.settings) {
          // Merge with defaults to ensure whatsapp always has a value
          const merged = {
            ...defaultSettings,
            ...data.settings,
            contactInfo: {
              ...defaultSettings.contactInfo,
              ...data.settings.contactInfo,
              address: {
                ...defaultSettings.contactInfo.address,
                ...(data.settings.contactInfo?.address || {}),
              },
            },
            socialLinks: {
              ...defaultSettings.socialLinks,
              ...(data.settings.socialLinks || {}),
            },
            workingHours: {
              ...defaultSettings.workingHours,
              ...(data.settings.workingHours || {}),
            },
          };
          setSettings(merged);
        }
      } catch (error) {
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
