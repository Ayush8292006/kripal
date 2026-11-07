import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MobileNavBar } from '../components/layout/MobileNavBar';
import { CartDrawer } from '../components/cart/CartDrawer';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { SearchModal } from '../components/search/SearchModal';
import { FloatingWhatsApp } from '../components/common/FloatingWhatsApp';
import { IntroLoader } from '../components/common/IntroLoader';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-black selection:bg-blush-accent selection:text-brand-dark">
      {/* 1st Visit Intro Presentation */}
      <IntroLoader />

      {/* Rotating Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Header />

      {/* Page Content with soft page transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Native App Style Bottom Tab Bar on Mobile */}
      <MobileNavBar />

      {/* Flyout Modals & Floating Concierge */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <FloatingWhatsApp />
    </div>
  );
};

