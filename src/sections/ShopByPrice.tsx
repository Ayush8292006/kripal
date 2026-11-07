import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const PRICE_TIERS = [
  { label: 'Under ₹999', query: 'maxPrice=999', desc: 'Everyday Little Luxuries' },
  { label: '₹999 – ₹1,999', query: 'minPrice=999&maxPrice=1999', desc: 'Trending Sterling Silver' },
  { label: '₹2,000 – ₹4,999', query: 'minPrice=2000&maxPrice=4999', desc: 'Pendant & Bridal Sets' },
  { label: '₹5,000 & Above', query: 'minPrice=5000', desc: 'Solid Kadas & Heirlooms' },
];

export const ShopByPrice: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-1.5 text-xs uppercase tracking-widest text-blush-deep font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated For Every Budget</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-black font-normal">
            Shop by Price
          </h2>
        </div>

        {/* Responsive Pill Chips Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {PRICE_TIERS.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <Link
                to={`/collections/all?${tier.query}`}
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-luxury bg-blush-light/80 hover:bg-white border border-brand-border/80 hover:border-blush-accent shadow-xs hover:shadow-luxury transition-all text-center"
              >
                <span className="font-serif text-lg sm:text-xl font-semibold text-brand-black group-hover:text-blush-deep transition-colors">
                  {tier.label}
                </span>
                <span className="text-[11px] sm:text-xs text-brand-gray mt-1">
                  {tier.desc}
                </span>

                <div className="mt-3 flex items-center text-xs font-semibold text-blush-deep opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

