import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF2F4] text-brand-dark pt-14 pb-24 md:pb-12 border-t border-brand-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-brand-border/80">
          <div className="flex items-center space-x-4 p-4 rounded-luxury bg-white/70 backdrop-blur-sm border border-blush-accent/30 shadow-card">
            <div className="w-12 h-12 rounded-full bg-blush-light flex items-center justify-center text-blush-deep">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-brand-black">
                925 Pure Silver
              </h4>
              <p className="text-xs text-brand-gray">Certified hallmarked purity laser stamp</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-luxury bg-white/70 backdrop-blur-sm border border-blush-accent/30 shadow-card">
            <div className="w-12 h-12 rounded-full bg-blush-light flex items-center justify-center text-blush-deep">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-brand-black">
                25+ Years Legacy
              </h4>
              <p className="text-xs text-brand-gray">Handcrafted in Rajkot since 1998</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-luxury bg-white/70 backdrop-blur-sm border border-blush-accent/30 shadow-card">
            <div className="w-12 h-12 rounded-full bg-blush-light flex items-center justify-center text-blush-deep">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-brand-black">
                Complimentary Box
              </h4>
              <p className="text-xs text-brand-gray">Luxury velvet packaging with every order</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Col 1: Brand Info & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.name}
                className="w-11 h-11 rounded-full object-cover border border-blush-accent/40"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wide text-brand-black block">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-blush-deep font-semibold">
                  Timeless Elegance · Est. 1998
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed pr-4">
              {BRAND_CONFIG.story}
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-blush-accent hover:text-white transition-all shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-blush-accent hover:text-white transition-all shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-serif text-base font-semibold text-brand-black mb-4">
              Categories
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-gray">
              <li>
                <Link to="/collections/rings" className="hover:text-blush-deep transition-colors">
                  Silver Rings
                </Link>
              </li>
              <li>
                <Link to="/collections/earrings" className="hover:text-blush-deep transition-colors">
                  Earrings & Drops
                </Link>
              </li>
              <li>
                <Link to="/collections/pendant-sets" className="hover:text-blush-deep transition-colors">
                  Pendant Sets
                </Link>
              </li>
              <li>
                <Link to="/collections/mangalsutra" className="hover:text-blush-deep transition-colors">
                  Modern Mangalsutra
                </Link>
              </li>
              <li>
                <Link to="/collections/kadas" className="hover:text-blush-deep transition-colors">
                  Solid Kadas
                </Link>
              </li>
              <li>
                <Link to="/collections/mens" className="hover:text-blush-deep transition-colors">
                  Men's Silver
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Policies */}
          <div>
            <h5 className="font-serif text-base font-semibold text-brand-black mb-4">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-gray">
              <li>
                <Link to="/about" className="hover:text-blush-deep transition-colors">
                  About Our Craft
                </Link>
              </li>
              <li>
                <Link to="/gifting" className="hover:text-blush-deep transition-colors">
                  Gifting Concierge
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-blush-deep transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-blush-deep transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/policies/returns" className="hover:text-blush-deep transition-colors">
                  30-Day Returns & Exchange
                </Link>
              </li>
              <li>
                <Link to="/policies/privacy" className="hover:text-blush-deep transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-blush-deep font-medium hover:underline">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Contact & Reach */}
          <div>
            <h5 className="font-serif text-base font-semibold text-brand-black mb-4">
              Atelier & Contact
            </h5>
            <ul className="space-y-3 text-xs sm:text-sm text-brand-gray">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blush-deep shrink-0 mt-0.5" />
                <span>
                  {BRAND_CONFIG.address.line1}, {BRAND_CONFIG.address.road}, {BRAND_CONFIG.address.city} - {BRAND_CONFIG.address.pincode}, {BRAND_CONFIG.address.state}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blush-deep shrink-0" />
                <a
                  href={`tel:${BRAND_CONFIG.phone}`}
                  className="hover:text-blush-deep transition-colors font-medium"
                >
                  {BRAND_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blush-deep shrink-0" />
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  className="hover:text-blush-deep transition-colors truncate"
                >
                  {BRAND_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 border-t border-brand-border/80 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-gray gap-4">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Handcrafted with pride in Gujarat, India.</p>

          <div className="flex items-center space-x-3 text-[11px] font-semibold text-brand-dark">
            <span className="px-2 py-1 rounded bg-white shadow-sm border border-brand-border">UPI</span>
            <span className="px-2 py-1 rounded bg-white shadow-sm border border-brand-border">Cards</span>
            <span className="px-2 py-1 rounded bg-white shadow-sm border border-brand-border">NetBanking</span>
            <span className="px-2 py-1 rounded bg-white shadow-sm border border-brand-border">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

