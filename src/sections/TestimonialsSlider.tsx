import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Riya Shah',
    collection: 'Bride Collection',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    quote: 'I wore the 18Kt Royal Empress set for my wedding reception. The craftsmanship is breathtaking — nobody could believe it was pure 925 sterling silver instead of heavy gold! Light, radiant, and the velvet box was so royal.',
    verified: true,
  },
  {
    id: 2,
    name: 'Khushi Mehta',
    collection: 'Diamond Jewellery & Pendant Sets',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    quote: 'The Aura Halo pendant sparkles just like genuine high-grade solitaires. I wear it to office meetings and family dinners alike. Delivery to Mumbai was completed in just 2 days. 100% genuine silver hallmark!',
    verified: true,
  },
  {
    id: 3,
    name: 'Nehal Patel',
    collection: 'Wedding & Bridal Mangalsutra',
    location: 'Rajkot, Gujarat',
    rating: 5,
    quote: 'Being from Rajkot, my family has trusted Kripal Jewellers for more than two decades. Their purity is uncompromised and the modern designs fit the contemporary Gujarati woman so gracefully.',
    verified: true,
  },
];

export const TestimonialsSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const item = TESTIMONIALS[current];

  return (
    <section className="py-14 sm:py-20 bg-white select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-full bg-blush-light text-blush-deep flex items-center justify-center mx-auto mb-4">
          <Quote className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal mb-8">
          Words from Our Cherished Patrons
        </h2>

        {/* Carousel Window */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl px-4"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center space-x-1 text-amber-400 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-lg sm:text-2xl text-brand-black italic font-normal leading-relaxed mb-6">
                "{item.quote}"
              </blockquote>

              {/* Customer Credential */}
              <div>
                <h4 className="font-sans text-sm sm:text-base font-semibold text-brand-black flex items-center justify-center space-x-1.5">
                  <span>{item.name}</span>
                  {item.verified && (
                    <span className="inline-flex items-center text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle2 className="w-3 h-3 mr-0.5" />
                      Verified Purchase
                    </span>
                  )}
                </h4>
                <p className="text-xs text-blush-deep font-medium mt-0.5">
                  {item.collection} · {item.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-blush-light active:scale-95 transition-all"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex space-x-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-blush-deep' : 'w-2 bg-brand-border'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-blush-light active:scale-95 transition-all"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

