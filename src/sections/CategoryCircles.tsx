import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES_CONFIG } from '../data/products';

export const CategoryCircles: React.FC = () => {
  return (
    <section className="py-6 sm:py-10 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scroll container for mobile, flex grid for desktop */}
        <div className="flex items-center space-x-4 sm:space-x-8 overflow-x-auto no-scrollbar py-2 px-1 justify-start md:justify-center">
          {CATEGORIES_CONFIG.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="shrink-0 flex flex-col items-center group cursor-pointer"
            >
              <Link
                to={`/collections/${cat.id}`}
                className="flex flex-col items-center group focus:outline-none"
              >
                {/* Outer Ring with Glow Effect on Hover/Tap */}
                <div className="relative p-1 rounded-full border-2 border-blush-accent/40 group-hover:border-blush-deep group-hover:shadow-soft group-active:scale-95 transition-all duration-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-blush-light p-0.5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Little Shimmer Dot */}
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-blush-accent border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Category Label */}
                <span className="mt-2 text-xs sm:text-sm font-medium text-brand-black group-hover:text-blush-deep transition-colors tracking-wide text-center">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
