import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG, STATS } from '../data/config';
import { OurJourneyTimeline } from '../sections/OurJourneyTimeline';
import { CraftsmanshipSection } from '../sections/CraftsmanshipSection';
import { TrustBadgesRow } from '../sections/TrustBadgesRow';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative py-16 sm:py-24 bg-[#FAF2F4] text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white shadow-xs border border-blush-accent/40 text-xs font-semibold uppercase tracking-wider text-blush-deep mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Since 1998 · Rajkot, Gujarat</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-black mb-4 leading-tight">
            25+ Years of Purity, Trust & Handcrafted Excellence
          </h1>
          <p className="text-xs sm:text-base text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Where Gujarati heritage meets contemporary refinement. Discover how a small artisan workbench grew into one of Saurashtra's most cherished sterling silver houses.
          </p>
        </div>
      </div>

      {/* Story Narrative */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl text-brand-black mb-4">
              Rooted in Rajkot, Celebrated Across India
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-brand-gray leading-relaxed">
              <p>
                In 1998, Kripal Jewellers (Kripal Silver) opened its modest doors in Rajkot with a steadfast conviction: fine jewellery must represent pure integrity, enduring beauty, and unmatched craftsmanship.
              </p>
              <p>
                Rajkot has long been celebrated as the silver capital of western India. Our master silversmiths inherit generation-old secrets of filigree wirework, invisible gemstone pronging, and anti-tarnish rhodium balancing.
              </p>
              <p>
                Today, under the guidance of Shri Vipul Ajani and family, Kripal Jewellers stands tall with 25+ years of trust, delivering certified 925 hallmarked jewellery to over 10,000 delighted patrons across the subcontinent.
              </p>
            </div>
          </div>

          <div className="rounded-luxury overflow-hidden shadow-float bg-blush-light aspect-[4/3]">
            <img
              src="https://kripalsilver.com/uploads/craftsmanship/1778935680_Handcrafted.png"
              alt="Crafting silver jewellery at Kripal Jewellers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <OurJourneyTimeline />

      {/* Craftsmanship Section */}
      <CraftsmanshipSection />

      {/* Trust Badges */}
      <TrustBadgesRow />
    </div>
  );
};

