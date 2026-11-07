import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const METALS = [
  {
    name: 'Pure 925 Silver',
    tag: 'Certified Hallmark',
    query: '925+Sterling+Silver',
    gradient: 'from-[#FFFFFF] via-[#E8ECEF] to-[#BFC3C9]',
    border: 'border-[#BFC3C9]',
  },
  {
    name: '18K Gold Plated',
    tag: 'Warm Royal Glow',
    query: '18K+Gold+Plated',
    gradient: 'from-[#FFF3D6] via-[#EBD08B] to-[#C9A86A]',
    border: 'border-[#C9A86A]',
  },
  {
    name: 'Rose Gold Plated',
    tag: 'Blush Romance',
    query: 'Rose+Gold+Plated',
    gradient: 'from-[#FDF0F2] via-[#E8B4BC] to-[#B98A95]',
    border: 'border-[#B98A95]',
  },
  {
    name: 'Oxidised Silver',
    tag: 'Vintage Gujarati Patina',
    query: 'Oxidised+Silver',
    gradient: 'from-[#9B9DA2] via-[#4A4B4F] to-[#1E1E1E]',
    border: 'border-[#4A4B4F]',
    darkText: true,
  },
];

export const ShopByMetal: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-1.5 text-xs uppercase tracking-widest text-blush-deep font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Finishes</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal">
            Shop by Metal & Finish
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METALS.map((metal, idx) => (
            <motion.div
              key={metal.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <Link
                to={`/collections/all?metal=${metal.query}`}
                className="group flex flex-col items-center p-6 rounded-luxury bg-blush-light/60 hover:bg-white border border-brand-border/70 hover:border-blush-accent shadow-xs hover:shadow-luxury transition-all"
              >
                {/* Circular Metallic Swatch with shimmer */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${metal.gradient} shadow-card border-4 ${metal.border} mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                >
                  {/* Subtle shimmer sweep on hover */}
                  <div className="absolute inset-0 bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="text-xl">✨</span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-medium text-brand-black group-hover:text-blush-deep transition-colors">
                  {metal.name}
                </h3>
                <span className="text-xs text-brand-gray mt-1">{metal.tag}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

