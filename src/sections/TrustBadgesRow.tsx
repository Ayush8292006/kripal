import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  Award,
  RotateCcw,
  Truck,
  Lock,
  BadgeDollarSign,
} from 'lucide-react';
import { TRUST_BADGES } from '../data/config';

// Map icon names to lucide components
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Sparkles,
  Award,
  RotateCcw,
  Truck,
  Lock,
  BadgeDollarSign,
};

export const TrustBadgesRow: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF2F4]/70 border-y border-brand-border/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = iconMap[badge.icon] || ShieldCheck;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="flex flex-col items-center text-center p-3 sm:p-4 rounded-luxury bg-white/70 hover:bg-white border border-brand-border/60 hover:border-blush-accent/60 shadow-xs hover:shadow-card transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-blush-light text-blush-deep flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-brand-black leading-snug">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-brand-gray mt-1 leading-tight">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
