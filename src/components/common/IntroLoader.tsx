import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // Check session storage
    if (typeof window !== 'undefined') {
      const shown = sessionStorage.getItem('kripal_intro_shown');
      return !shown;
    }
    return false;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (!isVisible) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      handleDismiss();
    }, 2500);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleDismiss = () => {
    sessionStorage.setItem('kripal_intro_shown', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  const tagline = "Timeless Elegance · Since 1998";

  // Generate lightweight random sparkles
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${15 + (i * 7) % 75}%`,
    delay: (i * 0.2) % 1.5,
    size: 8 + (i % 3) * 6,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0, transition: { duration: 0.4 } }
              : { y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
          }
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5F7] via-[#FDF0F2] to-[#F7E6E9] select-none overflow-hidden"
          role="dialog"
          aria-label="Kripal Jewellers Welcome Presentation"
        >
          {/* Skip Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-brand-gray border border-blush-accent/40 bg-white/70 backdrop-blur-md hover:bg-white transition-all active:scale-95 shadow-sm"
          >
            Skip Intro
          </button>

          {/* Floating Sparkle Particles */}
          {!prefersReducedMotion &&
            sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                initial={{ opacity: 0, y: 40, scale: 0.4 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: -100,
                  scale: [0.4, 1.2, 0.4],
                }}
                transition={{
                  duration: 2.2,
                  delay: sp.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ left: sp.left, top: `${50 + (sp.id % 4) * 10}%` }}
                className="absolute pointer-events-none text-blush-accent"
              >
                <Sparkles size={sp.size} />
              </motion.div>
            ))}

          {/* Center Brand Identity Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Logo with shimmer sweep */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative p-3 rounded-2xl bg-white shadow-soft border border-blush-accent/30 overflow-hidden mb-5"
            >
              <img
                src={BRAND_CONFIG.logo}
                alt="Kripal Jewellers Logo"
                className="w-24 h-24 object-contain rounded-xl"
              />
              {/* Shimmer sweep line */}
              {!prefersReducedMotion && (
                <motion.div
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 1.4, delay: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 pointer-events-none"
                />
              )}
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-3xl sm:text-4xl text-brand-black tracking-wide font-normal mb-2"
            >
              {BRAND_CONFIG.name}
            </motion.h1>

            {/* Sub-tagline Letter-by-letter Animation */}
            <div className="flex items-center justify-center space-x-[2px] overflow-hidden text-xs sm:text-sm tracking-[0.25em] text-blush-deep uppercase font-medium mt-1">
              {tagline.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.7 + index * 0.035,
                    ease: 'easeOut',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            {/* Hallmark 925 Pure Silver Mini Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="mt-6 flex items-center space-x-2 px-3 py-1 rounded-full silver-925-badge text-[11px] font-semibold tracking-wider text-brand-dark uppercase border border-silver-badge/60"
            >
              <span>✦</span>
              <span>Rajkot · Pure 925 Hallmarked Silver</span>
              <span>✦</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

