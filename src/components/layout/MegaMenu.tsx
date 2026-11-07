import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  activeMenu: string | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeMenu, onClose }) => {
  if (!activeMenu) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-brand-border shadow-luxury z-50 py-8 px-6 hidden md:block"
      >
        <div className="max-w-7xl mx-auto">
          {activeMenu === 'women' && (
            <div className="grid grid-cols-4 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Shop by Category
                </h4>
                <ul className="space-y-2 text-sm text-brand-dark">
                  <li>
                    <Link to="/collections/rings" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Silver Rings
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/earrings" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Earrings & Jhumkis
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/pendant-sets" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Pendant Sets & Chains
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/bracelets" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Bracelets & Cuffs
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/kadas" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Royal Kadas
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Specialty Silver
                </h4>
                <ul className="space-y-2 text-sm text-brand-dark">
                  <li>
                    <Link to="/collections/mangalsutra" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Modern Mangalsutras
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/jewellery-sets" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Bridal Jewellery Sets
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/all?tags=Handcrafted" onClick={onClose} className="hover:text-blush-deep transition-colors flex items-center space-x-1">
                      <span>Artisanal Handcrafted</span>
                      <span className="text-[10px] bg-blush-light text-blush-deep px-1.5 py-0.5 rounded font-medium">925 Pure</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/all?metal=Rose+Gold+Plated" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Rose Gold Plated
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/all?metal=Oxidised+Silver" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Vintage Oxidised Silver
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Featured Styles
                </h4>
                <ul className="space-y-2 text-sm text-brand-dark">
                  <li>
                    <Link to="/collections/all?tags=Bestseller" onClick={onClose} className="hover:text-blush-deep transition-colors text-brand-sale font-medium">
                      ★ All Bestsellers
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/all?tags=New" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Fresh Drops & New In
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/all?maxPrice=999" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Budget Chic Under ₹999
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/all?minPrice=2000&maxPrice=4999" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Luxury Gifts ₹2000 - ₹4999
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Featured Visual Banner Card */}
              <div className="relative rounded-luxury overflow-hidden group bg-blush-light p-4 flex flex-col justify-end min-h-[200px]">
                <img
                  src="https://kripalsilver.com/uploads/home-collections/1779194336_ca7.png"
                  alt="Stunning Every Ear"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-[10px] tracking-widest uppercase bg-blush-accent text-brand-dark font-semibold px-2 py-0.5 rounded-full inline-block mb-1">
                    Spotlight
                  </span>
                  <h5 className="font-serif text-lg font-medium leading-tight">
                    Stunning Every Ear
                  </h5>
                  <p className="text-xs text-gray-200 mt-1 mb-2">925 Pure Silver Earrings Collection</p>
                  <Link
                    to="/collections/earrings"
                    onClick={onClose}
                    className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-white hover:text-blush-accent transition-colors"
                  >
                    <span>Explore Now</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'men' && (
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Men's Silver Collection
                </h4>
                <ul className="space-y-2 text-sm text-brand-dark">
                  <li>
                    <Link to="/collections/kadas" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Solid 925 Silver Kadas
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/mens" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Gentlemen's Signet & Band Rings
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/mens" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Cuban & Box Silver Chains
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/all?gender=Men" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      View All Men's Designs
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Craft & Purity
                </h4>
                <div className="p-4 rounded-luxury bg-blush-light border border-brand-border">
                  <div className="flex items-center space-x-2 text-brand-dark font-serif text-base mb-1">
                    <Sparkles className="w-4 h-4 text-blush-deep" />
                    <span>Pure 925 Hallmark Guaranteed</span>
                  </div>
                  <p className="text-xs text-brand-gray leading-relaxed">
                    Every piece is crafted in solid sterling silver with genuine hallmarking, designed for daily endurance and effortless masculinity.
                  </p>
                </div>
              </div>

              {/* Banner */}
              <div className="relative rounded-luxury overflow-hidden group bg-blush-light p-4 flex flex-col justify-end min-h-[200px]">
                <img
                  src="https://kripalsilver.com/assets/images/Shop%20for%20him.png"
                  alt="Shop for Him"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-[10px] tracking-widest uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full inline-block mb-1">
                    Shop For Him
                  </span>
                  <h5 className="font-serif text-lg font-medium leading-tight">
                    Pure Silver Kadas & Rings
                  </h5>
                  <Link
                    to="/collections/mens"
                    onClick={onClose}
                    className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-white hover:text-blush-accent transition-colors mt-2"
                  >
                    <span>Shop Men</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'gifting' && (
            <div className="grid grid-cols-4 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Gifts by Recipient
                </h4>
                <ul className="space-y-2 text-sm text-brand-dark">
                  <li>
                    <Link to="/gifting?recipient=wife" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Gifts for Wife
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?recipient=sister" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Gifts for Sister
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?recipient=mother" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Gifts for Mother
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?recipient=friend" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Gifts for Best Friend
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?recipient=him" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Gifts for Him
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Gifts by Occasion
                </h4>
                <ul className="space-y-2 text-sm text-brand-dark">
                  <li>
                    <Link to="/gifting?occasion=Birthday" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Birthday Surprises
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?occasion=Anniversary" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Anniversary Keepsakes
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?occasion=Wedding" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Wedding & Bridal Tokens
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?occasion=Rakhi" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Rakhi Special
                    </Link>
                  </li>
                  <li>
                    <Link to="/gifting?occasion=Diwali" onClick={onClose} className="hover:text-blush-deep transition-colors">
                      Diwali & Dhanteras
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gray font-semibold mb-3 border-b border-brand-border/60 pb-2">
                  Complimentary Gifting
                </h4>
                <div className="p-4 rounded-luxury bg-blush-light border border-blush-accent/40 space-y-2">
                  <p className="text-xs font-semibold text-brand-dark">
                    🎁 Luxury Signature Packaging
                  </p>
                  <p className="text-[11px] text-brand-gray leading-relaxed">
                    Includes a plush rose-velvet jewellery box, certificate of authenticity, and optional handwritten note.
                  </p>
                  <Link
                    to="/gifting"
                    onClick={onClose}
                    className="inline-block text-xs font-semibold text-blush-deep hover:underline pt-1"
                  >
                    Explore Gifting Guide →
                  </Link>
                </div>
              </div>

              <div className="relative rounded-luxury overflow-hidden group bg-blush-light p-4 flex flex-col justify-end min-h-[200px]">
                <img
                  src="https://kripalsilver.com/uploads/jewellery-cards/1779194398_website4.png"
                  alt="Matching Jewellery"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 text-white">
                  <h5 className="font-serif text-lg font-medium leading-tight">
                    Couple Bands & Keepsakes
                  </h5>
                  <p className="text-xs text-gray-200 mt-1">Match, gift, and feel closer</p>
                  <Link
                    to="/product/soulmate-couple-matching-bands"
                    onClick={onClose}
                    className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-white hover:text-blush-accent transition-colors mt-2"
                  >
                    <span>View Keepsake</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'price' && (
            <div className="grid grid-cols-4 gap-6">
              {[
                { title: 'Under ₹999', subtitle: 'Affordable everyday sparkles', link: '/collections/all?maxPrice=999' },
                { title: '₹999 – ₹1,999', subtitle: 'Most popular sterling silver', link: '/collections/all?minPrice=999&maxPrice=1999' },
                { title: '₹2,000 – ₹4,999', subtitle: 'Statement pieces & pendant sets', link: '/collections/all?minPrice=2000&maxPrice=4999' },
                { title: '₹5,000+', subtitle: 'Bridal sets & solid silver kadas', link: '/collections/all?minPrice=5000' },
              ].map((tier, idx) => (
                <Link
                  key={idx}
                  to={tier.link}
                  onClick={onClose}
                  className="p-5 rounded-luxury bg-blush-light/70 hover:bg-white border border-brand-border/60 hover:border-blush-accent/60 shadow-sm hover:shadow-luxury transition-all group"
                >
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-blush-deep">
                    Budget Tier
                  </span>
                  <h4 className="font-serif text-xl font-medium text-brand-black group-hover:text-blush-deep transition-colors mt-1">
                    {tier.title}
                  </h4>
                  <p className="text-xs text-brand-gray mt-1">{tier.subtitle}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

