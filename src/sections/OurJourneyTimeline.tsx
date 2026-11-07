import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Award, ShieldCheck } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    year: '1998',
    title: 'The Humble Beginning',
    subtitle: 'A small artisanal workshop in Rajkot',
    description: 'Founded with an uncompromising vow to purity, trust, and handcrafted mastery. Starting with fine silver utensils and authentic ornaments.',
    image: 'https://kripalsilver.com/uploads/timeline/1778934887_theBeg.png',
    icon: Calendar,
  },
  {
    year: '2008',
    title: 'Pioneering Hallmarking in Saurashtra',
    subtitle: 'Setting the gold standard for silver purity',
    description: 'Among the earliest jewellers in Gujarat to mandate certified 925 hallmarking for every single silver creation.',
    image: 'https://kripalsilver.com/uploads/timeline/1778934717_crafted.png',
    icon: ShieldCheck,
  },
  {
    year: '2018',
    title: 'The Contemporary Era',
    subtitle: 'Fusing heritage filigree with modern minimalism',
    description: 'Expanded collections into lightweight daily wear, office elegance, and luxury bridal sets for contemporary women and gentlemen.',
    image: 'https://kripalsilver.com/uploads/craftsmanship/1778935680_Handcrafted.png',
    icon: Award,
  },
  {
    year: 'Today',
    title: '25+ Years of Trust & Pan-India Deliveries',
    subtitle: '10,000+ Happy Families Across India',
    description: 'Delivering Rajkot silver craftsmanship directly to discerning patrons across the country with insured express dispatch.',
    image: 'https://kripalsilver.com/uploads/home-collections/1779194348_ca8.png',
    icon: Sparkles,
  },
];

export const OurJourneyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-14 sm:py-20 bg-[#FAF2F4]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-1.5 text-xs uppercase tracking-widest text-blush-deep font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Since 1998 · Rajkot, Gujarat</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal">
            Our Journey of 25+ Years
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray mt-2">
            From an artisan workbench to a hallmark of timeless silver elegance.
          </p>
        </div>

        {/* Timeline Grid / Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIMELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative rounded-luxury bg-white border border-brand-border/80 shadow-card overflow-hidden flex flex-col justify-between group hover:border-blush-accent transition-all"
              >
                {/* Year Pill Bar */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-3xl font-bold text-blush-deep">
                      {step.year}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blush-light flex items-center justify-center text-blush-deep">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-brand-black leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] font-medium text-blush-deep mt-0.5">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-brand-gray mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Historical Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-blush-light">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

