import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ShopForSplit: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shop for Her */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/collections/all?gender=Women"
              className="group relative rounded-luxury overflow-hidden bg-blush-light shadow-card block aspect-[16/10] sm:aspect-[16/9]"
            >
              <img
                src="https://kripalsilver.com/assets/images/Shop%20for%20her.png"
                alt="Shop for Her"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white">
                <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-blush-accent mb-1">
                  Elegance & Grace
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-3">
                  Shop For Her
                </h3>
                <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-luxury bg-white text-brand-dark text-xs font-semibold uppercase tracking-wider hover:bg-blush-accent hover:text-white transition-all shadow-md w-fit">
                  <span>Explore Women's</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Shop for Him */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/collections/mens"
              className="group relative rounded-luxury overflow-hidden bg-blush-light shadow-card block aspect-[16/10] sm:aspect-[16/9]"
            >
              <img
                src="https://kripalsilver.com/assets/images/Shop%20for%20him.png"
                alt="Shop for Him"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white">
                <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-gray-300 mb-1">
                  Bold & Sovereign
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-3">
                  Shop For Him
                </h3>
                <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-luxury bg-white text-brand-dark text-xs font-semibold uppercase tracking-wider hover:bg-blush-accent hover:text-white transition-all shadow-md w-fit">
                  <span>Explore Men's</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

