import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Sparkles, ArrowRight, Heart } from 'lucide-react';

const RECIPIENTS = [
  { name: 'Wife', tag: 'Romance & Solitaires', link: '/gifting?recipient=wife', icon: '💍' },
  { name: 'Sister', tag: 'Trendy Chic Charms', link: '/gifting?recipient=sister', icon: '✨' },
  { name: 'Mother', tag: 'Graceful Traditional Pearls', link: '/gifting?recipient=mother', icon: '🌸' },
  { name: 'Best Friend', tag: 'Delicate Minimalists', link: '/gifting?recipient=friend', icon: '💖' },
  { name: 'Him', tag: 'Bold Kadas & Chains', link: '/gifting?recipient=him', icon: '⚡' },
];

const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Rakhi',
  'Diwali',
  'Milestone Success',
];

export const GiftingSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with Gift Box Context */}
        <div className="rounded-luxury-lg bg-gradient-to-r from-[#FDF0F2] via-[#FAF2F4] to-[#F5E6E8] p-6 sm:p-12 border border-brand-border/80 shadow-soft">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white shadow-xs border border-blush-accent/40 text-[11px] font-semibold uppercase tracking-wider text-blush-deep mb-3">
              <Gift className="w-3.5 h-3.5" />
              <span>Kripal Gifting Concierge</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-brand-black font-normal mb-3">
              Gifts That Speak What Words Cannot
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Every piece arrives in our signature blush-pink velvet keepsake box, with a certified hallmark card and your personalized handwritten message.
            </p>
          </div>

          {/* Recipient Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {RECIPIENTS.map((rec, idx) => (
              <motion.div
                key={rec.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <Link
                  to={rec.link}
                  className="group flex flex-col items-center p-4 rounded-luxury bg-white/80 hover:bg-white border border-brand-border/80 hover:border-blush-accent shadow-xs hover:shadow-card transition-all text-center"
                >
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {rec.icon}
                  </span>
                  <span className="font-serif text-base font-semibold text-brand-black group-hover:text-blush-deep transition-colors">
                    For {rec.name}
                  </span>
                  <span className="text-[10px] text-brand-gray mt-0.5 line-clamp-1">
                    {rec.tag}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Occasion Chips */}
          <div className="pt-4 border-t border-brand-border/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
                Shop By Occasion:
              </span>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occ) => (
                  <Link
                    key={occ}
                    to={`/gifting?occasion=${occ}`}
                    className="px-3 py-1 rounded-full bg-white hover:bg-brand-dark hover:text-white border border-brand-border text-xs font-medium text-brand-gray transition-colors"
                  >
                    {occ}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/gifting"
              className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-blush-deep hover:underline"
            >
              <span>Explore All Gifting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

