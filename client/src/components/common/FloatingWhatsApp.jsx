import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiX, HiClock, HiCheck } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { useLocation } from 'react-router-dom';

const quickActions = [
  {
    label: '📦 Product Enquiry',
    message: 'Hi Sanjay Industries! I am interested in your wooden handicraft products. Could you please share your latest catalogue and wholesale pricing?',
  },
  {
    label: '🏭 Bulk Order',
    message: 'Hello! I would like to place a bulk order for wooden products. Please share MOQ details, bulk pricing, and delivery timelines.',
  },
  {
    label: '🤝 Become a Dealer',
    message: 'Hi! I am interested in becoming a dealer/distributor for Sanjay Industries products in my area. Please share the dealer registration process and terms.',
  },
  {
    label: '💬 General Query',
    message: 'Hello Sanjay Industries! I have a query regarding your products. Can you please help?',
  },
];

const FloatingWhatsApp = () => {
  const { settings } = useSettings();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  const phoneNumber = settings.contactInfo?.whatsapp || settings.contactInfo?.phone?.replace(/[^0-9]/g, '') || '917052409115';
  const businessName = settings.siteName || 'Sanjay Industries';
  const weekdays = settings.workingHours?.weekdays || 'Mon–Sat: 9:00 AM – 7:00 PM';

  // Auto-hide pulse after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Close popup on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleQuickAction = (message) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 left-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.15)' }}
          >
            {/* Header */}
            <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm truncate">{businessName}</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-white/70 text-xs">Typically replies within minutes</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="bg-[#ECE5DD] px-4 py-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4cdc4\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
              {/* Welcome Bubble */}
              <div className="max-w-[85%]">
                <div className="bg-white rounded-xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <p className="text-[13px] text-gray-800 leading-relaxed">
                    👋 Namaste! Welcome to <strong>{businessName}</strong>.
                  </p>
                  <p className="text-[13px] text-gray-800 leading-relaxed mt-1.5">
                    We are manufacturers & wholesale suppliers of handcrafted wooden products from Varanasi.
                  </p>
                  <p className="text-[13px] text-gray-800 leading-relaxed mt-1.5">
                    How can we help you today? 👇
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1.5">
                    <span className="text-[10px] text-gray-400">now</span>
                    <HiCheck className="w-3 h-3 text-[#53bdeb]" />
                    <HiCheck className="w-3 h-3 text-[#53bdeb] -ml-1.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="bg-white px-4 py-3 space-y-2 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-2">Quick Actions</p>
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action.message)}
                  className="w-full text-left px-3.5 py-2.5 text-[13px] rounded-lg border border-[#25D366]/30 text-[#075E54] font-medium hover:bg-[#25D366]/5 hover:border-[#25D366]/50 transition-all duration-200 active:scale-[0.98]"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-1.5 border-t border-gray-100">
              <HiClock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[11px] text-gray-400">{weekdays}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        aria-label="Chat on WhatsApp"
        style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <HiX className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="whatsapp" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FaWhatsapp className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] text-white font-bold flex items-center justify-center">1</span>
          </>
        )}
      </motion.button>
    </>
  );
};

export default FloatingWhatsApp;
