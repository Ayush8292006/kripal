import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF2F4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-blush-deep font-semibold flex items-center mb-1">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Handcrafted Showcases
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/collections/all"
            className="text-xs sm:text-sm font-semibold text-brand-dark hover:text-blush-deep flex items-center space-x-1 mt-2 sm:mt-0 transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Large Spotlight (Pendant Sets) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group relative rounded-luxury overflow-hidden bg-white shadow-card min-h-[360px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10"
          >
            <img
              src="https://kripalsilver.com/assets/images/indexpage-1.png"
              alt="Pendant Set Under Budget"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 text-white max-w-md">
              <span className="px-3 py-1 rounded-full bg-blush-accent text-brand-dark text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-3 inline-block">
                Under Budget
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-2 leading-tight">
                Pendant Sets & Solitaires
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 mb-5 leading-relaxed line-clamp-2">
                Pure 925 sterling silver chains accompanied by dazzling micro-pave pendants designed for effortless grace.
              </p>
              <Link
                to="/collections/pendant-sets"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-luxury bg-white text-brand-dark text-xs font-semibold uppercase tracking-wider hover:bg-blush-accent hover:text-white transition-all shadow-md"
              >
                <span>Shop Pendant Sets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column with 2 Stacked Bento Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 2: Stunning Every Ear */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-luxury overflow-hidden bg-white shadow-card min-h-[210px] flex flex-col justify-end p-6"
            >
              <img
                src="https://kripalsilver.com/uploads/home-collections/1779194336_ca7.png"
                alt="Stunning Every Ear"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blush-accent">
                  Latest Launch
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-medium mb-2">
                  Stunning Every Ear
                </h4>
                <Link
                  to="/collections/earrings"
                  className="text-xs font-semibold uppercase tracking-wider text-white hover:text-blush-accent transition-colors inline-flex items-center"
                >
                  <span>Explore Drops & Studs</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: 18Kt Jewellery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative rounded-luxury overflow-hidden bg-white shadow-card min-h-[210px] flex flex-col justify-end p-6"
            >
              <img
                src="https://kripalsilver.com/uploads/home-collections/1779194348_ca8.png"
                alt="18Kt Jewellery Sets"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Premium Quality
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-medium mb-2">
                  18Kt Gold Plated Ensembles
                </h4>
                <Link
                  to="/collections/jewellery-sets"
                  className="text-xs font-semibold uppercase tracking-wider text-white hover:text-blush-accent transition-colors inline-flex items-center"
                >
                  <span>Explore Heirloom Sets</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

