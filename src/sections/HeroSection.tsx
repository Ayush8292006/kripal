import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Timeless Elegance, Pure 925 Silver',
    tagline: 'HANDCRAFTED IN RAJKOT SINCE 1998',
    description: 'Immerse yourself in authentic hallmarked sterling silver, delicately shaped to celebrate your everyday and milestone moments.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85',
    ctaPrimary: 'Shop Bestsellers',
    ctaPrimaryLink: '/collections/all?tags=Bestseller',
    ctaSecondary: 'Explore Collections',
    ctaSecondaryLink: '/collections/all',
  },
  {
    id: 2,
    title: 'Modern Mangalsutra & Bridal Sets',
    tagline: 'SACRED HERITAGE MEETS REFINED MINIMALISM',
    description: 'Exquisite designs that balance traditional Gujarati craftsmanship with contemporary lightweight silhouettes.',
    image: 'https://kripalsilver.com/uploads/home-collections/1779194348_ca8.png',
    ctaPrimary: 'View Bridal Sets',
    ctaPrimaryLink: '/collections/jewellery-sets',
    ctaSecondary: 'Shop Mangalsutra',
    ctaSecondaryLink: '/collections/mangalsutra',
  },
  {
    id: 3,
    title: 'Thoughtful Silver Gifts for Her & Him',
    tagline: 'COMPLIMENTARY VELVET PACKAGING INCLUDED',
    description: 'Curated keepsakes designed to make your loved ones feel cherished, with free insured delivery across India.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=85',
    ctaPrimary: 'Gifting Concierge',
    ctaPrimaryLink: '/gifting',
    ctaSecondary: 'Shop by Price',
    ctaSecondaryLink: '/collections/all',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[580px] sm:h-[640px] lg:h-[720px] overflow-hidden bg-blush-soft select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Ken-Burns Zooming Background Image */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.88]"
            />
          </motion.div>

          {/* Soft blush & luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent md:to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Hero Content Box */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl lg:max-w-2xl"
            >
              {/* Tagline Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-blush-accent mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.tagline}</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight mb-4 drop-shadow-sm">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-light mb-8 max-w-lg">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={slide.ctaPrimaryLink}
                  className="px-7 py-3.5 rounded-luxury bg-white text-brand-black text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-blush-accent hover:text-white active:scale-97 transition-all shadow-float flex items-center space-x-2 shimmer-sweep"
                >
                  <span>{slide.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={slide.ctaSecondaryLink}
                  className="px-6 py-3.5 rounded-luxury bg-white/10 backdrop-blur-md text-white border border-white/40 text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-white/20 active:scale-97 transition-all"
                >
                  {slide.ctaSecondary}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Arrows */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-20 items-center space-x-3">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 z-20 flex space-x-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'w-8 bg-blush-accent' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

