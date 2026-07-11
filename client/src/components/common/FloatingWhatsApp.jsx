import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

const FloatingWhatsApp = () => {
  const { settings } = useSettings();
  const phoneNumber = settings.contactInfo?.whatsapp || settings.contactInfo?.phone?.replace(/[^0-9]/g, '') || '';
  const message = encodeURIComponent('Hello Sanjay Industries, I am interested in your wooden products. Please share details.');

  // Don't render if no phone number is configured
  if (!phoneNumber) return null;

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <FaWhatsapp className="w-6 h-6" />
      </div>
      <span className="hidden md:inline-block pr-5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
