import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { STATS } from '../data/config';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Craftsmanship Image with Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-luxury-lg overflow-hidden shadow-float border border-brand-border bg-blush-light aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://kripalsilver.com/uploads/craftsmanship/1778935680_Handcrafted.png"
                alt="Master Silver Craftsmanship in Rajkot"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -right-3 sm:-bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-luxury p-4 sm:p-5 shadow-float border border-blush-accent/50 max-w-xs flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blush-light flex items-center justify-center text-blush-deep shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-brand-black">
                  100% Certified 925
                </p>
                <p className="text-[11px] text-brand-gray">
                  Every gram hallmarked with laser seal authentication
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative & Counter Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blush-light text-blush-deep text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rajkot Artisanal Heritage</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal leading-tight">
                Crafted with Soul, Preserved for Generations
              </h2>
            </div>

            <p className="text-xs sm:text-base text-brand-gray leading-relaxed">
              In Rajkot, silver craftsmanship is not simply an occupation — it is an inherited spiritual devotion. For over 25 years, our master silversmiths have honed microscopic stone settings, filigree contours, and mirror-grade polish that resist everyday tarnish.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-brand-dark">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pure solid 925 sterling silver cores, free from nickel or lead</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Triple-layer electroplating with genuine rhodium & 18K yellow gold</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hand-inspected under 10x magnification before gifting dispatch</span>
              </li>
            </ul>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-brand-border">
              {STATS.map((st, i) => (
                <div key={i} className="text-center sm:text-left">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-blush-deep block">
                    {st.value}
                  </span>
                  <span className="text-[11px] text-brand-gray font-medium">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
