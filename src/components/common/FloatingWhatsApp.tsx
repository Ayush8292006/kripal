import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'Hello Kripal Jewellers! I am interested in your pure 925 silver jewellery and would love some assistance.'
  );

  return (
    <div className="fixed bottom-20 md:bottom-7 right-4 md:right-7 z-[70] flex items-center">
      {/* Mini Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden sm:flex items-center space-x-2 mr-3 px-3 py-1.5 rounded-full bg-white shadow-card border border-blush-accent/30 text-xs font-medium text-brand-dark"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1" />
            <span>Chat on WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={`${BRAND_CONFIG.whatsappUrl}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp with Kripal Jewellers"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-float hover:shadow-lg transition-transform focus:outline-none"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </motion.a>
    </div>
  );
};

